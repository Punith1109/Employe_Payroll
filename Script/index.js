function empdetails(event) {
  event.preventDefault();

  var name = $('.name').val();


  var selectedGender = $('#option1').is(':checked');

  var q = selectedGender ? "male" : "female";
  alert(selectedGender)
  var selectedDepartments = []; // declare selectedDepartments as an empty array

  var hr = $('#op1').is(':checked');
  var sales = $('#op2').is(':checked');
  var finance = $('#op3').is(':checked');
  
  if (hr) {
    selectedDepartments.push("HR");
  }
  if (sales) {
    selectedDepartments.push("Sales");
  }
  if (finance) {
    selectedDepartments.push("Finance");
  }
  var selectedSalary = $('#salary').val();

  var startDay = $('#startday').val();

  var notes = $('.notes').val();

  var obj = {
    "name": name,
    "gender": q,
    "Departments": selectedDepartments,
    "Salary": selectedSalary,
    "Start Day": startDay,
    "Notes": notes
  }
  $.ajax({
      url: 'http://localhost:3000/data',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        window.location.href = "../Pages/index2.html";
      },
      error: function(error) {
        console.log(error);
      }
    });
    
  
};

document.getElementById("submited").addEventListener('click', empdetails);



