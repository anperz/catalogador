const { app, BrowserWindow, dialog, ipcMain} = require('electron'); 
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

// enviar archivo csv al renderer 
function sendCsvFile (receivedEvent, receivedDirectory) {

    const ev = receivedEvent;

    fs.readFile(receivedDirectory + '\\directory.csv', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        //enviar string del archivo al renderer
        ev.sender.send('channel1-response', data)
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

    win.removeMenu();
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

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  });


// ipc listener
ipcMain.on('channel1', (e, args) => {

    if (args == 'abrete-sesamo') {

        // abrir dialog para carpeta
        dialog.showOpenDialog( {
            buttonLabel: 'Seleccionar Carpetita', 
            properties: ['openDirectory']
        }).then( result =>  {
            //console.log(result)
            const createdFilePath = result.filePaths[0];
                        
            //crear el archivo csv
            createDirectoryCsv(createdFilePath);
            //enviar archivo al renderer
            sendCsvFile(e, createdFilePath);   

        })
    }
})