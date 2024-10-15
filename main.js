// Declare the password
let pass = "";
let login = false;
document.getElementById('incorrectTxt').style.display='none'

document.getElementById("mainHeader").style.display = "none";
document.getElementById("successDiv").style.display = "none";
document.getElementById("settingsDivContainer").style.display = "none";

// Function to start the login process
function start() {
  var passEle = document.getElementById("passEle");

  if (passEle.value === pass) {
    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("btnsDiv").style.display = "flex";
    document.getElementById("mainHeader").style.display = "flex";
  } else {
    passEle.value = "";
    document.getElementById('incorrectTxt').style.display='flex'
  }
}

// Functions to show various sections
function showEnter() {
  document.getElementById("content").style.display = "none";
  document.getElementById("reportDiv").style.display = "none";
  document.getElementById("mainHeader").style.display = "none";
  document.getElementById("enterDiv").style.display = "block";
}

function showReport() {
  document.getElementById("content").style.display = "none";
  document.getElementById("enterDiv").style.display = "none";
  document.getElementById("reportDiv").style.display = "block";
  document.getElementById("mainHeader").style.display = "none";
}

// Function to go back to the main content
function back(curr) {
  if (curr === "report") {
    document.getElementById("mainHeader").style.display = "flex";
    document.getElementById("reportDiv").style.display = "none";
    document.getElementById("content").style.display = "flex";
    showMenu();
  } else if (curr === "enter") {
    document.getElementById("enterDiv").style.display = "none";
    document.getElementById("mainHeader").style.display = "flex";
    document.getElementById("content").style.display = "flex";
    showMenu();
  } else if (curr === "settings") {
    document.getElementById("settingsDivContainer").style.display = "none";
    document.getElementById("content").style.display = "flex";
    document.getElementById("settingsBtn").style.display = "flex";
  }
}

// Function to show the menu
function showMenu() {
  document.getElementById("loginDiv").style.display = "none";
  document.getElementById("btnsDiv").style.display = "flex";
}

// Date initialization

let date = new Date().getDate(); // one
document.getElementById("dateEle").innerHTML = `Date: ${date} / ${
  new Date().getMonth() + 1
} / ${new Date().getFullYear()}`;

//Data Arr

let dataArrSchema = [
  {
    date: new Date().getDate(), // two
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),

    regularClasses: [],
    substitutionClasses: [],

    totalRegClasses: 0,
    totalSubClasses: 0,
    totalClasses: 0,
  },
];

let regularArr = [];
let subArr = [];

function generateClassString(i, form, dayObj) {
  let cls = form.class.value;
  let section = form.option.value;
  let Class = cls + section;

  //temporarily pushed into regula/subArr

  if (form.substitution.checked) {
    dayObj.substitutionClasses[i] = Class;
    return;
  }
  dayObj.regularClasses[i] = Class;
}

function submitForm() {
  let dayObj = getDayObj();

  dayObj.regularClasses = [];
  dayObj.substitutionClasses = [];

  let form1 = document.getElementById("dataForm1");
  let form2 = document.getElementById("dataForm2");
  let form3 = document.getElementById("dataForm3");
  let form4 = document.getElementById("dataForm4");
  let form5 = document.getElementById("dataForm5");
  let form6 = document.getElementById("dataForm6");
  let form7 = document.getElementById("dataForm7");
  let form8 = document.getElementById("dataForm8");

  let formArr = [form1, form2, form3, form4, form5, form6, form7, form8];

  for (let i = 0; i < 8; i++) generateClassString(i, formArr[i], dayObj);


  //send to local storage >>

  let dataArr = JSON.parse(localStorage.getItem("dataArr"));
  let dataArrLength = dataArr.length;

  if (dataArr[dataArrLength - 1].date == date)
    dataArr[dataArrLength - 1] = dayObj;
  else {
    dataArr.push(dayObj);
  }
  localStorage.setItem("dataArr", JSON.stringify(dataArr));

  document.getElementById("enterContentDiv").style.display = "none";
  document.getElementById("successDiv").style.display = "flex";
}

function getDayObj() {
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem("dataArr") === null) {
      let arr = [
        {
          date: new Date().getDate(), // three
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          regularClasses: [],
          substitutionClasses: [],
          totalRegClasses: 0,
          totalSubClasses: 0,
          totalClasses: 0,
        },
      ];
      localStorage.setItem("dataArr", JSON.stringify(arr));
    }
    let dataArr = JSON.parse(localStorage.getItem("dataArr"));
    let dataArrLength = dataArr.length;

    let today = new Date().getDate(); // four

    if (dataArr[dataArrLength - 1].date === today) {
      return dataArr[dataArrLength - 1];
    } else {
      let newDayObj = {
        date: today,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        regularClasses: [],
        substitutionClasses: [],
        totalRegClasses: 0,
        totalSubClasses: 0,
        totalClasses: 0,
      };
      dataArr.push(newDayObj);
      localStorage.setItem("dataArr", JSON.stringify(dataArr));
      return newDayObj;
    }
  } else {
    console.error("Local storage is not supported in this browser.");
    return null;
  }
}

