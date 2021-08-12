
/*
function deleteLocalStorage() {
    localStorage.tableData = "";
    console.log('Reseteado localStorage');
}; */

function setLocalStorage() {
    //console.log('hay datos en localStorage: ' + localStorage.tableData);
    var savedCsv = localStorage.tableData;
    dataToArray(savedCsv);
};


const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        dataToArray(text);
    };
    reader.readAsText(input);
});


function dataToArray(text) {
    //console.log (text);

    var records = [];

    function record (FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath) {
        this.FullName = FullName; // 0
        this.Name = Name; // 1
        this.Extension = Extension; // 2
        this.Length = Length; // 3
        this.Radicado = Radicado; // 4
        this.Date = Date; // 5
        this.Time = Time; // 6
        this.Organo = Organo; // 7
        this.Reserved = Reserved; // 8
        this.Virtual = Virtual; // 9
        this.Consecutivo = Consecutivo; // 10
        this.NewName = NewName; // 11
        this.NameLength = NameLength; // 12
        this.Category = Category; // 13
        this.FinalPath = FinalPath; // 14
    };

    //eliminar encabezado de typo del csv y comillas dobles
    deletedFormatHeader = text.replace('#TYPE Selected.System.IO.FileInfo\r\n"', '');
    deletedVoidCol = deletedFormatHeader.replace('\r', '');

    var unQuotedText = deletedVoidCol.replace(/['"]+/g, "");
    var row = unQuotedText.split('\n');
    //console.log(row);

    for (let i=0 ; i < row.length ; i++) {

        if (row[i] !== "") { //verifica si la fila no esta vacia, si no crear celdas y agregarlas a recods

            var cell = row[i].split(';');
            var newRecord = new record(cell[0], cell[1], cell[2], cell[3], cell[4], cell[5], cell[6], cell[7], cell[8], cell[9], cell[10], cell[11], cell[12], cell[13], cell[14]);
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
        };     */

        html += '<th class="table-header">Video</th>';
        html += '<th class="table-header" name="Name">Nombre Inicial</th>';
        html += '<th class="table-header">Ext</th>';
        html += '<th class="table-header">Tamaño</th>';
        html += '<th class="table-header">Radicado</th>';
        html += '<th class="table-header">Fecha</th>';
        html += '<th class="table-header">Hora</th>';
        html += '<th class="table-header">Organo</th>';
        html += '<th class="table-header">R / L</th>';
        html += '<th class="table-header">V / P</th>';
        html += '<th class="table-header">Cons</th>';
        html += '<th class="table-header">Nuevo Nombre</th>';
        html += '<th class="table-header">Largo</th>';
        html += '<th class="table-header">Categoria</th>';
        html += '<th class="table-header">Ruta Final</th>';
        html += '</tr></thead><tbody id= "row-container"';

        // crear celdas de contenido
        for( var i = 1; i < records.length; i++) {
            html += '<tr>';
            for( var j in records[i] ) {

// FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath
                // casos para generar cada elemento HTML
                switch (j) {
                    case "FullName": html += '<td><button class="play-button row'+i+'" value="' + records[i][j] + '">▶</button></td>';
                        break;

                    case "Name": html += '<td><textarea class="row'+i+'" name="Name" type="text" readonly="readonly">'+ records[i][j] + '</textarea></td>';
                        break;

                    case "Extension": html += '<td><input class="row'+i+'" name="Extension" type="text" readonly="readonly" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Length": html += '<td><input class="row'+i+'" name="Length" type="text" readonly="readonly" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Radicado": html += '<td><input class="row'+i+'" name="Radicado" type="number" maxlength="23" placeholder="Radicado(23 digitos)" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Date": html += '<td><input class="row'+i+'" name="Date" type="text" maxlength="8" placeholder="AAAAMMDD" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Time": html += '<td><input class="row'+i+'" name="Time" type="text" maxlength="4" placeholder="HHMM" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Organo": html += '<td><input class="row'+i+'" name="Organo" type="number" maxlength="12" placeholder="Organo(12 digitos)" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Reserved": html += '<td><input class="row'+i+'" name="Reserved" type="text" maxlength="1" placeholder="R-L" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Virtual": html += '<td><input class="row'+i+'" name="Virtual" type="text" maxlength="1" placeholder="V-P" value="' + records[i][j]+ '"></td>';
                        break;

                    case "Consecutivo": html += '<td><input class="row'+i+'" name="Consecutivo" type="number" maxlength="2" value="01"></td>';
                        break;

                    case "NewName": html += '<td><textarea class="row'+i+'" name="NewName" type="text"></textarea></td>';
                        break;

                    case "NameLength": html += '<td><input class="row'+i+'" name="NameLength" type="number"></td>';
                        break;

                    case "Category": switch (records[i][j]) {
                        // verifica si hay un valor guardado para crear el elemento que debe aparecer como seleccionado en categoria
                                case "Catalogable": html += '<td><select class="row'+i+'" name="Category" type="number"> <option selected>Catalogable</option> <option>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "No Aplica": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>Catalogable</option> <option selected>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "No Catalogable": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>Catalogable</option> <option>No Aplica</option> <option selected>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "Duplicado": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>Catalogable</option> <option>No Aplica</option> <option>No Catalogable</option> <option selected>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;

                                case "Historico": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>Catalogable</option> <option>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option selected>Historico</option> </select> </td>';
                                    break;

                                default: html += '<td><select class="row'+i+'" name="Category" type="number"> <option selected>Seleccionar...</option> <option>Catalogable</option> <option>No Aplica</option> <option>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                                    break;
                    } ;
                        break;

                    case "FinalPath": html += '<td><textarea class="row'+i+'" name="FinalPath" type="text"></textarea></td>';
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

    var butonsList = document.getElementsByClassName('play-button');

    for (i=0;i<butonsList.length;i++) {

        butonsList[i].addEventListener('click', function playVideo (button_click) {
            var videoUrlValue = button_click.target.value;
            var videoTagHtml = '<video autoplay width="900" height="405" controls><source src="'+ videoUrlValue +'" type="video/mp4">Your browser does not support the video tag.</video>';
            document.getElementById('video-container').innerHTML = videoTagHtml;
        });

    };


checkConsecutivo ();

};


function checkConsecutivo () {

    var arrayConsecutivo = document.getElementsByName('Consecutivo');
    var radicadoList = document.getElementsByName('Radicado');
    var radicadoArray = [];
    for (let i=0; i<radicadoList.length; i++){
        radicadoItem = radicadoList[i].value
        radicadoArray.push(radicadoItem);
    };

    for (var x=1 ; x<arrayConsecutivo.length ; x++) {

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
    var arrayNewName = document.getElementsByName('NewName');

    for (var x=0 ; x<arrayNewName.length ; x++) {
        var selectedClass = arrayNewName[x].className;
        var rowList = document.getElementsByClassName(selectedClass);
        //console.log(rowList);

// FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath

        var fieldRadicado = rowList['Radicado'].value;
        var fieldOrgano = rowList['Organo'].value;
        var fieldConsecutivo = rowList['Consecutivo'].value;
        var fieldDate = rowList['Date'].value;
        var fieldTime = rowList['Time'].value;
        var fieldExtension = rowList['Extension'].value.toLowerCase();
        var fieldReserved = rowList['Reserved'].value.toUpperCase();
        var fieldVirtual = rowList['Virtual'].value.toUpperCase();
        var fieldCategoria = rowList['Category'].value;

        //asignar valor a NewName

        rowList['NewName'].value = fieldRadicado +"_"+ fieldReserved + fieldOrgano + "0000000000" +"_"+ fieldConsecutivo +"_"+ fieldDate +"_"+ fieldTime +"00"+ "_" + fieldVirtual + fieldExtension;

        //asignar valor a NameLength
        rowList['NameLength'].value = String(rowList['NewName'].value).length;


        //asignar valor a FinalPath

        if (fieldCategoria == "Catalogable" || fieldCategoria == "Historico") {
            rowList['FinalPath'].value = '..\\' + fieldCategoria + '\\' + despachosObject[fieldOrgano] + '\\' + rowList['NewName'].value;
        } else {
        rowList['FinalPath'].value = '..\\' + fieldCategoria + '\\' + despachosObject[fieldOrgano] + '\\' + rowList['Name'].value;
        }

        setCategoryBackgroundColor(rowList['Category']);
        setNameLengthBackgroundColor(rowList['NameLength']);



    };

    saveDataOnLocalStorage();
};

// fucnion para guardar en local storage
function saveDataOnLocalStorage() {

    //se colocan los headers del csv
    var csv = '"FullName";"Name";"Extension";"Length";"Radicado";"Date";"Time";"Organo";"Reserved";"Virtual";"Consecutivo";"NewName";"NameLength";"Category";"FinalPath"\n';

    var arrayNewName = document.getElementsByName('NewName');

    // se itera sobre cada  fila y columna para generar el csv
    for (var x=0 ; x<arrayNewName.length ; x++) {
        var selectedClass = arrayNewName[x].className;
        var rowList = document.getElementsByClassName(selectedClass);

        for (var i=0 ; i<rowList.length ; i++) {
            let cell = rowList[i].value
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

//funcion que se activa para descargar el CSV
function download() {
    var csv = localStorage.tableData;
    /*
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    pom.setAttribute('download', "export.csv");
    pom.click();
    */

    // codigo para funcionar en internet explorer

    var IEwindow = window.open();
    IEwindow.document.write(csv);
    IEwindow.document.close();
    IEwindow.document.execCommand('SaveAs', true, "export.csv");
    IEwindow.close();
};

// funcion para cambiar el color de  fondo de la categoria
function setCategoryBackgroundColor(categoryElement) {

    if (categoryElement.value === "Catalogable" || categoryElement.value === "Historico") {
        categoryElement.style.backgroundColor = "green";
        categoryElement.style.color = "white";
        categoryElement.style.border = "4px solid green";
    } else if (categoryElement.value === "Seleccionar...") {
        categoryElement.style.backgroundColor = "white";
        categoryElement.style.color = "black";
        categoryElement.style.border = "4px solid white";
    } else {
        categoryElement.style.backgroundColor = "orange";
        categoryElement.style.color = "black";
        categoryElement.style.border = "4px solid orange";
    }
}


// funcion para cambiar el color de  fondo del tamaño del nombre
function setNameLengthBackgroundColor(categoryElement) {

    if (categoryElement.value === "72") {
        categoryElement.style.backgroundColor = "green";
        categoryElement.style.border = "4px solid green";
        categoryElement.style.borderRadius = "4px";
    } else {
        categoryElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
        categoryElement.style.border = "none";
        categoryElement.style.borderRadius = "none";
    }
}

/*

//cargar datos de ejemplo

var sampleData = '"FullName";"Name";"Extension";"Length";"Radicado";"Date";"Time";"Organo";"Reserved";"Virtual";"Consecutivo";"NewName";"NameLength";"Category";"FinalPath"\n"C:\\Users\\Andres\\Downloads\\Test Nuevo\\50201318ñ9,_S_cnt_1_r720P.mp4";"videoDeEjemplo1_r720P.mp4";".mp4";"47624437";;;;;;;;;;;\n"C:\\Users\\Andres\\Downloads\\Test Nuevo\\502013393_S_cnt_1_r720P.mp4";"videoDeEjemplo2_r720P.mp4";".mp4";"52896649";;;;;;;;;;;\n"C:\\Users\\Andres\\Downloads\\Test Nuevo\\502015143_S_cnt_1_r720P.mp4";"videoDeEjemplo3_r720P.mp4";".mp4";"49121589";;;;;;;;;;;';

dataToArray(sampleData); */