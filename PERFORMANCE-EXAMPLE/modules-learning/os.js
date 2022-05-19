const os = require("os");

function learn() {
    // learning os module
    // console.log(os.arch());
    // const cpus = os.cpus();
    // for (let i = 0; i < cpus.length; i++) {
    //     console.log(cpus[i].model);
    // }
    // console.log(os.freemem());
    // console.log(os.homedir());
    // console.log(os.hostname());
    // console.log(os.networkInterfaces());

    console.log(os.tmpdir());
    console.log(os.totalmem());
    console.log(os.type());
    console.log(os.uptime());
}

module.exports = learn;
