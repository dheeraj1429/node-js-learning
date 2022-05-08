const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
    console.log("Mongodb connection ready!");
});

mongoose.connection.on("error", (err) => {
    console.error(err);
});

const PASSWORD = "9fLYQMJO2OM6YJvF";
const URL = `mongodb+srv://dheeraj:${PASSWORD}@cluster0.dfder.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const mongoDbConnection = function (callBack) {
    mongoose
        .connect(URL)
        .then((result) => {
            console.log("mongodb connected");
            callBack();
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = mongoDbConnection;
