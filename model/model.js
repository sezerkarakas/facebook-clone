let mongoose = require("mongoose");
let imageSchema = new mongoose.Schema({
  userID:{type: mongoose.Types.ObjectId, ref: "user"},
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);
