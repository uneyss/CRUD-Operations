// Validate form inputs before submitting data
function validateForm() {
  let name = document.getElementById('name').value;
  let age = document.getElementById('age').value;
  let address = document.getElementById('address').value;
  let email = document.getElementById('email').value;

  if (name === '') {
    alert('Name is required');
    return false;
  } else if (age < 1) {
    alert('Age must not be zero or less than zero');
    return false;
  }

  if (address === '') {
    alert('Address is required');
    return false;
  }

  if (email === '') {
    alert('Email is required');
    return false;
  } else if (!email.includes('@')) {
    alert('Invalid email address');
    return false;
  }

  return true;
}

// Function to show data from local storage
function showData() {
  let peopleList;

  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  let html = '';

  peopleList.forEach(function (element, index) {
    html += '<tr>';
    html += '<td>' + element.name + '</td>';
    html += '<td>' + element.age + '</td>';
    html += '<td>' + element.address + '</td>';
    html += '<td>' + element.email + '</td>';
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button ' +
      'onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';

    html += '</tr>';
  });

  document.querySelector('#crudTable tbody').innerHTML = html;
}

// Loads all data from local storage when document or page is loaded
window.onload = showData;

// Function to add data to local storage
function AddData() {
  // if form is validated
  if (validateForm()) {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;

    let peopleList;

    if (localStorage.getItem('peopleList') == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem('peopleList', JSON.stringify(peopleList));
    showData();
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('address').value = '';
    document.getElementById('email').value = '';
  }
}

// function to delete Data from local storage

function deleteData(index) {
  let peopleList;

  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  peopleList.splice(index, 1);
  localStorage.setItem('peopleList', JSON.stringify(peopleList));
  showData();
}

// function to update/edit data in local storage
function updateData(index) {
  // Submit button will hide and Update button will show for updating of Data in Local Storage
  document.getElementById('Submit').style.display = 'none';
  document.getElementById('Update').style.display = 'block';

  let peopleList;

  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  document.getElementById('name').value = peopleList[index].name;
  document.getElementById('age').value = peopleList[index].age;
  document.getElementById('address').value = peopleList[index].address;
  document.getElementById('email').value = peopleList[index].email;

  document.querySelector('#Update').onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById('name').value;
      peopleList[index].age = document.getElementById('age').value;
      peopleList[index].address = document.getElementById('address').value;
      peopleList[index].email = document.getElementById('email').value;

      localStorage.setItem('peopleList', JSON.stringify(peopleList));

      showData();

      document.getElementById('name').value = '';
      document.getElementById('age').value = '';
      document.getElementById('address').value = '';
      document.getElementById('email').value = '';

      // Update button will hide and submit button will show
      document.getElementById('Submit').style.display = 'block';
      document.getElementById('Update').style.display = 'none';
    }
  };
}
