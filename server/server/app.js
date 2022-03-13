const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");

const app = express();
const PORT = 8080;

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server was started in ${PORT}`);
});
