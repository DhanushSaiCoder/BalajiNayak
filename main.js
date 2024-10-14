// Declare the password
let pass = '';

// Function to start the login process
function start() {
    var passEle = document.getElementById('passEle');

    if (passEle.value === pass) {
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('btnsDiv').style.display = 'flex';
    } else {
        passEle.value = '';
        alert('Incorrect Password');
    }
}

// Functions to show various sections
function showEnter() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('reportDiv').style.display = 'none';
    document.getElementById('enterDiv').style.display = 'block';
}

function showReport() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('enterDiv').style.display = 'none';
    document.getElementById('reportDiv').style.display = 'block';
}

// Function to go back to the main content
function back(curr) {
    if (curr === 'report') {
        document.getElementById('reportDiv').style.display = 'none';
        document.getElementById('content').style.display = 'flex';
        showMenu();
    } else if (curr === 'enter') {
        document.getElementById('enterDiv').style.display = 'none';
        document.getElementById('content').style.display = 'flex';
        showMenu();
    }
}

// Function to show the menu
function showMenu() {
    document.getElementById('loginDiv').style.display = 'none';
    document.getElementById('btnsDiv').style.display = 'flex';
}

// Date initialization

let date = new Date().getDate();
document.getElementById('dateEle').innerHTML = `Date: ${date} / ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`;





/*function displayTable(arr){
  let reportTableDiv = document.getElementById('reportTableDiv');
  let tableDiv = document.getElementById('tableDiv');
  let tbody = document.getElementById('tbody');
  reportTableDiv.style.display = 'block';
  tableDiv.style.display = 'block';
  let innerHTML = '';
  let html = '';
  
  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      if (arr[i] === 1) {
        html = `<tr><td>${fullArr[i]}</td><td>${arr[i]} Time</td></tr>`
      }else{
      html = `<tr><td>${fullArr[i]}</td><td>${arr[i]} Times</td></tr>`
      }
      innerHTML += html;
    }
  }
  tbody.innerHTML = innerHTML;
}
  */