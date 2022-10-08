const {ipcRenderer} = require('electron');

ipcRenderer.on('channel5', (e, args) => {
  console.log(args);
  createVerifyTable (args);
})

function createVerifyTable (array) {
  
  let html = '<table id="table-container" class="verify-table">';
      html += '<thead id="header-container"><tr>';
      html += '<th class="table-header"></th>';
      html += '<th class="table-header">Tamaño</th>';
      html += '<th class="table-header">Nombre</th>';
      html += '</tr></thead>';

      html += '<tbody id= "row-container"';

      if (typeof(array.length) == 'undefined') {
        
        html += '<tr>';

        //validar si el json es de importacion o de catalogacion
            if (typeof(array.Check)  == 'undefined') {
              html += `<td></td>`
            } else {
              document.getElementById("verify-page-title").innerText = "RESULTADO DE CATALOGACION";

              // si hay algun error colocar en rojo la celda
              if(array.Check == "error") {
                html += `<td style="background: #c06363">${array.Check}</td>`;
              } else {
                html += `<td>${array.Check}</td>`;
              }
            }
            html += `<td>${array.Length}</td>`;
            html += `<td>${array.Name}</td>`;
            html += '</tr>';

      } else {

              array.forEach(element => {

                html += '<tr>';

                //validar si el json es de importacion o de catalogacion
                    if (typeof(element.Check)  == 'undefined') {
                      html += `<td></td>`
                    } else {
                      document.getElementById("verify-page-title").innerText = "RESULTADO DE CATALOGACION";

                      // si hay algun error colocar en rojo la celda
                      if(element.Check == "error") {
                        html += `<td style="background: #c06363">${element.Check}</td>`;
                      } else {
                        html += `<td>${element.Check}</td>`;
                      }
                      
                    }
                    
                html += `<td>${element.Length}</td>`;
                html += `<td>${element.Name}</td>`;
                html += '</tr>';
            });

      }
      
        html += '</tbody></table>';
   
        document.getElementById('verify-table-container').innerHTML = html;
}