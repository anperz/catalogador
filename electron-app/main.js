const { app, BrowserWindow, dialog, ipcMain} = require('electron'); 
const path = require('path'); 
const { exec } = require('child_process');


// crear directorio powershell
// const selectedDirectory = "C:\\Users\\Andres\\Downloads\\Test-Nuevo";

function createDirectoryCsv(receivedDirectory) {

    exec(`

    Get-ChildItem -Path ${receivedDirectory} -Exclude "\\directory.csv"  -Recurse . | 
    Sort-Object fullname | Select-Object FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Sala, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath | 
    Export-Csv -Force -Delimiter ';' -Encoding UTF8 -Path "${receivedDirectory}\\directory.csv"
    
    `, {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
      console.log(stderr);
      console.log(stdout);
      console.log(error);
    });
}; 




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

    win.loadFile("index.html");
    win.maximize();
    win.show();

    /*
    win.webContents.on('did-finish-load', () => {

        dialog.showOpenDialog(win, {
            buttonLabel: 'Seleccionar Carpetita', 
            properties: ['openDirectory']
        }).then( result =>  {
            console.log(result)
            createDirectoryCsv(result.filePaths[0])
        })
    }) */
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
            console.log(result)
            createDirectoryCsv(result.filePaths[0])
        })
    }
    
})