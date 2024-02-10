function populateTable(data) {


var tbody=$('#container2')

for(let i=0;i<data.length;i++){
  alert("yes")
  const row = document.createElement('tr');
  var empData=data[i];
  Object.keys(empData).forEach(function(key){
    if(key!=="id"){
      var cell = document.createElement('td'); 
                var textNode = document.createTextNode(empData[key]); 
                cell.appendChild(textNode); 
                row.appendChild(cell);
    }
  })
  tbody.append(row); 
}
  
  tbody.append(row); 
}

$.getJSON('http://localhost:3000/data', function(data) {
  console.log(data[0]);
  populateTable(data); 
});