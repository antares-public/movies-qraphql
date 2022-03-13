const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

mongoose.connect("mongodb+srv://admin:1234@cluster0.hgzfb.mongodb.net/movies");

const dbConnection = mongoose.connection;
dbConnection
  .on("error", (err) => console.error(err))
  .once("open", () => console.error("Connected to db"));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server was started in ${PORT}`);
});
