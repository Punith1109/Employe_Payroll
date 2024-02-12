function populateTable(data) {
  var tbody = document.getElementById('container2');
  tbody.innerHTML = '';

  data.forEach(function (empData) {
    var row = document.createElement('tr');

    Object.keys(empData).forEach(function (key) {
      if (key !== "id") {
        var cell = document.createElement('td');
        // if (key === "name") {
      
        //   var img = document.createElement('img');
        //   img.src = empData['Photo']; 
        //   img.alt = empData['Name']; 
        //   img.style.width = '30px'; 
        //   cell.appendChild(img);
          
          
        //   cell.appendChild(document.createTextNode(' '));
        // }
        cell.textContent = empData[key];
        row.appendChild(cell);
      }
    });

    var delb = document.createElement('button');
    delb.textContent = 'Delete';
    delb.className = 'btn btn-danger';
    delb.onclick = function () {
      $.ajax({
        url: 'http://localhost:3000/data/' + empData.id,
        method: 'DELETE',
        success: function () {
          tbody.removeChild(row);
        },
        error: function (xhr, status, error) {
          console.error('Error deleting employee data', error);
        },
      });
    };

    var eb = document.createElement('button');
    eb.textContent = 'Edit';
    eb.className = 'btn btn-primary';
    eb.onclick = function () {
      
      var originalData = Object.assign({}, empData); 
      
      var modal = document.createElement('div');
      modal.className = 'modal';
      modal.id = 'editModal' + empData.id;
      modal.tabIndex = -1;
      modal.role = 'dialog';
      modal.ariaHidden = true;
    
      var modalDialog = document.createElement('div');
      modalDialog.className = 'modal-dialog';
      modal.appendChild(modalDialog);
    
      var modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      modalDialog.appendChild(modalContent);
    
      var modalHeader = document.createElement('div');
      modalHeader.className = 'modal-header';
      modalContent.appendChild(modalHeader);
    
      var closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'close';
      closeButton.ariaLabel = 'Close';
      closeButton.onclick = function () {
        $(modal).modal('hide');
      };
      var span = document.createElement('span');
      span.ariaHidden = true;
      span.innerHTML = '&times;';
      closeButton.appendChild(span);
      modalHeader.appendChild(closeButton);
    
      var modalTitle = document.createElement('h5');
      modalTitle.className = 'modal-title';
      modalTitle.textContent = 'Edit Employee';
      modalHeader.appendChild(modalTitle);
    
      var modalBody = document.createElement('div');
      modalBody.className = 'modal-body';
      modalContent.appendChild(modalBody);
    
    
      var form = document.createElement('form');
    
      var columnNames = ['Name', 'Gender', 'Department', 'Salary', 'Start Date', 'Note'];
      Object.keys(empData).forEach(function (key, index) {
        if (key !== "id") {
          var formGroup = document.createElement('div');
          formGroup.className = 'form-group';
    
          var label = document.createElement('label');
          label.textContent = columnNames[index];
    
          var input = document.createElement('input');
          input.className = 'form-control';
          input.type = 'text';
          input.name = columnNames[index]; // Set input name
          input.value = empData[key];
    
          formGroup.appendChild(label);
          formGroup.appendChild(input);
          form.appendChild(formGroup);
        }
      });
    
      modalBody.appendChild(form);
    
     
      var modalFooter = document.createElement('div');
      modalFooter.className = 'modal-footer';
      modalContent.appendChild(modalFooter);
    
      var saveButton = document.createElement('button');
      saveButton.textContent = 'Save Changes';
      saveButton.className = 'btn btn-primary';
      saveButton.onclick = function () {
        
        var updatedData = {};
        form.querySelectorAll('input[type="text"]').forEach(function (input) {
          updatedData[input.name] = input.value;
        });
      
     
        var isDataChanged = false;
        Object.keys(updatedData).forEach(function (key) {
          if (updatedData[key] !== originalData[key]) {
            isDataChanged = true;
            return;
          }
        });
      
        if (isDataChanged) {
          
          $.ajax({
            url: 'http://localhost:3000/data/' + empData.id,
            method: 'PUT',
            data: JSON.stringify(updatedData),
            contentType: 'application/json',
            success: function () {
              
              populateTable(data);
              $(modal).modal('hide');
            },
            error: function (xhr, status, error) {
              console.error('Error updating employee data', error);
            },
          });
        } else {
          
          $(modal).modal('hide');
        }
      };
      modalFooter.appendChild(saveButton);
    
      var cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.className = 'btn btn-secondary';
      cancelButton.onclick = function () {
        $(modal).modal('hide');
      };
      modalFooter.appendChild(cancelButton);
    
      document.body.appendChild(modal);
    
      // Initialize the modal using jQuery
      $(modal).modal('show');
    };

    var actionsCell = document.createElement('td');
    actionsCell.appendChild(delb);
    actionsCell.appendChild(eb);
    row.appendChild(actionsCell);

    tbody.append(row);
  });
}

$.getJSON('http://localhost:3000/data', function (data) {
  console.log(data[0]);
  populateTable(data);
});
