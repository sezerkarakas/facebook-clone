const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  phone: String,
  password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("user", userSchema);
module.exports = User;