function reEnter() {
  document.getElementById("enterContentDiv").style.display = "flex";
  document.getElementById("successDiv").style.display = "none";
}

function openSettings() {
  document.getElementById("content").style.display = "none";
  document.getElementById("settingsBtn").style.display = "none";
  document.getElementById("settingsDivContainer").style.display = "flex";
}
function resetData() {
  let dataArr = [
    {
      date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      regularClasses: [],
      substitutionClasses: [],
      totalRegClasses: 0,
      totalSubClasses: 0,
      totalClasses: 0,
    },
  ];
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  window.location.href = "index.html";
}

/// report section >>

// function isWithinRange(obj, fromDate, toDate) {
//   let objDate = new Date(obj.year, obj.month - 1, obj.date);
//   return objDate >= fromDate && objDate <= toDate;
// }

// function check() {
//   let fromDateInput = document.getElementById("fromEle").value;
//   let toDateInput = document.getElementById("toEle").value;
//   let fromDate = new Date(fromDateInput);
//   let toDate = new Date(toDateInput);

//   // Gets the dataArr from the local storage
//   let dataArr = JSON.parse(localStorage.getItem("dataArr"));

//   // Gets the required data from the dataArr in the localstorage and stores it in requiredData[]
//   let requiredData = [];
//   for (let i = 0; i < dataArr.length; i++) {
//     let obj = dataArr[i];
//     if (isWithinRange(obj, fromDate, toDate)) {
//       requiredData.push(obj);
//     }
//   }
//   console.log(requiredData);

//   // Fetches the requiredRegularClasses[]
//   let requiredRegularClasses = [];
//   for (let i = 0; i < requiredData.length; i++) {
//     let obj = requiredData[i];
//     requiredRegularClasses.push(...obj.regularClasses);
//   }

//   // Fetches the requiredSubstitutionClasses[]
//   let requiredSubstitutionClasses = [];
//   for (let i = 0; i < requiredData.length; i++) {
//     let obj = requiredData[i];
//     requiredSubstitutionClasses.push(...obj.substitutionClasses);
//   }

//   // Removes nulls from both the required arrays
//   requiredRegularClasses = removeNulls(requiredRegularClasses);
//   requiredSubstitutionClasses = removeNulls(requiredSubstitutionClasses);

//   formTable(requiredRegularClasses, requiredSubstitutionClasses);
// }



function removeNulls(arr) {
  return arr.filter(item => item !== null);
}

function isWithinRange(obj, fromDate, toDate) {
  let objDate = new Date(obj.year, obj.month - 1, obj.date);
  return objDate >= fromDate && objDate <= toDate;
}

function check() {
  let fromDateInput = document.getElementById("fromEle").value;
  let toDateInput = document.getElementById("toEle").value;
  let fromDate = new Date(fromDateInput);
  let toDate = new Date(toDateInput);

  // Gets the dataArr from the local storage
  let dataArr = JSON.parse(localStorage.getItem("dataArr"));

  // Gets the required data from the dataArr in the localstorage and stores it in requiredData[]
  let requiredData = [];
  for (let i = 0; i < dataArr.length; i++) {
      let obj = dataArr[i];
      if (isWithinRange(obj, fromDate, toDate)) {
          requiredData.push(obj);
      } else if (fromDate.getTime() === toDate.getTime()) {
          // Push the object if fromDate and toDate are the same and match objDate
          if (obj.year === fromDate.getFullYear() && 
              obj.month === (fromDate.getMonth() + 1) && 
              obj.date === fromDate.getDate()) {
              requiredData.push(obj);
          }
      }
  }

  // Fetches the requiredRegularClasses[]
  let requiredRegularClasses = [];
  for (let i = 0; i < requiredData.length; i++) {
      let obj = requiredData[i];
      requiredRegularClasses.push(...obj.regularClasses);
  }

  // Fetches the requiredSubstitutionClasses[]
  let requiredSubstitutionClasses = [];
  for (let i = 0; i < requiredData.length; i++) {
      let obj = requiredData[i];
      requiredSubstitutionClasses.push(...obj.substitutionClasses);
  }

  // Removes nulls from both the required arrays
  requiredRegularClasses = removeNulls(requiredRegularClasses);
  requiredSubstitutionClasses = removeNulls(requiredSubstitutionClasses);

  formTable(requiredRegularClasses, requiredSubstitutionClasses);
}



document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("reportBtn").addEventListener("click", check);
});

function filterClasses(classes, regular, substitution) {
  // Combine regular and substitution arrays into a Set to remove duplicates
  let combined = new Set([...regular, ...substitution]);

  // Filter the classes array to keep only those present in the combined Set
  return classes.filter((cls) => combined.has(cls));
}

