document.addEventListener("DOMContentLoaded", function () {});
window.addEventListener("load", function (e) {
  Fname();
  Lname();
  email();
  BrojTele();
  Drzava();
  Datum();
  ListIskustva();
  Radio();
  Boxs();
  MultiList();
  text();
  RangeSel();
  checkSubmit();
});
//#region Fname Lname
function Fname() {
  const input = document.getElementById("fname");
  ////console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  ////console.log(label);

  input.addEventListener("keyup", function () {
    ////console.log(label);
    checkName(input, label);
  });
}

function checkName(input, label) {
  const parentDiv = label.closest("div");
  if (input.value.length == 0) {
    updateLabel(label);
    const errorMessage = "Polje obavezno";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
    return true;
  }
}
function Lname() {
  const input = document.getElementById("lname");
  ////console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  ////console.log(label);

  input.addEventListener("keyup", function () {
    ////console.log(label);
    checkName(input, label);
  });
}
//#endregion

//#region Email
function email() {
  const input = document.getElementById("email");
  ////console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  ////console.log(label);

  input.addEventListener("keyup", function () {
    ////console.log(label);
    checkEmail(input, label);
  });
}

function checkEmail(input, label) {
  const parentDiv = label.closest("div");
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!input.value.trim()) {
    removeErrorMessage(parentDiv);
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti email adresu";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else if (!regex.test(input.value)) {
    removeErrorMessage(parentDiv);
    updateLabel(label);
    const errorMessage = "Email adresa nije ispravna";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
    return true;
  }
}

//#endregion

//#region BrojTele
function BrojTele() {
  const input = document.getElementById("phone");
  ////console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  ////console.log(label);

  input.addEventListener("keyup", function () {
    ////console.log(label);
    checkPhone(input, label);
  });
}
function checkPhone(input, label) {
  const parentDiv = label.closest("div");
  const regex = /^\d{3}-\d{7}$/;
  if (!regex.test(input.value)) {
    //console.log(regex.test(input.value));
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti broj mobitela 999-9999999999";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
    return true;
  }
}
//#endregion

//#region Drzava
function Drzava() {
  const input = document.getElementById("country");
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.addEventListener("mouseup", function () {
    ////console.log(label);
    checkList(input, label);
  });
}
function checkList(input, label) {
  const parentDiv = label.closest("div");
  if (input.selectedIndex === 0) {
    // If no option is selected in the dropdown list, turn its label red
    updateLabel(label);
    const errorMessage = "Potrebno je odabrati jednu opciju iz liste";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
    return true;
  }
}
//#endregion

//#region Datum
function Datum() {
  const input = document.getElementById("date");
  const label = document.querySelector(`label[for="${input.id}"]`);
  const currDate = new Date();
  const twoLaterDate = new Date();
  twoLaterDate.setDate(currDate.getDate() + 2);
  const oneEarly = new Date();
  oneEarly.setMonth(currDate.getMonth() - 1);

  input.min = oneEarly.toISOString().split("T")[0];
  input.max = twoLaterDate.toISOString().split("T")[0];

  input.addEventListener("change", function () {
    checkDate(input, label);
  });
}
function checkDate(input, label) {
  const parentDiv = label.closest("div");
  if (!input.value) {
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti neki datum";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
    return true;
  }
}
//#endregion

//#region  Liste
function ListIskustva() {
  const input = document.getElementById("category");
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.addEventListener("mouseup", function () {
    ////console.log(label);
    checkList(input, label);
  });
}
function MultiList() {
  const input = document.getElementById("subcategory");
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.addEventListener("mouseup", function () {
    ////console.log(label);
    checkMultiList(input, label);
  });
}
function checkMultiList(input, label) {
  const parentDiv = label.closest("div");
  const selectElement = document.getElementById("subcategory");
  const optgroups = selectElement.getElementsByTagName("optgroup");

  for (let i = 0; i < optgroups.length; i++) {
    const options = optgroups[i].getElementsByTagName("option");
    let isSelected = false;

    for (let j = 0; j < options.length; j++) {
      if (options[j].selected) {
        isSelected = true;
        break;
      }
    }

    if (!isSelected) {
      const errorMessage =
        "Potrebno je uodabrati barem 1 opciju iz svake grupe";
      addErrorMessage(parentDiv, errorMessage);
      updateLabel(label);
      return false;
    }
  }

  resetLabel(label);
  removeErrorMessage(parentDiv);
  return true;
}
//#endregion

//#region radioCheckBox
function Radio() {
  const radios = form.querySelectorAll('input[type="radio"]');
  //console.log(radios);
  const radioGroups = [
    ...new Set(Array.from(radios).map((radio) => radio.name)),
  ];

  radios.forEach((radio) => {
    radio.addEventListener("click", function () {
      checkRadioGroups(radios, radioGroups);
    });
  });
}
function checkRadioGroups(radios, radioGroups) {
  let pass = false;
  radioGroups.forEach((group) => {
    const checkedRadio = Array.from(radios).find(
      (radio) => radio.name === group && radio.checked
    );
    if (!checkedRadio) {
      const labels = Array.from(radios).filter((radio) => radio.name === group);
      labels.forEach((label) => {
        const parentDiv = label.closest(".row2");
        const errorMessage = "Potrebno je odabrati jednu od opcija";
        addErrorMessage(parentDiv, errorMessage);
        if (parentDiv) {
          const targetLabel = parentDiv.querySelector(".col-25 label");
          if (targetLabel) {
            updateLabel(targetLabel);
          }
        }
      });
      pass = false;
    } else {
      const labels = Array.from(radios).filter((radio) => radio.name === group);
      labels.forEach((label) => {
        const parentDiv = label.closest(".row2");
        removeErrorMessage(parentDiv);
        if (parentDiv) {
          const targetLabel = parentDiv.querySelector(".col-25 label");
          if (targetLabel) {
            resetLabel(targetLabel);
          }
        }
      });
      pass = true;
    }
  });
  return pass;
}
function Boxs() {
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  //console.log(checkboxes);
  const checkboxGroups = [
    ...new Set(Array.from(checkboxes).map((checkbox) => checkbox.name)),
  ];

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      checkCheckboxGroups(checkboxes, checkboxGroups);
    });
  });
}

