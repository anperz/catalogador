
//verificar si hay local storage data almacenada
/*
window.addEventListener('DOMContentLoaded', (event) => {

    if (savedhtml !== "undefined") {
        

        var savedhtml = localStorage.tableData;
        console.log(savedhtml);
        document.getElementById('container').innerHTML = savedhtml;
    
        // crear eventos para actualizar valores

        document.getElementById('table-container').addEventListener('change', checkConsecutivo); 

        //----- creacion de eventos para reproducir video al hacer click en el boton

        var butonsList = document.getElementsByClassName('play-button');
        
        for (i=0;i<butonsList.length;i++) {
            
            butonsList[i].addEventListener('click', function playVideo (button_click) {
                var videoUrlValue = button_click.target.name;
                var videoTagHtml = '<video autoplay width="720" height="405" controls><source src="'+ videoUrlValue +'" type="video/mp4">Your browser does not support the video tag.</video>';
                document.getElementById('video-container').innerHTML = videoTagHtml;

            });
        };

    };
    
});

*/
///----para  pruebas ---



/*


var text = String('"FullName","Name","Extension","CreationTime","LastWriteTime","Length"\n"C:\Users\Andres\Downloads\Test\502013189,_S_cnt_1_r720P.mp4","502013189,_S_cnt_1_r720P.mp4",".mp4","27/07/2021 9:11:41 a. m.","27/07/2021 9:11:44 a. m.","47624437"\n"C:\Users\Andres\Downloads\Test\502013393_S_cnt_1_r720P.mp4","502013393_S_cnt_1_r720P.mp4",".mp4","27/07/2021 9:11:48 a. m.","27/07/2021 9:11:52 a. m.","52896649"\n"C:\Users\Andres\Downloads\Test\502015143_S_cnt_1_r720P.mp4","502015143_S_cnt_1_r720P.mp4",".mp4","27/07/2021 9:11:55 a. m.","27/07/2021 9:11:59 a. m.","49121589"');
dataToArray(text);

*/

