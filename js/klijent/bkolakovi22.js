import { injectSpeedInsights } from "@vercel/speed-insights";
document.addEventListener("DOMContentLoaded", function () {});
injectSpeedInsights();

import { inject } from "@vercel/analytics";
inject();
window.addEventListener("load", function (e) {
  var filename = location.href.split("/").slice(-1);
  console.log(filename);
  if (filename == "") {
    loadCookie();
    switchView();
    return;
  }
  if (filename == "popis" || filename == "popis#") {
    ConfirmWindow();
    Popuni();
  }
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
  button.addEventListener("click", function () {
    if (document.body.classList.contains("mobile")) {
      setView(1);
    } else {
      setView(0);
    }
    console.log("Hello");
  });
}

function ConfirmWindow() {
  try {
    var ul = document.getElementById("popis");
    var links = ul.querySelectorAll("a");
    links.forEach((link, index) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        if (confirm("Želite li obrisati ovaj element?")) {
          window.location.href = "/brisi?" + encodeURIComponent(index);
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
}
function Popuni() {
  var btn = document.getElementById("popuniBtn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/popis/" + encodeURIComponent(btn.id);
  });
}

function setView(stateView) {
  let button = document.getElementById("btnSwitch");
  let style = document.getElementById("desktop");
  if (stateView == 1) {
    document.body.classList.remove("mobile");
    button.textContent = "prebaci na mobilnu verziju";
    setCookie("state", stateView);
  } else {
    document.body.classList.add("mobile");
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
