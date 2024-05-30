const express = require("express");
const { default: _default } = require("next/dist/client/router");
const server = express();
const username = "bkolakovi22";
const port = require("./js/server/getPorts.js").getPort(username);
server.use(express.urlencoded({ extended: true }));
console.log(__dirname);

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});

server.use("/css", express.static(__dirname + "/css"));
server.use("/resursi", express.static(__dirname + "/resursi"));
server.use("/html", express.static(__dirname + "/html"));
server.use("/js", express.static(__dirname + "/js/klijent"));
server.get("/dokumentacija", (req, res) => {
  res.sendFile(__dirname + "/html/dokumentacija.html");
});
server.get("/oAutoru", (req, res) => {
  res.sendFile(__dirname + "/html/oAutoru.html");
});
server.get("/tablica", (req, res) => {
  res.sendFile(__dirname + "/html/tablica.html");
});
server.get("/galerija", (req, res) => {
  res.sendFile(__dirname + "/html/galerija.html");
});
server.get("/termini", (req, res) => {
  res.sendFile(__dirname + "/html/termini.html");
});
server.get("/detalji", (req, res) => {
  res.sendFile(__dirname + "/html/detalji.html");
});

server.use((req, res) => {
  res.status(404);
  res.send("Stranica nije pronadena");
});

server.listen(port, () => {
  console.log(`Server pokrenut na ${port}`);
});
