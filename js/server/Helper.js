const fs = require("fs");

class HelperConverter {
  copyjsonToCsv(jsonObj, csvPath) {
    if (!Array.isArray(jsonObj) || jsonObj.length === 0) {
      return;
    }

    const keys = Object.keys(jsonObj[0]);
    const csvLines = jsonObj.map((row) => {
      return keys
        .map((key) => {
          return `${row[key]}`;
        })
        .join("#");
    });

    const csv = csvLines.join("\n");
    fs.writeFileSync(csvPath, csv);
  }

  jsonToCsv(jsonObj) {
    if (typeof jsonObj !== "object" || jsonObj === null) {
      return "";
    }

    const keys = Object.keys(jsonObj);
    const csvLine = keys
      .map((key) => {
        let value = `${jsonObj[key]}`;
        value = value.replace(/[\n\r]/g, ""); // remove newline and carriage return characters
        return value;
      })
      .join("#");

    return csvLine;
  }

  csvToJson(csv) {
    const keys = ["Redni_broj", "Naziv_primjerka", "Opis", "Datum"];
    const values = csv.split("#");
    let obj = {};
    keys.forEach((key, i) => {
      obj[key] = values[i];
    });
    return obj;
  }
  csvToJsonArr(csv) {
    const keys = ["Redni_broj", "Naziv_primjerka", "Opis", "Datum"];
    const lines = csv.split("\n");
    let json = [];

    lines.forEach((line) => {
      const values = line.split("#");
      let obj = {};
      keys.forEach((key, i) => {
        obj[key] = values[i];
      });
      json.push(obj);
    });

    return json;
  }

  deleteCSVRow(index, filePath, csv) {
    let lines = csv.split("\n");
    if (index < 0 || index >= lines.length) {
      console.log("Invalid input");
      return;
    }

    lines.splice(index, 1);
    let newCSVdata = lines.join("\n");
    fs.writeFileSync(filePath, newCSVdata);
    return true;
  }
  getACopy(jsonObj) {
    if (!Array.isArray(jsonObj) || jsonObj.length === 0) {
      return;
    }

    const keys = Object.keys(jsonObj[0]);
    const csvLines = jsonObj.map((row) => {
      return keys
        .map((key) => {
          return `${row[key]}`;
        })
        .join("#");
    });

    const csv = csvLines.join("\n");
    return csv;
  }

  AddValues = function (value, root) {
    var json = JSON.parse(fs.readFileSync(root + "/resursi/izlozba.json"));
    json.push(value);
    var newData = this.getACopy(json);
    fs.writeFileSync(root + "/resursi/izlozba.csv", newData);
  };

  getOneValue(id, root) {
    var value = fs.readFileSync(root + "/resursi/izlozba.csv", "utf-8");
    var json = this.csvToJsonArr(value);
    return json.find((item) => item.Naziv_primjerka === id);
  }
  remove(id, root) {
    var value = fs.readFileSync(root + "/resursi/izlozba.csv", "utf-8");
    var json = this.csvToJsonArr(value);
    if (json.find((item) => item.Naziv_primjerka === id)) {
      var newJson = json.filter((item) => item.Naziv_primjerka !== id);
      var newData = this.copyjsonToCsv(newJson, root + "/resursi/izlozba.csv");
      return true;
    }

    return false;
  }
}
module.exports = HelperConverter;