function checkCheckboxGroups(checkboxes, checkboxGroups) {
  let pass = false;
  checkboxGroups.forEach((group) => {
    const checkedCheckbox = Array.from(checkboxes).find(
      (checkbox) => checkbox.name === group && checkbox.checked
    );
    if (!checkedCheckbox) {
      const labels = Array.from(checkboxes).filter(
        (checkbox) => checkbox.name === group
      );
      labels.forEach((label) => {
        const parentDiv = label.closest(".row2");
        const errorMessage = "Potrebno je oznaciti barem jednu opciju";
        addErrorMessage(parentDiv, errorMessage);
        if (parentDiv) {
          const targetLabel = parentDiv.querySelector(".col-25 label");
          if (targetLabel) {
            updateLabel(targetLabel);
          }
        }
      });
      pass = false;
    } else {
      const labels = Array.from(checkboxes).filter(
        (checkbox) => checkbox.name === group
      );
      labels.forEach((label) => {
        const parentDiv = label.closest(".row2");
        removeErrorMessage(parentDiv);
        if (parentDiv) {
          const targetLabel = parentDiv.querySelector(".col-25 label");
          if (targetLabel) {
            resetLabel(targetLabel);
          }
        }
      });
      pass = true;
    }
  });
  return pass;
}
//#endregion

//#region textarea
function text() {
  const input = document.getElementById("subject");

  //////console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  //////console.log(label);

  input.addEventListener("keyup", function () {
    //////console.log(label);
    checkText(input, label);
  });
}
function checkText(input, label) {
  const parentDiv = label.closest("div");
  const regex = /^(([A-Z][^<>\-#]*[.!?]\s*){1,4})$/;
  if (!input.value.trim()) {
    removeErrorMessage(parentDiv);
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti barem neki tekst";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else if (!regex.test(input.value.trim())) {
    removeErrorMessage(parentDiv);
    updateLabel(label);
    const errorMessage =
      "Tekst mora sadržavati najviše 4 rečenice. Svaka rečenica mora početi velikim slovom i završiti s točkom, upitnikom ili uskličnikom.";
    addErrorMessage(parentDiv, errorMessage);
    return false;
  } else {
    //console.log(regex.test(input.value.trim()));
    resetLabel(label);
    removeErrorMessage(parentDiv);
    return true;
  }
}
//#endregion

//#region Slideer
function RangeSel() {
  const input = document.getElementById("range");
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.min = 0;
  input.max = 5;

  input.addEventListener("input", function () {
    label.textContent = input.value;
  });
}
//#endregion

function checkSubmit() {
  const form = document.getElementById("formID");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let passedCheck = true;
    e.preventDefault();
    let input = document.getElementById("fname");
    let label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkName(input, label);

    input = document.getElementById("lname");
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkName(input, label);

    input = document.getElementById("email");
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkEmail(input, label);

    input = document.getElementById("subject");
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkText(input, label);

    input = document.getElementById("country");
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkList(input, label);

    input = document.getElementById("date");
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkDate(input, label);

    input = document.getElementById("category");
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkList(input, label);

    input = document.getElementById("subcategory");
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkMultiList(input, label);

    const radios = form.querySelectorAll('input[type="radio"]');
    //console.log(radios);
    const radioGroups = [
      ...new Set(Array.from(radios).map((radio) => radio.name)),
    ];
    passedCheck = checkRadioGroups(radios, radioGroups);

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    //console.log(checkboxes);
    const checkboxGroups = [
      ...new Set(Array.from(checkboxes).map((checkbox) => checkbox.name)),
    ];
    passedCheck = checkCheckboxGroups(checkboxes, checkboxGroups);
    input = document.getElementById("phone");
    //////console.log(input);
    label = document.querySelector(`label[for="${input.id}"]`);
    passedCheck = checkPhone(input, label);

    if (passedCheck) {
      form.submit();
    }
  });
}
//#region helperFunc
function getLabel(id) {
  let label = document.querySelector(`label[for="${id}]`);
  return label;
}

function updateLabel(label) {
  label.style.color = "red";
}
function resetLabel(label) {
  label.style.color = "";
}

function addErrorMessage(parentDiv, errorMessage) {
  const existingError = parentDiv.querySelector(".error-message");
  if (existingError) {
    return;
  }
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerText = errorMessage;

  parentDiv.appendChild(errorDiv);
}

function removeErrorMessage(parentDiv) {
  const errorMessage = parentDiv.querySelector(".error-message");
  if (errorMessage) {
    parentDiv.removeChild(errorMessage);
  }
}
//#endregion
