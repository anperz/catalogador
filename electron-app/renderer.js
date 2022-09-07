
const {ipcRenderer} = require('electron');
/*
function deleteLocalStorage() {
    localStorage.tableData = "";
    console.log('Reseteado localStorage');
}; */


/* 
<button onclick="openFile('${records[i][j]}')">Archivo</button>

const { shell } = require('electron')
shell.showItemInFolder(videoUrlValue); // Show the given file in a file manager. If possible, select the file.

*/


//variables necesarias para validacion de fechas
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentday = date.getDay();
const currentDate = [currentYear,currentMonth,currentday];



// Canales IPC de comunicacion con el main

// crear el canal para  enviar "abrir carpeta" al main
document.getElementById('open-directory-button').addEventListener('click', e => {
    ipcRenderer.send('channel1', 'abrete-sesamo')
})

// crear el canal para enviar datos de catalogacion al main
document.getElementById('catalogar-button').addEventListener('click', e => {
    const csv = localStorage.tableData;
    const dir = document.getElementById('directory-line').innerHTML
    
    if (dir !== "") {
        ipcRenderer.send('channel2', ['work-baby', dir, csv]);
    } else {
        alert('Seleccione primero la carpeta a catalogar usando el boton "Carga automatica de carpeta"')
    }
    
});


// crear el canal para escuchar respuesta del main al seleccionar carpeta
ipcRenderer.on('channel1-response', (e, args) => {
    //console.log(args);
    document.getElementById('directory-line').innerHTML = args[0];
    dataToArray(args[1]);
})

// crear el canal para escuchar respuesta del main al catalogar
ipcRenderer.on('channel2-response', (e, args) => {
    console.log(args);
})


/// Funcion para cargar manualmente el localstorage en el aplicativo

function setLocalStorage() {
    //console.log('hay datos en localStorage: ' + localStorage.tableData);
    const savedCsv = localStorage.tableData;
    dataToArray(savedCsv);
};


/// Eventos para el formulario de carga manual

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {

    document.getElementById('message-container').innerHTML = '<p>Cargando archivo de datos...</p>';

    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        dataToArray(text);
        document.getElementById('message-container').innerHTML = '<p>Carga completa</p>';
    };
    reader.readAsText(input);

});

/// Funcion principal de importacion de CSV

