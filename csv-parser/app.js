const fs = require("fs");
const parser = require("csv-parse");
const path = require("path");

const root = path.join(path.dirname(process.mainModule.filename));

const results = [];

const readale = fs
    .createReadStream(path.join(root, "data.csv"))
    .on("data", (data) => {
        results.push(data);
        //    const stringData = data.toString();
    })
    .on("error", (err) => {
        console.log(err);
    })
    .on("end", () => {
        console.log("no more data");
    });

// fs.readFile(path.join(root, "data.csv"), "utf-8", function (err, data) {
//     if (err) {
//         console.log(err);
//     }
// });
