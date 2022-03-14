const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: String,
  genre: String,
  directorId: String,
  rate: Number,
  watched: Boolean,
});

module.exports = mongoose.model("Movie", movieSchema);
