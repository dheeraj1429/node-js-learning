const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");

const root = path.join(path.dirname(process.mainModule.filename));

const results = [];

const filterData = function (data) {
    return data["Industry_aggregation_NZSIOC"] === "Level 4";
};

const readale = fs
    .createReadStream(path.join(root, "data.csv"))
    .pipe(
        parse.parse({
            columns: true,
            comment: "#",
        })
    )
    .on("data", (data) => {
        filterData(data);
        results.push(data);
        //    const stringData = data.toString();
    })
    .on("error", (err) => {
        console.log(err);
    })
    .on("end", () => {
        console.log("no more data");
        const csvName = results.map((el) => {
            return el.Variable_name;
        });
    });

// fs.readFile(path.join(root, "data.csv"), "utf-8", function (err, data) {
//     if (err) {
//         console.log(err);
//     }
// });
