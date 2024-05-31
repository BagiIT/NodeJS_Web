const express = require("express");
const fs = require("fs");
const server = express();
const username = "bkolakovi22";
const port = require("./js/server/getPorts.js").getPort(username);
const HelperConverter = require("./js/server/Helper.js");
const { isNullOrUndefined } = require("util");
const converter = new HelperConverter();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
console.log(__dirname);

//#region SendIndexAndResourses
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});
server.use("/css", express.static(__dirname + "/css"));
server.use("/slike", express.static(__dirname + "/resursi/slike"));
server.use("/jsk", express.static(__dirname + "/js/klijent"));
//#endregion

//#region SendStaticPages
server.get("/det", (req, res) => {
  res.sendFile(__dirname + "/html/detalji.html");
});
server.get("/dok", (req, res) => {
  res.sendFile(__dirname + "/html/dokumentacija.html");
});
server.get("/oau", (req, res) => {
  res.sendFile(__dirname + "/html/oAutoru.html");
});
server.get("/tab", (req, res) => {
  res.sendFile(__dirname + "/html/tablica.html");
});
server.get("/gal", (req, res) => {
  res.sendFile(__dirname + "/html/galerija.html");
});
server.get("/ter", (req, res) => {
  res.sendFile(__dirname + "/html/obrazacValidacija.html");
});
server.get("/det", (req, res) => {
  res.sendFile(__dirname + "/html/detalji.html");
});
server.get("/obi", (req, res) => {
  res.sendFile(__dirname + "/html/obrazacizlozba.html");
});
//#endregion

server.get("/popis", (req, res) => {
  //console.log(req.query.id);

  let html = MakeTable();
  let site = MakeHtml(html);
  res.write(site);
  res.end();
});
server.get("/popis/:id", (req, res) => {
  //console.log(req.params.id);
  if (req.params.id === "popuniBtn") {
    GetCSV(true);
  }
  res.redirect("/popis");
});

server.get("/brisi", (req, res) => {
  const index = req.params.index;
  let path = __dirname + "/resursi/izlozba.csv";
  let csv = fs.readFileSync("./resursi/izlozba.csv", "utf-8");
  converter.deleteCSVRow(index, path, csv);
  res.redirect("/popis");
});

//#region REST 8.

server.get("/owt/izlozba", (req, res) => {
  let csv = fs.readFileSync(__dirname + "/resursi/izlozba.csv", "utf-8");
  let json = converter.csvToJsonArr(csv);
  //console.log(json);
  res.type("json");
  if (json == undefined) {
    res.status(417);
    res.send(JSON.stringify({ greska: "Nije moguce procitati podatke" }));
  } else {
    res.status(200);
    res.send(JSON.stringify(json));
  }
});
server.post("/owt/izlozba", (req, res) => {
  let data = req.body;
  res.type("json");
  if (
    data == null ||
    data["Redni_broj"] == "" ||
    data["Naziv_primjerka"] == "" ||
    data["Opis"] == "" ||
    data["Datum"] == ""
  ) {
    res.status(417);
    res.send(JSON.stringify({ poruka: "Nevaljani podaci" }));
  } else {
    //addData
    converter.AddValues(data, __dirname);
    res.status(200);
    res.send(JSON.stringify({ poruka: "podaci dodani" }));
  }
});
server.put("/owt/izlozba", (req, res) => {
  res.status(501);
  res.send("Metoda nije implementirana");
});
server.delete("/owt/izlozba", (req, res) => {
  res.status(501);
  res.send("Metoda nije implementirana");
});
//#endregion

//#region REST 9.

server.get("/owt/izlozba/:naziv", (req, res) => {
  let naziv = req.params.naziv;
  let data = converter.getOneValue(naziv, __dirname);
  console.log(data);
  res.type("json");
  if (data == undefined) {
    res.status(417);
    res.send(JSON.stringify({ greska: "Nema resursa" }));
  } else {
    res.status(200);
    res.send(JSON.stringify(data));
  }
});
server.post("/owt/izlozba/:naziv", (req, res) => {
  res.status(405);
  res.send("Metoda nije dopustena");
});
server.put("/owt/izlozba/:naziv", (req, res) => {
  res.status(405);
  res.send("Metoda nije dopustena");
});
server.delete("/owt/izlozba/:naziv", (req, res) => {
  res.type("json");
  let naziv = req.params.naziv;
  console.log(naziv);
  if (converter.remove(naziv, __dirname)) {
    res.status(200);
    res.send(JSON.stringify({ poruka: "Podaci izbirsani" }));
  } else {
    res.status(417);
    res.send(
      JSON.stringify({ greska: "brisanje neuspjesno provjerite naziv" })
    );
  }
});

//#endregion

//#region  HelperFunctionsServer
function MakeHtml(html) {
  let zaglavlje = fs.readFileSync("./resursi/zaglavlje.html", "utf-8");
  let podnozje = fs.readFileSync("./resursi/podnozje.html", "utf-8");
  return (site = zaglavlje + html + podnozje);
}

function MakeTable() {
  let csv = GetCSV();
  let lines = csv.split("\n");
  let html = '<button id="popuniBtn">Popuni</button>'; // Add the button here
  html += '<ul id="popis">';
  lines.forEach((line, index) => {
    const [redniBroj, nazivPrimjerka, opis, datum] = line.split("#");
    html += `<li><a href = "" id = "nazivPrim${index}">${nazivPrimjerka}</a> - ${opis}, ${datum}</li>`;
  });
  html += "</ul>";
  return html;
}
function GetCSV(reset) {
  if (reset) {
    let newCSV = fs.readFileSync("./resursi/izlozba.csv", "utf-8");
    let json = JSON.parse(fs.readFileSync("./resursi/izlozba.json", "utf-8"));
    let oldCSV = converter.getACopy(json);
    if (newCSV !== oldCSV) {
      newCSV = oldCSV;
      converter.copyjsonToCsv(json, __dirname + "/resursi/izlozba.csv");
    }
    return newCSV;
  } else {
    let csvData = fs.readFileSync("./resursi/izlozba.csv", "utf-8");
    return csvData;
  }
}

//#endregion

//#region StartServer LAST
server.use((req, res) => {
  res.status(404);
  var zaglavlje = fs.readFileSync("./resursi/zaglavlje.html", "utf-8");
  var podnozje = fs.readFileSync("./resursi/podnozje.html", "utf-8");

  res.write(zaglavlje);
  res.write("<p>Stranica ne postoji </p>");
  res.write('<a href="/">Pocetna</a><br>');
  res.write(podnozje);
  res.end();
});

server.listen(port, () => {
  console.log(`Server pokrenut na ${port}`);
});
//#endregion