function formTable(reg, sub) {
  let fullArr = [
    "1A",
    "1B",
    "1C",
    "1D",
    "1E",
    "2A",
    "2B",
    "2C",
    "2D",
    "2E",
    "3A",
    "3B",
    "3C",
    "3D",
    "3E",
    "4A",
    "4B",
    "4C",
    "4D",
    "4E",
    "5A",
    "5B",
    "5C",
    "5D",
    "5E",
    "6A",
    "6B",
    "6C",
    "6D",
    "6E",
    "7A",
    "7B",
    "7C",
    "7D",
    "7E",
    "8A",
    "8B",
    "8C",
    "8D",
    "8E",
    "9A",
    "9B",
    "9C",
    "9D",
    "9E",
    "10A",
    "10B",
    "10C",
    "10D",
    "10E",
    "MPC1A",
    "MPC1B",
    "MPC1C",
    "MPC1D",
    "MPC1E",
    "MPC2A",
    "MPC2B",
    "MPC2C",
    "MPC2D",
    "MPC2E",
    "BIPC1A",
    "BIPC1B",
    "BIPC1C",
    "BIPC1D",
    "BIPC1E",
    "BIPC2A",
    "BIPC2B",
    "BIPC2C",
    "BIPC2D",
    "BIPC2E",
    "MBIPC1A",
    "MBIPC1B",
    "MBIPC1C",
    "MBIPC1D",
    "MBIPC1E",
    "MBIPC2A",
    "MBIPC2B",
    "MBIPC2C",
    "MBIPC2D",
    "MBIPC2E",
  ];

  // removes the classes which are not in either of reg and sub
  fullArr = filterClasses(fullArr, reg, sub);

  //generates the table row for each of the class in the fullArr

  let tableHTML = document.getElementById("reportTable");

  let innerHtml = (tableHTML.innerHTML = `<table id="reportTable">
  <tr class="tableRow">
    <th>CLASS</th>
    <th>REGULAR</th>
    <th>SUBSTITUTION</th>
    <th>TOTAL</th>
  </tr>
  
</table>`);
  let tempHtml = innerHtml;
  for (let i = 0; i < fullArr.length; i++) {
    let html = `
    <tr>
      <td>${fullArr[i]}</td>
      <td>${countReg(fullArr[i], reg)}</td>
      <td>${countSub(fullArr[i], sub)}</td>
      <td>${countTotal(fullArr[i], reg, sub)} Periods</td>
    </tr>`;
    innerHtml += html;
  }
  if (innerHtml == tempHtml) {
    document.getElementById(
      "reportTableDivContainer"
    ).innerHTML = `<table id="reportTable">
          <tr class="tableRow">
            <th>CLASS</th>
            <th>REGULAR</th>
            <th>SUBSTITUTION</th>
            <th>TOTAL</th>
          </tr>
          
        </table><p id="noData">No data found in entered dates</p>`;

    return;
  }

  tableHTML.innerHTML = innerHtml;
}

function countReg(cls, reg) {
  /*
    function countOccurrences(targetString, array) {
      const lowerCaseTarget = targetString.toLowerCase();
    return array.filter(item => item.toLowerCase() === lowerCaseTarget).length;

  */
  const lowerCaseTarget = cls.toLowerCase();
  return reg.filter((item) => item.toLowerCase() === lowerCaseTarget).length;
}

function countSub(cls, sub) {
  /*
    function countOccurrences(targetString, array) {
      const lowerCaseTarget = targetString.toLowerCase();
    return array.filter(item => item.toLowerCase() === lowerCaseTarget).length;

  */
  const lowerCaseTarget = cls.toLowerCase();
  return sub.filter((item) => item.toLowerCase() === lowerCaseTarget).length;
}
function countTotal(cls, reg, sub) {
  return countReg(cls, reg) + countSub(cls, sub);
}

function removeNulls(arr) {
  return arr.filter((item) => item !== null);
}

//generates temp data when clicked on the profile
document.getElementById("profileImg").addEventListener("click", () => {
  if (prompt("do you want to add temp data") == 99) {
    function getRandomClass() {
      const classes = [
        "1A",
        "1B",
        "1C",
        "1D",
        "2A",
        "2B",
        "2C",
        "2D",
        "3A",
        "3B",
        "3C",
        "3D",
        "4A",
        "4B",
        "4C",
        "4D",
        "5A",
        "5B",
        "5C",
        "5D",
        "6A",
        "6B",
        "6C",
        "6D",
        "7A",
        "7B",
        "7C",
        "7D",
        "8A",
        "8B",
        "8C",
        "8D",
        "9A",
        "9B",
        "9C",
        "9D",
        "BIPC1A",
        "BIPC1B",
        "BIPC1C",
        "BIPC1D",
      ];
      return classes[Math.floor(Math.random() * classes.length)];
    }

    function getRandomClassOrNull() {
      return Math.random() < 0.25 ? null : getRandomClass(); // 25% chance of null
    }

    let tempDataArr = JSON.parse(localStorage.getItem("dataArr"));

    for (let i = 1; i <= 30; i++) {
      tempDataArr.push({
        date: i,
        month: 10,
        year: 2024,
        regularClasses: [
          getRandomClass(),
          getRandomClass(),
          getRandomClass(),
          getRandomClass(),
        ],
        substitutionClasses: [
          getRandomClassOrNull(),
          getRandomClassOrNull(),
          getRandomClassOrNull(),
          getRandomClassOrNull(),
        ],
      });
    }

    localStorage.setItem("dataArr", JSON.stringify(tempDataArr));
  }
  return;
});
