const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const rootFolder = path.join(path.dirname(process.mainModule.filename));

const obj = [];

const statusCodeFunction = function (res, status) {
    return res.writeHead(status, {
        "Content-type": "application/json",
    });
};

const server = http.createServer();

server.on("request", (req, res) => {
    const pathName = req.url;
    const method = req.method;

    if (method === "POST" && pathName === "/add") {
        req.on("data", (data) => {
            const stringData = data.toString();
            obj.push(JSON.parse(data));
            console.log(obj);
        });

        req.pipe(res);
    }
    if (method === "GET" && pathName === "/addData") {
        res.writeHead(200, {
            "Content-Type": "text/plain",
        });
        res.write("Hi There!");
        res.end();
    } else if (pathName === "/" && method === "GET") {
        statusCodeFunction(res, 200);
        res.end(
            JSON.stringify({
                data: "learning node",
            })
        );
    } else if (pathName === "/home" && method === "GET") {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.write("<html>");
        res.write("<body>");
        res.write("<h1>every time learnig something new</h1>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    } else if (pathName === "/friend" && method === "GET") {
        res.statusCode = 200;

        fs.readFile(path.join(rootFolder, "demoData.js"), "utf-8", function (err, data) {
            if (err) {
                console.log(err);
            }

            console.log(data);
            res.end(
                JSON.stringify({
                    data,
                })
            );
        });
    } else if (pathName === "/friend/:id" && method === "GET") {
        const parm = req.parm;
        const item = parm.split("/");
        console.log(item);
    }
});

server.listen(port, () => {
    console.log("server runing");
});
