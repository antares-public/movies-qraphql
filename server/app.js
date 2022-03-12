const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express()
const PORT = 8080

app.use('/graphql', graphqlHTTP({}))

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server was started in ${PORT}`)
})