function dataToArray(text) {

    //console.log (text);

    const records = [];

    function record (FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Sala, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath) {
        this.FullName = FullName; // 0
        this.Name = Name; // 1
        this.Extension = Extension; // 2
        this.Length = Length; // 3
        this.Radicado = Radicado; // 4
        this.Date = Date; // 5
        this.Time = Time; // 6
        this.Organo = Organo; // 7
        this.Sala = Sala; // 8
        this.Reserved = Reserved; // 9
        this.Virtual = Virtual; // 10
        this.Consecutivo = Consecutivo; // 11
        this.NewName = NewName; // 12
        this.NameLength = NameLength; // 13
        this.Category = Category; // 14
        this.FinalPath = FinalPath; // 15
    };

    //eliminar encabezado de typo del csv y comillas dobles
    deletedFormatHeader = text.replace('#TYPE Selected.System.IO.FileInfo\r\n"', '');
    deletedVoidCol = deletedFormatHeader.replace('\r', '');

    const unQuotedText = deletedVoidCol.replace(/['"]+/g, "");
    const row = unQuotedText.split('\n');
    //console.log(row);

    for (let i=0 ; i < row.length ; i++) {

        if (row[i] !== "") { //verifica si la fila no esta vacia, si no crear celdas y agregarlas a recods

            const cell = row[i].split(';');
            const newRecord = new record(cell[0], cell[1], cell[2], cell[3], cell[4], cell[5], cell[6], cell[7], cell[8], cell[9], cell[10], cell[11], cell[12], cell[13], cell[14], cell[15]);
            records.push(newRecord);
        };

    };

    //console.log(records);

    // generador de tabla HTML
    var html = '<table id="table-container">';
    html += '<thead id="header-container"><tr>';

        // crear encabezados desde el archivo
        /*
        for( var j in records[0] ) {
            html += '<th class="table-header">' + j +'</th>';
        };*/

        html += '<th class="table-header">Video</th>';
        html += '<th class="table-header" name="Name">Nombre Inicial</th>';
        html += '<th class="table-header">Ext</th>';
        html += '<th class="table-header">Tamaño</th>';
        html += '<th class="table-header">Radicado</th>';
        html += '<th class="table-header">Fecha</th>';
        html += '<th class="table-header">Hora</th>';
        html += '<th class="table-header">Organo</th>';
        html += '<th class="table-header">Sala</th>';
        html += '<th class="table-header">R / L</th>';
        html += '<th class="table-header">V / P</th>';
        html += '<th class="table-header">Cons</th>';
        html += '<th class="table-header">Nuevo Nombre</th>';
        html += '<th class="table-header">Largo</th>';
        html += '<th class="table-header">Categoria</th>';
        html += '<th class="table-header">Ruta Final</th>';
        html += '</tr></thead><tbody id= "row-container"';

        // crear celdas de contenido
        for(let i = 1; i < records.length; i++) {
            html += '<tr>';
            for( let j in records[i] ) {

// FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath
                // casos para generar cada elemento HTML
                switch (j) {
                    case "FullName": html += `<td><button class="play-button row${i}" value="${records[i][j]}">▶</button></td>`;
                        break;

                    case "Name": html += '<td><textarea class="row'+i+'" name="Name" type="text" readonly="readonly">'+ records[i][j] + '</textarea></td>';
                        break;

                    case "Extension": html += '<td><input class="row'+i+'" name="Extension" type="text" readonly="readonly" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Length": html += '<td><input class="row'+i+'" name="Length" type="text" readonly="readonly" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Radicado": html += '<td><input class="row'+i+'" name="Radicado" type="text" maxlength="27" placeholder="Radicado(23 digitos)" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Date": html += '<td><input class="row'+i+'" name="Date" type="text" maxlength="10" placeholder="AAAA/MM/DD" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Time": html += '<td><input class="row'+i+'" name="Time" type="text" maxlength="8" placeholder="HH:MM:SS" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Organo": html += '<td><input class="row'+i+'" name="Organo" type="text" maxlength="12" placeholder="Organo(12 digitos)" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Sala": html += '<td><input class="row'+i+'" name="Sala" type="text" maxlength="10" placeholder="Sala(10 digitos)" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Reserved": html += '<td><input class="row'+i+'" name="Reserved" type="text" maxlength="1" placeholder="R-L" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Virtual": html += '<td><input class="row'+i+'" name="Virtual" type="text" maxlength="1" placeholder="V-P" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Consecutivo": html += '<td><input class="row'+i+'" name="Consecutivo" type="number" maxlength="2" readonly="readonly" value="01"></td>';
                        break;

                    case "NewName": html += '<td><textarea class="row'+i+'" name="NewName" readonly="readonly" type="text"></textarea></td>';
                        break;

                    case "NameLength": html += '<td><input class="row'+i+'" name="NameLength" readonly="readonly" type="number"></td>';
                        break;

                    case "Category": switch (records[i][j]) {
                        // verifica si hay un valor guardado para crear el elemento que debe aparecer como seleccionado en categoria
                                case "OneDrive": html += '<td><select class="row'+i+'" name="Category" type="number"> <option selected>OneDrive</option> <option>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "No Aplica": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>OneDrive</option> <option selected>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "No Catalogable": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>OneDrive</option> <option>No Aplica</option> <option selected>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "Duplicado": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>OneDrive</option> <option>No Aplica</option> <option>No Catalogable</option> <option selected>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "Historico": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>OneDrive</option> <option>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option selected>Historico</option> </select> </td>';
                                    break;

                                default: html += '<td><select class="row'+i+'" name="Category" type="number"> <option selected>Seleccionar...</option> <option>OneDrive</option> <option>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;
                    } ;
                        break;

                    case "FinalPath": html += '<td><textarea class="row'+i+'" name="FinalPath" readonly="readonly" type="text"></textarea></td>';
                        break;

                    default: html += "<td>" + records[i][j]+ "</td>";
                        break;
                };

            };
        html += '</tr>';
        };
    html += '</tbody></table>';

    // aplicar html al elemento container
    document.getElementById('container').innerHTML = html;

    // evento que se activa al producirse un cambio en la tabla
    document.getElementById('table-container').addEventListener('change', checkConsecutivo);

    //creacion de eventos para reproducir video al hacer click en el boton
    createPlayButtonAction();

    //creacion de eventos para formatear el radicado
    createRadicadoValidation();

    //creacion de eventos para formatear la fecha
    createFechaValidation();

    //creacion de eventos para formatear la hora
    createHoraValidation();

    //creacion de eventos para formatear el organo
    createOrganoValidation();
    
    //creacion de eventos para formatear la sala
    createSalaValidation()

    //creacion de eventos para formatear el campo reservado-libre
    createReservadoLibreValidation();

    //creacion de eventos para formatear el campo virtual-preencial
    createVirtualPresencialValidation();

    // creacion de evento para validar 
    checkConsecutivo ();

};


function checkConsecutivo () {

    const arrayConsecutivo = document.getElementsByName('Consecutivo');
    const radicadoList = document.getElementsByName('Radicado');
    const radicadoArray = [];
    for (let i=0; i<radicadoList.length; i++){
        radicadoItem = radicadoList[i].value
        radicadoArray.push(radicadoItem);
    };

    for (let x=1 ; x<arrayConsecutivo.length ; x++) {

        var cuentaConsecutivo = 1;

        for (let i=0 ; i<x; i++) {

            if (radicadoArray[x] == radicadoArray[i]) {
                cuentaConsecutivo++;
            };

        };
        if (cuentaConsecutivo<10) {
            cuentaConsecutivo = '0' + cuentaConsecutivo;
        };
        arrayConsecutivo[x].value = cuentaConsecutivo;


    };
    checkNewName ();
};

function checkNewName () {
    const arrayNewName = document.getElementsByName('NewName');

    for (let x=0 ; x<arrayNewName.length ; x++) {
        const selectedClass = arrayNewName[x].className;
        const rowList = document.getElementsByClassName(selectedClass);
        //console.log(rowList);

// FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Sala, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath

        // filtrar separadores de valores

        const rawFieldName = rowList['Name'].value;
        const fieldName = rawFieldName.split(' | ');

        const rawFieldRadicado = rowList['Radicado'].value;
        const fieldRadicado = rawFieldRadicado.replace(/-/g, '');

        const rawFieldDate = rowList['Date'].value;
        const fieldDate = rawFieldDate.replace(/\//g, '');

        const rawFieldTime = rowList['Time'].value;
        const fieldTime = rawFieldTime.replace(/:/g, '');

        const fieldOrgano = rowList['Organo'].value;
        const fieldSala = rowList['Sala'].value;
        const fieldConsecutivo = rowList['Consecutivo'].value;
        const fieldExtension = rowList['Extension'].value.toLowerCase();
        const fieldReserved = rowList['Reserved'].value;
        const fieldVirtual = rowList['Virtual'].value;
        const fieldCategoria = rowList['Category'].value;

        //asignar valor a NewName

        rowList['NewName'].value = fieldRadicado +"_"+ fieldReserved + fieldOrgano + fieldSala +"_"+ fieldConsecutivo +"_"+ fieldDate +"_"+ fieldTime + "_" + fieldVirtual + fieldExtension;

        //asignar valor a NameLength
        rowList['NameLength'].value = String(rowList['NewName'].value).length;


        //asignar valor a FinalPath

        if (fieldCategoria == "OneDrive" || fieldCategoria == "Historico") {
            rowList['FinalPath'].value = '\\' + fieldCategoria + '\\' + despachosObject[fieldOrgano] + '\\' + rowList['NewName'].value;
        } else {
        rowList['FinalPath'].value = '\\' + fieldCategoria + '\\' + fieldName[0];
        }

        setCategoryBackgroundColor(rowList['Category']);
        setNameLengthBackgroundColor(rowList['NameLength']);



    };

    saveDataOnLocalStorage();
};

// fucnion para guardar en local storage
function saveDataOnLocalStorage() {

    //se colocan los headers del csv
    var csv = '"FullName";"Name";"Extension";"Length";"Radicado";"Date";"Time";"Organo";"Sala";"Reserved";"Virtual";"Consecutivo";"NewName";"NameLength";"Category";"FinalPath"\n';

    const arrayNewName = document.getElementsByName('NewName');

    // se itera sobre cada  fila y columna para generar el csv
    for (let x=0 ; x<arrayNewName.length ; x++) {
        const selectedClass = arrayNewName[x].className;
        const rowList = document.getElementsByClassName(selectedClass);

        for (let i=0 ; i<rowList.length ; i++) {
            const cell = rowList[i].value
            csv += '"' + cell + '";';
        };

        if (x !== arrayNewName.length -1) {
            csv += '\n';
        }
    };


    //console.log(csv);

    if (typeof(Storage) !== 'undefined') {
        localStorage.tableData = csv;
        //console.log("ESTO SE GUARDA"+localStorage.tableData);
        console.log("Guardado en local storage");
      } else {
        console.log("Local storage NO disponible");
      } ;
} ;

//funcion que se activa para descargar el CSV manualmente
function download() {
    var csv = localStorage.tableData;
    
    // codigo para chrome
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    pom.setAttribute('download', "export.csv");
    pom.click();
    

    // codigo para funcionar en internet explorer
/*
    var IEwindow = window.open();
    IEwindow.document.write(csv);
    IEwindow.document.close();
    IEwindow.document.execCommand('SaveAs', true, "export.csv");
    IEwindow.close(); */
};

// funcion para cambiar el color de  fondo de la categoria
function setCategoryBackgroundColor(categoryElement) {

    if (categoryElement.value === "OneDrive" || categoryElement.value === "Historico") {
        categoryElement.style.backgroundColor = "#388e3c";
        categoryElement.style.color = "white";
        categoryElement.style.border = "4px solid #388e3c";
    } else if (categoryElement.value === "Seleccionar...") {
        categoryElement.style.backgroundColor = "white";
        categoryElement.style.color = "black";
        categoryElement.style.border = "4px solid white";
    } else {
        categoryElement.style.backgroundColor = "#ffaf46";
        categoryElement.style.color = "black";
        categoryElement.style.border = "4px solid #ffaf46";
    }
}


// funcion para cambiar el color de  fondo del tamaño del nombre
function setNameLengthBackgroundColor(categoryElement) {

    if (categoryElement.value === "72") {
        categoryElement.style.backgroundColor = "#388e3c";
        categoryElement.style.border = "4px solid #388e3c";
        categoryElement.style.borderRadius = "4px";
    } else {
        categoryElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
        categoryElement.style.border = "none";
        categoryElement.style.borderRadius = "none";
    }
}

// anular control-z

function KeyPress(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        //console.log("ctrl-z pressed");
        return false;
    }
}

document.onkeydown = KeyPress;



/*

//cargar datos de ejemplo

var sampleData = '"FullName";"Name";"Extension";"Length";"Radicado";"Date";"Time";"Organo";"Reserved";"Virtual";"Consecutivo";"NewName";"NameLength";"Category";"FinalPath"\n"C:\\Users\\Andres\\Downloads\\Test Nuevo\\50201318ñ9,_S_cnt_1_r720P.mp4";"videoDeEjemplo1_r720P.mp4";".mp4";"47624437";;;;;;;;;;;\n"C:\\Users\\Andres\\Downloads\\Test Nuevo\\502013393_S_cnt_1_r720P.mp4";"videoDeEjemplo2_r720P.mp4";".mp4";"52896649";;;;;;;;;;;\n"C:\\Users\\Andres\\Downloads\\Test Nuevo\\502015143_S_cnt_1_r720P.mp4";"videoDeEjemplo3_r720P.mp4";".mp4";"49121589";;;;;;;;;;;';

dataToArray(sampleData); */