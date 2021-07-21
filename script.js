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

    function record (FullName, Name, Extension, CreationTime, LastWriteTime, Length) {
        this.FullName = FullName;
        this.Name = Name;
        this.Extension = Extension;
        this.CreationTime = CreationTime;
        this.LastWriteTime = LastWriteTime;
        this.Length = Length;
    };

    var row = text.split("\n");
    
    for (var i=0 ; i < row.length ; i++) {

        var cell = row[i].split(",");
        console.log(cell);
        var newRecord = new record(cell[0], cell[1], cell[2], cell[3], cell[4], cell[5]);
        records.push(newRecord); 
    };

    var html = '<table>';
    html += '<tr>';
        for( var j in records[0] ) {
        html += "<th>" + j +"</th>";
        };
        html += '</tr>';
        for( var i = 1; i < records.length; i++) {
            html += '<tr>';
            for( var j in records[i] ) {
                if (j == "FullName") {
                    html += "<td><a href=" + records[i][j] + ">" + records[i][j] + "</a></td>";
                } else {
                    html += "<td>" + records[i][j]+ "</td>";
                };
                
            };
        html += '</tr>';
        };
    html += '</table>';
    document.getElementById('container').innerHTML = html;

};



