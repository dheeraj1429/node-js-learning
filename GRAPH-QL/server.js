const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const app = express();

const schemaArray = loadFilesSync("**/*.graphql");

const schema = makeExecutableSchema({
    typeDefs: schemaArray,
});

const root = {
    products: require("./graphql/productsSchema/products.modle"),
    posts: require("./graphql/postsSchema/posts.model"),
    mockData: require("./graphql/mockDataSchema/mockData.model"),
};

// middlewares
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(3000, () => {
    console.log("server rungin in port 3000");
});
