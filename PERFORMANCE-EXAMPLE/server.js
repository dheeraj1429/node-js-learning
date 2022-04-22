const express = require("express");
const os = require("os");
const cluster = require("cluster");

const app = express();

const cpus = os.cpus().length;

const bug = function () {
    const now = Date.now();
    while (Date.now() - now < 3000) {
        console.log(Date.now() - now);
    }
};

app.get("/", (req, res, next) => {
    bug();
    console.log("done");
    res.send("home page");
});

if (cluster.isMaster) {
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    console.log(`Master Process runing ${process.pid}`);
} else {
    app.listen(3000, () => {
        console.log(`Worker Process ${process.pid} runing`);
    });
}
