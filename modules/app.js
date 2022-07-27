const fs = require("fs").promises;
const path = require("path");

const dbConnection = require("./db/dbConnection");

console.log(__filename); // -> app.js
console.log(__dirname); // -> directory name
console.log(path.resolve()); // -> directory name
