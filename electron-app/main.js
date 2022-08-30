const { app, BrowserWindow } = require('electron'); 
const path = require('path'); 
const { exec } = require('child_process');

// crear directorio powershell
const selectedDirectory = "C:\\Users\\Andres\\Downloads\\Test-Nuevo";

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

// createDirectoryCsv(selectedDirectory);


// funcion para crear una nueva ventana
const createWindow = () => {
    const win = new BrowserWindow({
        show:false,
        height: 500, 
        width: 800, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

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