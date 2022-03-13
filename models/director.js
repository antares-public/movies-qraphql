const mongoose = require("mongoose");

const directorSchema = mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Director", directorSchema);
