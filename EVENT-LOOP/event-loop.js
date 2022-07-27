const fs = require("fs");
const os = require("os").cpus().length;
const crypto = require("crypto");

setTimeout(() => console.log("hi"), 0);
setTimeout(() => console.log("hllo"), 1000);
setImmediate(() => console.log("immediate"));

process.env.UV_THREADPOOL_SIZE = os;

let start = new Date();

fs.readFile("../modules/change.txt", "utf-8", (err, data) => {
    console.log("file readed!!");

    console.log("------------------------");

    setTimeout(() => console.log("hi 2"), 0);
    setTimeout(() => console.log("hllo 2"), 1000);
    setImmediate(() => console.log("immediate 2"));

    process.nextTick(() => console.log("new tick"));

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(new Date() - start, "password hash");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(new Date() - start, "password hash");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(new Date() - start, "password hash");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(new Date() - start, "password hash");
});
