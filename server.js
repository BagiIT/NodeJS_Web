const express = require("express");
const fs = require("fs");
const server = express();
const username = "bkolakovi22";
const port = require("./js/server/getPorts.js").getPort(username);
server.use(express.urlencoded({ extended: true }));
console.log(__dirname);

server.use("/css", express.static(__dirname + "/css"));
server.use("/slike", express.static(__dirname + "/resursi/slike"));
server.use("/jsk", express.static(__dirname + "/js/klijent"));
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});
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
  res.sendFile(__dirname + "/html/termini.html");
});
server.get("/det", (req, res) => {
  res.sendFile(__dirname + "/html/detalji.html");
});
server.get("/obi", (req, res) => {
  res.sendFile(__dirname + "/html/obrazacizlozba.html");
});

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
