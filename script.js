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
        console.log(cell);
        var newRecord = new record(cell[0], cell[1], cell[2], cell[3], cell[4], cell[5], "", "", "", "", "", "", "");
        records.push(newRecord); 
    };

    // generador de tabla HTML 
    var html = '<table>';
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
                    
                    case "Radicado": html += '<td><input type="number" maxlength="23"></td>';
                        break;

                    case "Datetime": html += '<td><input type="number"></td>';
                        break;

                    case "Organo": html += '<td><input type="number" maxlength="12"></td>';
                        break;
                    
                    case "Reserved": html += '<td><input type="checkbox"></td>';
                        break;

                    case "Consecutivo": html += '<td><input type="number" maxlength="2"></td>';
                        break;

                    case "NewName": html += '<td><input type="number"></td>';
                        break;

                    case "NameLength": html += '<td><input type="number"></td>';
                        break;

                    default: html += "<td>" + records[i][j]+ "</td>";
                        break;
                };

            };
        html += '</tr>';
        };
    html += '</table>';
    document.getElementById('container').innerHTML = html;

};



