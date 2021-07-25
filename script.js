/*

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
 */

///----para  pruebas ---



var text = "FullName,Name,Extension,CreationTime,LastWriteTime,Length\nC:\Users\Andres\Downloads\30890255.jpg,30890255.jpg,.jpg,15/07/2021 12:37:38 p.?m.,15/07/2021 12:37:38 p.?m.,64076\nC:\Users\Andres\Downloads\31398801.jpg,31398801.jpg,.jpg,15/07/2021 12:33:03 p.?m.,15/07/2021 12:33:04 p.?m.,78968\nC:\Users\Andres\Downloads\adbd10f163e2abae69b905a9022f81f4.jpg,adbd10f163e2abae69b905a9022f81f4.jpg,.jpg,15/07/2021 12:38:42 p.?m.,15/07/2021 12:38:58 p.?m.,87399\nC:\Users\Andres\Downloads\AnyDesk.exe,AnyDesk.exe,.exe,1/07/2021 12:55:25 p.?m.,1/07/2021 12:55:25 p.?m.,3765992\nC:\Users\Andres\Downloads\Asamblea,Asamblea,,4/07/2021 8:54:09 a.?m.,11/07/2021 9:01:25 a.?m.,\nC:\Users\Andres\Downloads\Asamblea\CO-r21_S_01_r720P.mp4,CO-r21_S_01_r720P.mp4,.mp4,4/07/2021 8:54:01 a.?m.,4/07/2021 8:56:47 a.?m.,814571136\nC:\Users\Andres\Downloads\Asamblea\CO-r21_S_02_r720P.mp4,CO-r21_S_02_r720P.mp4,.mp4,4/07/2021 8:55:21 a.?m.,4/07/2021 8:56:48 a.?m.,379844370\nC:\Users\Andres\Downloads\Asamblea\CO-r21_S_03_r720P.mp4,CO-r21_S_03_r720P.mp4,.mp4,11/07/2021 8:58:05 a.?m.,11/07/2021 9:00:54 a.?m.,679581773\nC:\Users\Andres\Downloads\Asamblea\CO-r21_S_04_r720P.mp4,CO-r21_S_04_r720P.mp4,.mp4,11/07/2021 8:58:31 a.?m.,11/07/2021 9:01:25 a.?m.,693578342";
dataToArray(text);

function dataToArray(text) {
    var records = [];

    function record (FullName, Name, Extension, /*CreationTime, LastWriteTime, */Length, Radicado, Date, Time, Organo, Reserved, Consecutivo, NewName, NameLength) {
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
        this.Consecutivo = Consecutivo;
        this.NewName = NewName;
        this.NameLength = NameLength;
    };

    var row = text.split("\n");
    
    for (let i=0 ; i < row.length ; i++) {

        var cell = row[i].split(",");
        var newRecord = new record(cell[0], cell[1], cell[2], /*cell[3], cell[4], */cell[5], "", "", "", "", "", "", "", "");
        records.push(newRecord); 
    };

    // generador de tabla HTML 
    var html = '<table id="table-container">';
    html += '<tr>';
        for( var j in records[0] ) {
        html += "<th>" + j +"</th>";
        };
        html += '</tr>';
        for( var i = 1; i < records.length; i++) {
            html += '<tr>';
            for( var j in records[i] ) {
                
                // casos para generar cada elemento HTML
                switch (j) {
                    case "FullName": html += '<td><button class="play-button" name="' + records[i][j] + '">Play</button></td>';
                        break;

                    case "Extension": html += '<td class="row'+i+'" name="Extension">' + records[i][j]+ '</td>';
                        break;
                    
                    case "Radicado": html += '<td><input class="row'+i+'" name="Radicado" type="number" maxlength="23" value="0000000000000000000000'+i+'"></td>';
                        break;

                    case "Date": html += '<td><input class="row'+i+'" name="Date" type="text" maxlength="8" value="AAAAMMDD"></td>';
                        break;
                    
                    case "Time": html += '<td><input class="row'+i+'" name="Time" type="text" maxlength="4" value="HHMM"></td>';
                        break;

                    case "Organo": html += '<td><input class="row'+i+'" name="Organo" type="number" maxlength="12" value="000000000000"></td>';
                        break;
                    
                    case "Reserved": html += '<td><input class="row'+i+'" name="Reserved" type="checkbox"></td>';
                        break;

                    case "Consecutivo": html += '<td><input class="row'+i+'" name="Consecutivo" type="number" maxlength="2" value="01"></td>';
                        break;

                    case "NewName": html += '<td><input class="row'+i+'" name="NewName" type="text"></td>';
                        break;

                    case "NameLength": html += '<td><input class="row'+i+'" name="NameLength" type="number"></td>';
                        break;

                    default: html += "<td>" + records[i][j]+ "</td>";
                        break;
                };

            };
        html += '</tr>';
        };
    html += '</table>';
    document.getElementById('container').innerHTML = html;

    // crear eventos para actualizar valores

    document.getElementById('table-container').addEventListener('change', checkConsecutivo); 

    //----- creacion de eventos para reproducir video al hacer click en el boton

    var butonsList = document.getElementsByClassName('play-button');
    
    for (i=0;i<butonsList.length;i++) {
        
        butonsList[i].addEventListener('click', function playVideo (button_click) {
            var videoUrlValue = button_click.target.name;
            var videoTagHtml = '<video autoplay width="720" height="480" controls><source src="'+ videoUrlValue +'" type="video/mp4">Your browser does not support the video tag.</video>';
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

        if (rowList['Reserved'].checked == true) {
            ReservedStatus = "R";
        } else {
            ReservedStatus = "L";
        }
        
        rowList['NewName'].value = rowList['Radicado'].value +"_"+ ReservedStatus + rowList['Organo'].value + "0000000000" +"_"+ rowList['Consecutivo'].value +"_"+ rowList['Date'].value +"_"+ rowList['Time'].value +"00"+ "_V" + rowList['Extension'].innerHTML;
        
        rowList['NameLength'].value = String(rowList['NewName'].value).length;

    } ;

};

