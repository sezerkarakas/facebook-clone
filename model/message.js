const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "user" },
  receiver: { type: mongoose.Types.ObjectId, ref: "user" },
  message: { type: String },
});

const Message = mongoose.model("Message", messagesSchema);
module.exports = Message;