// aqui inicia el codigo 

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
    var records = [];

    function record (FullName, Name, Extension, /*CreationTime, LastWriteTime, */Length, Radicado, Date, Time, Organo, Reserved, Consecutivo, Virtual, NewName, NameLength, Category) {
        this.FullName = FullName;
        this.Name = Name;
        this.Extension = Extension; /*
        this.CreationTime = CreationTime;
        this.LastWriteTime = LastWriteTime;  */
        this.Length = Length;
        this.Radicado = Radicado;
        this.Date = Date;
        this.Time = Time;
        this.Organo = Organo;
        this.Reserved = Reserved;
        this.Virtual = Virtual;
        this.Consecutivo = Consecutivo;
        this.NewName = NewName;
        this.NameLength = NameLength;
        this.Category = Category;
    };


    //var unQuotedText = text.replace(/['"]+/g, "");

    console.log (text);

    var row = text.split('\n');

    console.log (row);
    
    for (let i=0 ; i < row.length ; i++) {

        var cell = row[i].slice(1,-1).split('\",\"');
        var newRecord = new record(cell[0], cell[1], cell[2], /*cell[3], cell[4], */cell[5], "", "", "", "", "", "", "", "", "", "");
        records.push(newRecord); 
    };

    console.log (records);

    // generador de tabla HTML 
    var html = '<table id="table-container">';
    html += '<tr>';

        // crear encabezados desde el archivo
        /*
        for( var j in records[0] ) {
            html += '<th class="table-header">' + j +'</th>';
        };
        

        */
       
        html += '<th class="table-header">Video</th>';
        html += '<th class="table-header">Nombre Inicial</th>';
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
        

        html += '</tr>';
        // crear celdas de contenido
        for( var i = 1; i < records.length; i++) {
            html += '<tr>';
            for( var j in records[i] ) {
                
                // casos para generar cada elemento HTML
                switch (j) {
                    case "FullName": html += '<td><button class="play-button" name="' + records[i][j] + '">Play</button></td>';
                        break;

                    case "Name": html += '<td><p class="row'+i+'" name="Name" >' + records[i][j]+ '</p></td>';
                        break;

                    case "Extension": html += '<td><input class="row'+i+'" name="Extension" type="text" readonly="readonly" value="' + records[i][j]+ '"></td>';
                        break;
                    
                    case "Radicado": html += '<td><input class="row'+i+'" name="Radicado" type="number" maxlength="23" value="0000000000000000000000'+i+'"></td>';
                        break;

                    case "Date": html += '<td><input class="row'+i+'" name="Date" type="text" maxlength="8" value="AAAAMMDD"></td>';
                        break;
                    
                    case "Time": html += '<td><input class="row'+i+'" name="Time" type="text" maxlength="4" value="HHMM"></td>';
                        break;

                    case "Organo": html += '<td><input class="row'+i+'" name="Organo" type="number" maxlength="12" value="000000000000"></td>';
                        break;
                    
                    case "Reserved": html += '<td><input class="row'+i+'" name="Reserved" type="text" maxlength="1" value="R"></td>';
                        break;

                    case "Virtual": html += '<td><input class="row'+i+'" name="Virtual" type="text" maxlength="1" value="V"></td>';
                        break;

                    case "Consecutivo": html += '<td><input class="row'+i+'" name="Consecutivo" type="number" maxlength="2" value="01"></td>';
                        break;

                    case "NewName": html += '<td><input class="row'+i+'" name="NewName" type="text"></td>';
                        break;

                    case "NameLength": html += '<td><input class="row'+i+'" name="NameLength" type="number"></td>';
                        break;

                    case "Category": html += '<td><select class="row'+i+'" name="Category" type="number"> <option>Catalogable</option> <option>No Catalogable</option> <option>Duplicado</option> <option>Historico</option> </select> </td>';
                        break;

                    default: html += "<td>" + records[i][j]+ "</td>";
                        break;
                };

            };
        html += '</tr>';
        };
    html += '</table>';
    document.getElementById('container').innerHTML = html;

    
    document.getElementById('table-container').addEventListener('change', checkConsecutivo); 

    //----- creacion de eventos para reproducir video al hacer click en el boton

    var butonsList = document.getElementsByClassName('play-button');
    
    for (i=0;i<butonsList.length;i++) {
        
        butonsList[i].addEventListener('click', function playVideo (button_click) {
            var videoUrlValue = button_click.target.name;
            var videoTagHtml = '<video autoplay width="1024" height="405" controls><source src="'+ videoUrlValue +'" type="video/mp4">Your browser does not support the video tag.</video>';
            document.getElementById('video-container').innerHTML = videoTagHtml;
        });

    };

    
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
  
        
        var fieldRadicado = rowList['Radicado'].value;
        var fieldOrgano = rowList['Organo'].value;
        var fieldConsecutivo = rowList['Consecutivo'].value;
        var fieldDate = rowList['Date'].value;
        var fieldTime = rowList['Time'].value;
        var fieldExtension = rowList['Extension'].value;
        var fieldReserved = rowList['Reserved'].value;
        var fieldVirtual = rowList['Virtual'].value;

        //asignar valor a NewName
        
        rowList['NewName'].value = fieldRadicado +"_"+ fieldReserved + fieldOrgano + "0000000000" +"_"+ fieldConsecutivo +"_"+ fieldDate +"_"+ fieldTime +"00"+ "_" + fieldVirtual + fieldExtension;

        //asignar valor a NameLength
        rowList['NameLength'].value = String(rowList['NewName'].value).length;

    } ;

    saveDataOnLocalStorage();
};

function saveDataOnLocalStorage() {
    var tableDataContainer = document.getElementById('container').outerHTML;
    //console.log(tableDataContainer);
    
    if (typeof(Storage) !== 'undefined') {
        localStorage.tableData = tableDataContainer;
        //console.log("ESTO SE GUARDA"+localStorage.tableData);
        console.log("Guardado en local storage");
      } else {
        console.log("Local storage NO disponible");
      }
}

