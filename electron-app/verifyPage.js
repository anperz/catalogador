const {ipcRenderer} = require('electron');

ipcRenderer.on('channel5', (e, args) => {
  console.log(args);
  createVerifyTable (args);
})

function createVerifyTable (array) {
  
  let html = '<table id="table-container">';
      html += '<thead id="header-container"><tr>';
      html += '<th class="table-header">Largo</th>';
      html += '<th class="table-header">Ruta</th>';
      html += '</tr></thead>';

      html += '<tbody id= "row-container"';
      array.forEach(element => {

          html += '<tr>';
          html += `<td>${element.lengthOfName}</td>`;
          html += `<td>${element.FullName}</td>`;
          html += '</tr>';
      });


      html += '</tbody></table>';
   
  document.getElementById('verify-table-container').innerHTML = html;
}