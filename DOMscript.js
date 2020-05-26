var checkedValue = [];
var selectedRow = null;

function getCheckBox(CheckBoxGroup) {
    var inputElements = document.getElementsByName(CheckBoxGroup);
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkedValue.push(inputElements[i].checked);      
            return `<a>Yes</a>`
        }
        else {
            return `<a>No</a>`
        }

    } 
}

function onFormSubmit(){
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData)
        else
        Update(formData);
        
    resetForm();
}

function readFormData(){
    var formData = {};
    var firstname = document.querySelector('#firstname').value;
    var lastname = document.querySelector('#lastname').value;
    var email = document.querySelector('#email').value;

    let Gender = document.getElementById("gender");
    let gender = Gender.options[Gender.selectedIndex].text

    var nameIs = firstname +" "+ lastname;

    formData = {
        Name: nameIs,
        Email : email,
        Gender: gender,
        Visit: getCheckBox("visit")
    };
    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById("form_data").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.Name;
    
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Email;
    
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.Gender;
    
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Visit;
    
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onclick="Edit(this)">Edit</button>`;
    
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onclick="Delete(this)">Delete</button>`;

}

function resetForm(){
    document.getElementById('firstname').value ="";
    document.getElementById('lastname').value = "";
    document.getElementById('email').value = "";
    // document.getElementById("gender").value = "";
    document.getElementById("visit").value = " ";
    document.getElementById("submit").childNodes[0].nodeValue = "Submit";
    selectedRow = null

}

function Edit(td){
    selectedRow = td.parentElement.parentElement;
    var fullname = document.getElementById('firstname').value +" "+ document.getElementById('lastname').value;
        
    fullname = selectedRow.cells[0].innerHTML;
    document.getElementById('firstname').value= fullname.split(" ").slice(0,-1);
    document.getElementById('lastname').value = fullname.split(" ").slice(-1);
    
    document.getElementById('email').value = selectedRow.cells[1].innerHTML;
    // document.getElementById("gender") = selectedRow.cells[2].innerHTML;
    document.getElementById("visit").value = selectedRow.cells[3].innerHTML;

    document.getElementById("submit").childNodes[0].nodeValue = "Update";
}

function Update(formData){
    selectedRow.cells[0].innerHTML = formData.Name;
    selectedRow.cells[1].innerHTML = formData.Email;
    selectedRow.cells[2].innerHTML = formData.Gender;
    selectedRow.cells[3].innerHTML = formData.Visit;
    resetForm()
}

function Delete(td) {
    if (confirm("Are you sure to delete this record?")){
        row = td.parentElement.parentElement;
        document.getElementById("form_data").deleteRow(row.rowIndex);
        resetForm();
    }
    
}