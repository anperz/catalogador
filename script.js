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


var text = "FullName,Name,Extension,CreationTime,LastWriteTime,Length\nC:\Users\Andres\Downloads\30890255.jpg,30890255.jpg,.jpg,15/07/2021 12:37:38 p.?m.,15/07/2021 12:37:38 p.?m.,64076\nC:\Users\Andres\Downloads\31398801.jpg,31398801.jpg,.jpg,15/07/2021 12:33:03 p.?m.,15/07/2021 12:33:04 p.?m.,78968";
dataToArray(text);

function dataToArray(text) {
    var records = [];

    function record (FullName, Name, Extension, CreationTime, LastWriteTime, Length, Radicado, Datetime, Organo, Reserved, Consecutivo, NewName, NameLength) {
        this.FullName = FullName;
        this.Name = Name;
        this.Extension = Extension;
        this.CreationTime = CreationTime;
        this.LastWriteTime = LastWriteTime;
        this.Length = Length;
        this.Radicado = Radicado;
        this.Datetime = Datetime;
        this.Organo = Organo;
        this.Reserved = Reserved;
        this.Consecutivo = Consecutivo;
        this.NewName = NewName;
        this.NameLength = NameLength;
    };

    var row = text.split("\n");
    
    for (var i=0 ; i < row.length ; i++) {

        var cell = row[i].split(",");
        //console.log(cell);
        var newRecord = new record(cell[0], cell[1], cell[2], cell[3], cell[4], cell[5], "", "", "", "", "", "", "");
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
                
                // casos para generar cada elemento
                switch (j) {
                    case "FullName": html += "<td><a href=" + records[i][j] + ">" + records[i][j] + "</a></td>";
                        break;
                    
                    case "Radicado": html += '<td><input class="row'+i+'" id="Radicado" type="number" maxlength="23"></td>';
                        break;

                    case "Datetime": html += '<td><input class="row'+i+'" id="Datetime" type="number"></td>';
                        break;

                    case "Organo": html += '<td><input class="row'+i+'" id="Organo" type="number" maxlength="12"></td>';
                        break;
                    
                    case "Reserved": html += '<td><input class="row'+i+'" id="Reserved" type="checkbox"></td>';
                        break;

                    case "Consecutivo": html += '<td><input class="row'+i+'" id="Consecutivo" type="number" maxlength="2"></td>';
                        break;

                    case "NewName": html += '<td><input class="row'+i+'" id="NewName" type="number"></td>';
                        break;

                    case "NameLength": html += '<td><input class="row'+i+'" id="NameLength" type="number"></td>';
                        break;

                    default: html += "<td>" + records[i][j]+ "</td>";
                        break;
                };

            };
        html += '</tr>';
        };
    html += '</table>';
    document.getElementById('container').innerHTML = html;

    document.getElementById('table-container').addEventListener('change', function(evento){
        var elem = evento.target;
           
        var radicadoValue = document.getElementsByClassName(evento.target.className)[0];
        var datetimeValue = document.getElementsByClassName(evento.target.className)[1];
        console.log(radicadoValue.value+datetimeValue.value);
        

        
        /*
        
        updatedElementID = String(elem.id);
        updatedElementClass = String(elem.className);
        console.log(updatedElementID, updatedElementClass);
        var radicadoValue = document.getElementById(updatedElementID);
        console.log(radicadoValue); */

    });


};

