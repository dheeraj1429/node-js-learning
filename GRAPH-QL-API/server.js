require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4000;
const { ApolloServer } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const databaseConnection = require("./model/db/db");
const path = require("path");

// load all graphql and reslovers file
const typeArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const startApolloServer = async function () {
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typeArray,
        resolvers: resolversArray,
    });

    const server = new ApolloServer({
        schema,
    });

    await server.start();

    server.applyMiddleware({ app, path: "/graphql" });

    const indexRouter = require("./router/index.router");

    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "views", "pages")));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.json());

    app.use("/", indexRouter);

    databaseConnection(() => {
        app.listen(PORT, () => {
            console.log(`server runging in port ${PORT}`);
        });
    });
};

startApolloServer();
