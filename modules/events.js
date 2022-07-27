const EventEmitter = require("events");
const fs = require("fs");

class myEvents extends EventEmitter {
    constructor() {
        super();
    }
}

const event = new myEvents();

event.on("name", () => {
    console.log("this is the event emitter in node js");
});

event.on("data", () => {
    console.log("some new event");
});

event.on("read", (path) => {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
    });
});

event.emit("name");
event.emit("data");
event.emit("read", "./change.txt");
