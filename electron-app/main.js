const { app, BrowserWindow, dialog, ipcMain, shell} = require('electron'); 
const { exec, execSync } = require('child_process');
const path = require('path'); 
const fs = require('fs');



//FUNCIONES

// crear directorio powershell
function createDirectoryCsv(receivedDirectory) {

    execSync(`

        Get-ChildItem -Path ${receivedDirectory} -Exclude "\\directory.csv"  -Recurse . | 
        Sort-Object fullname | Select-Object FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Sala, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath | 
        Export-Csv -Force -Delimiter ';' -Encoding UTF8 -Path "${receivedDirectory}\\directory.csv"
        
    `, {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
      console.log('holi1' + stderr);
      console.log('holi2' + stdout);
      console.log('holi3' + error);
    });
}; 

// crear directorio y mover a las carpetas powershell
function catalogDirectoryCsv(receivedDirectory, receivedCsv) {

    fs.writeFileSync(receivedDirectory + "\\export.csv", receivedCsv);
    console.log('archivo export creado');

    execSync(`

        Import-Csv -Delimiter ';' -Path "${receivedDirectory}\\export.csv" | 
        ForEach-Object {
            New-Item -ItemType File -Path "${receivedDirectory}$($_.FinalPath)" -Force
        }

        Import-Csv -Delimiter ';' -Path "${receivedDirectory}\\export.csv" | 
        ForEach-Object { 
            Move-Item -Path $_.FullName -Destination "${receivedDirectory}$($_.FinalPath)" -Force -Verbose
        }
 
    `, {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
      console.log('holi1' + stderr);
      console.log('holi2' + stdout);
      console.log('holi3' + error);
    });
}; 


// enviar archivo csv al renderer 
function sendCsvFile (receivedEvent, receivedDirectory) {

    const ev = receivedEvent;

    fs.readFile(receivedDirectory + '\\directory.csv', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        //enviar string del archivo al renderer
        ev.sender.send('channel1-response', [receivedDirectory,data])
      });

};


// PROCESOS DE ELECTRON

// funcion para crear una nueva ventana
const createWindow = () => {
    const win = new BrowserWindow({
        show:false,
        height: 500, 
        width: 800, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    //win.removeMenu();
    win.loadFile("index.html");
    win.maximize();
    win.show();

    // Open the DevTools.
    //win.webContents.openDevTools();
};


//crear la ventana cuando la aplicacion este lista
app.whenReady().then(()=> {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      });
});

// no cerrar toda la app al salir
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  });


// ipc listener abrir carpeta
ipcMain.on('channel1', (e, args) => {

    if (args == 'abrete-sesamo') {

        // abrir dialog para carpeta
        dialog.showOpenDialog( {
            buttonLabel: 'Seleccionar Carpetita', 
            properties: ['openDirectory']
        }).then( result =>  {
            //console.log(result)
            const createdFilePath = result.filePaths[0];

            // asignar directorio a la variable global
            directory = createdFilePath;
                        
            //crear el archivo csv
            createDirectoryCsv(createdFilePath);
            //enviar archivo al renderer
            sendCsvFile(e, createdFilePath);   

        })
    }
})

// ipc listener para iniciar catalogacion de carpetas
ipcMain.on('channel2', (e, args) => {

    if (args[0] == 'work-baby') {
        // traer el csv
        const dir = args[1];
        const csv = args[2];

        // enviar a funcion de catalogacion
        catalogDirectoryCsv(dir, csv);

        //enviar respuesta al renderer
        e.sender.send('channel2-response', 'received-baby');

        //abrir carpeta catalogada
        shell.openPath(dir);
    }
})