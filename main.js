// Declare the password
let pass = '';
let login = false;
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




//Data Arr

let dataArr = [
  {
    date: new Date().getDate(), 
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    
    regularClasses: [],
    substitutionClasses: [],
    
    totalRegClasses: 0,
    totalSubClasses: 0,
    totalClasses: 0
  }
];

let regularArr = []
let subArr = []

function generateClassString(form){
  let cls = form.class.value;
  let section = form.option.value;
  let Class = cls+section;
  if(form.substitution.checked){
    subArr.push(Class)
    return
  }
  regularArr.push(Class)
  
  
}


function submitForm(){

  let form1= document.getElementById('dataForm1')
  let form2= document.getElementById('dataForm2')
  let form3= document.getElementById('dataForm3')
  let form4= document.getElementById('dataForm4')
  let form5= document.getElementById('dataForm5')
  let form6= document.getElementById('dataForm6')
  let form7= document.getElementById('dataForm7')
  let form8= document.getElementById('dataForm8')

  let formArr = [form1,form2,form3,form4,form5,form6,form7,form8]

  for(let i = 0;i<8;i++)
    generateClassString(formArr[i]);
  
  console.log(regularArr,subArr)
  
}








