// Declare the password
let pass = '7884';

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
let now = new Date();
let date = now.getDate();
document.getElementById('dateEle').innerHTML = `Date: ${date} / ${now.getMonth() + 1} / ${now.getFullYear()}`;
let lsArr;
let stringedArr=[]
if (localStorage.getItem('lsArr') === null) {
  let tempArr = [];
  for (let i = 0; i < 31; i++) {
    tempArr[i] = [];
    for (let j = 0; j < 8; j++) {
      tempArr[i][j] = '0';
    }
  }
  let stringTempArr = JSON.stringify(tempArr);
  localStorage.setItem('lsArr', stringTempArr);
  console.log('lsArr has been initialized and set in local storage.');
} else {
  console.log('lsArr is not null');
  stringedArr = localStorage.getItem('lsArr');
  lsArr = JSON.parse(stringedArr);
}




let p =1; 
let todayArr = [];
for (var i = 0; i < 8; i++) {
  todayArr[i] = '0';
}

function saveClass() {
    cls = document.getElementById('classEle').value;
    if (cls === '0') {
        alert('Select a class');
    } else {
        if (p <= 8) {
            todayArr[p - 1] = cls;
            p++;
            document.getElementById('classEle').value = '0';
            document.getElementById('periodTxt').innerHTML = `Period - ${p}`;

            if (p === 8) {
                document.getElementById('nxt').innerHTML = 'Finish';
                document.getElementById('nxt').style.backgroundColor = '#37ff00';
                document.getElementById('nxt').style.color = 'black';
            }
        }

        if (p > 8 || p === 9) {
            document.getElementById('attendanceSheetDiv').style.display = 'none';
            document.getElementById('msg').innerText = 'Attendance Updated ✅'            
            console.log('TodayArr is: ',todayArr)
            saveData(todayArr)
            p=1;
        }
    }
}
function saveData(arr){
  let lsArr = JSON.parse(localStorage.getItem('lsArr'));
  let todayArr = arr;
  for (var i = 0; i < lsArr.length; i++) {
    for (var j = 0; j < todayArr.length; j++) {
       if (i === date-1) {
         lsArr[i][j] = todayArr[j];
       }
       else {
         continue;
       }
    }
  }
  localStorage.setItem('lsArr',JSON.stringify(lsArr))
}


function reset(){
  let ok = confirm('Do you want to reset all the data ?');
  if (ok) {
    let lsArr = JSON.parse(localStorage.getItem('lsArr'))
    for (var i = 0; i < 31; i++) {
      for (var j = 0; j < 8; j++) {
        lsArr[i][j] = '0';
        
      }
    } 
    localStorage.setItem('lsArr',JSON.stringify(lsArr))
  }
}

let fullArr = [
        '1A', '1B', '1C', '1D', '1E', '2A', '2B', '2C', '2D', '2E',
        '3A', '3B', '3C', '3D', '3E', '4A', '4B', '4C', '4D', '4E',
        '5A', '5B', '5C', '5D', '5E', '6A', '6B', '6C', '6D', '6E',
        '7A', '7B', '7C', '7D', '7E', '8A', '8B', '8C', '8D', '8E',
        '9A', '9B', '9C', '9D', '9E', '10A', '10B', '10C', '10D', '10E',
        'MPC1', 'MPC2', 'BiPC1', 'BiPC2', 'HPG1', 'HPG2', 'MBiPC1', 'MBiPC2'
    ];

let countArr = [];
for (var i = 0; i < fullArr
  .length; i++) {
  countArr[i] = 0;
}

function check(){
  let lsArr = JSON.parse(localStorage.getItem('lsArr'))
  let tbody = document.getElementById('tbody');
  let fromEle = document.getElementById('fromEle');
  let toEle = document.getElementById('toEle');
  
  
  if (fromEle.value >= 1 && toEle.value<=31 && toEle.value >= 1 && fromEle.value<=31) {
    
  
    
    for (var i = 0; i < fullArr
  .length; i++) {
  countArr[i] = 0;
}
    for (var i = 0; i < fullArr.length; i++) {
      for (var x = fromEle.value - 1; x <= toEle.value -1; x++) {
        for (var y = 0; y < 8; y++) {
          if (fullArr[i] === lsArr[x][y]) {
            countArr[i]++;
          }
        }
      }
    }
    let isEmpty = true;
    for (var i = 0; i < countArr.length; i++) {
      if (countArr[i] !== 0) {
        isEmpty = false;
      }
    }
    if (!isEmpty) {
      displayTable(countArr);
      let emptyTxt = document.getElementById('emptyTxt');
      emptyTxt.innerText = '';
    }
    else {
      let emptyTxt = document.getElementById('emptyTxt');
      emptyTxt.innerText = 'No Classes Attended'
    }
  }
  else {
    alert('Enter valid dates')
  }
}
function displayTable(arr){
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