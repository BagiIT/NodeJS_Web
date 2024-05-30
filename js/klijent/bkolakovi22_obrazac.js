document.addEventListener("DOMContentLoaded", function() {});
window.addEventListener("load", function(e) {
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
  checkSubmit();
});
//#region Fname Lname
function Fname() {
  const input = document.getElementById("fname");
  console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  console.log(label);

  input.addEventListener("keyup", function() {
    console.log(label);
    checkName(input, label);
  });
}

function checkName(input, label) {
  const parentDiv = label.closest("div");
  if (input.value.length == 0) {
    updateLabel(label);
    const errorMessage = "Polje obavezno";
    addErrorMessage(parentDiv, errorMessage);
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
  }
}
function Lname() {
  const input = document.getElementById("lname");
  console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  console.log(label);

  input.addEventListener("keyup", function() {
    console.log(label);
    checkName(input, label);
  });
}
//#endregion

//#region Email
function email() {
  const input = document.getElementById("email");
  console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  console.log(label);

  input.addEventListener("keyup", function() {
    console.log(label);
    checkEmail(input, label);
  });
}

function checkEmail(input, label) {
  const parentDiv = label.closest("div");
  if (input.value.length == 0) {
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti email adresu";
    addErrorMessage(parentDiv, errorMessage);
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
  }
}
//#endregion

//#region BrojTele
function BrojTele() {
  const input = document.getElementById("phone");
  console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  console.log(label);

  input.addEventListener("keyup", function() {
    console.log(label);
    checkPhone(input, label);
  });
}
function checkPhone(input, label) {
  const parentDiv = label.closest("div");
  if (input.value.length == 0) {
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti broj mobitela 999-9999999999";
    addErrorMessage(parentDiv, errorMessage);
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
  }
}
//#endregion

//#region Drzava
function Drzava() {
  const input = document.getElementById("country");
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.addEventListener("mouseup", function() {
    console.log(label);
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
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
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

  input.addEventListener("change", function() {
    checkDate(input, label);
  });
}
function checkDate(input, label) {
  const parentDiv = label.closest("div");
  if (!input.value) {
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti neki datum";
    addErrorMessage(parentDiv, errorMessage);
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
  }
}
//#endregion

//#region  Liste
function ListIskustva() {
  const input = document.getElementById("category");
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.addEventListener("mouseup", function() {
    console.log(label);
    checkList(input, label);
  });
}
function MultiList() {
  const input = document.getElementById("subcategory");
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.addEventListener("mouseup", function() {
    console.log(label);
    checkList(input, label);
  });
}
//#endregion

//#region radioCheckBox
function Radio() {
  const radios = form.querySelectorAll('input[type="radio"]');
  console.log(radios);
  const radioGroups = [
    ...new Set(Array.from(radios).map((radio) => radio.name)),
  ];

  radios.forEach((radio) => {
    radio.addEventListener("click", function() {
      checkRadioGroups(radios, radioGroups);
    });
  });
}
function checkRadioGroups(radios, radioGroups) {
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
    }
  });
}
function Boxs() {
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes);
  const checkboxGroups = [
    ...new Set(Array.from(checkboxes).map((checkbox) => checkbox.name)),
  ];

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function() {
      checkCheckboxGroups(checkboxes, checkboxGroups);
    });
  });
}

function checkCheckboxGroups(checkboxes, checkboxGroups) {
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
    }
  });
}
//#endregion

//#region textarea
function text() {
  const input = document.getElementById("subject");
  console.log(input);
  const label = document.querySelector(`label[for="${input.id}"]`);
  console.log(label);

  input.addEventListener("keyup", function() {
    console.log(label);
    checkText(input, label);
  });
}
function checkText(input, label) {
  const parentDiv = label.closest("div");
  if (!input.value.trim()) {
    updateLabel(label);
    const errorMessage = "Potrebno je unjeti barem neki tekst";
    addErrorMessage(parentDiv, errorMessage);
  } else {
    resetLabel(label);
    removeErrorMessage(parentDiv);
  }
}
//#endregion

function checkSubmit() {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let input = document.getElementById("fname");
    let label = document.querySelector(`label[for="${input.id}"]`);
    checkName(input, label);
    input = document.getElementById("lname");
    label = document.querySelector(`label[for="${input.id}"]`);
    checkName(input, label);
    input = document.getElementById("email");
    label = document.querySelector(`label[for="${input.id}"]`);
    checkEmail(input, label);
    input = document.getElementById("subject");
    label = document.querySelector(`label[for="${input.id}"]`);
    checkText(input, label);
    input = document.getElementById("country");
    label = document.querySelector(`label[for="${input.id}"]`);
    checkList(input, label);
    input = document.getElementById("date");
    label = document.querySelector(`label[for="${input.id}"]`);
    checkDate(input, label);
    input = document.getElementById("category");
    label = document.querySelector(`label[for="${input.id}"]`);
    checkList(input, label);
    input = document.getElementById("subcategory");
    label = document.querySelector(`label[for="${input.id}"]`);
    checkList(input, label);
    const radios = form.querySelectorAll('input[type="radio"]');
    console.log(radios);
    const radioGroups = [
      ...new Set(Array.from(radios).map((radio) => radio.name)),
    ];
    checkRadioGroups(radios, radioGroups);
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    console.log(checkboxes);
    const checkboxGroups = [
      ...new Set(Array.from(checkboxes).map((checkbox) => checkbox.name)),
    ];
    checkCheckboxGroups(checkboxes, checkboxGroups);
    input = document.getElementById("phone");
    console.log(input);
    label = document.querySelector(`label[for="${input.id}"]`);
    checkPhone(input, label);
  });

  form.submit();
}

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
  // Check if an error message already exists
  const existingError = parentDiv.querySelector(".error-message");

  // If an error message already exists, don't add another one
  if (existingError) {
    return;
  }

  // Create a new div element for the error message
  const errorDiv = document.createElement("div");

  // Add a class to the div so you can style it with CSS if needed
  errorDiv.className = "error-message";

  // Set the error message
  errorDiv.innerText = errorMessage;

  // Append the error message div to the end of the parent div
  parentDiv.appendChild(errorDiv);
}

function removeErrorMessage(parentDiv) {
  const errorMessage = parentDiv.querySelector(".error-message");
  if (errorMessage) {
    parentDiv.removeChild(errorMessage);
  }
}
