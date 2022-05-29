const express = require("express");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    res.render("index");
});

app.get("/video", (req, res, next) => {
    const range = req.headers.range;
    const videoPath = "./videos/video01.mp4";
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize + 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accet-Range": "bytes",
        "Content-Length": contentLength,
    };
    res.writeHead(206, headers);

    const strem = fs.createReadStream(videoPath, { start, end });
    strem.pipe(res);
});

app.listen(4000, () => {
    console.log("serer rungnin in port 4000");
});
