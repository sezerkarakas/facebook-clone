let mongoose = require("mongoose");
let imageSchema = new mongoose.Schema({
  userID:{type: mongoose.Types.ObjectId, ref: "user"},
  name: String,
  desc: String,
  img: String,
});

module.exports = mongoose.model("Image", imageSchema);
