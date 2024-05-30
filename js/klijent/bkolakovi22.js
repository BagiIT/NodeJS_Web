document.addEventListener("DOMContentLoaded", function() {});
window.addEventListener("load", function(e) {
  loadCookie();
  switchView();
});

function loadCookie() {
  let value = getCookie("state");
  if (value != "") {
    console.log(document.cookie);
    setView(value);
  } else {
    console.log("Help");
  }
}

function switchView() {
  let button = document.getElementById("btnSwitch");
  let style = document.getElementById("desktop");
  button.addEventListener("click", function() {
    if (style.getAttribute("href") == "css/bkolakovi22test_mobile.css") {
      setView(1);
    } else {
      setView(0);
    }
    console.log("Hello");
  });
}

function setView(stateView) {
  let button = document.getElementById("btnSwitch");
  let style = document.getElementById("desktop");
  if (stateView == 1) {
    style.setAttribute("href", "css/bkolakovi22test.css");
    button.textContent = "prebaci na mobilnu verziju";
    setCookie("state", stateView);
  } else {
    style.setAttribute("href", "css/bkolakovi22test_mobile.css");
    button.textContent = "vrati na stolnu verziju";
    setCookie("state", stateView);
  }
  console.log(stateView);
}

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
