const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: String,
  genre: String,
  directorId: String,
});

module.exports = mongoose.model("Movie", movieSchema);
