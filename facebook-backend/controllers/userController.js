const User = require("../model/userModel");
const Image = require("../model/model")
const bcrypt = require("bcrypt");
const cache = require("memory-cache")
const multer = require("multer")
const fs = require("fs")
const path = require("path");

const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validateEmail = (mail) => {
  if (checkEmail.test(mail)) {
    return true;
  } else {
    return false;
  }
};

const validatePassword = (password) => {
  let a = "";

  if (password.length > 8) {
    if (a.search(/[a-zA-Z]/)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const createAccount = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const password = req.body.password;
  const validatedEmail = validateEmail(email);
  console.log(validatedEmail);
  const validatedPassword = validatePassword(password);
  console.log(validatedPassword);
  if (validatedEmail && validatedPassword) {
    try {
      const user = await User.create({
        email: email,
        name: name,
        phone: phone,
        password: password,
      });
      res.status(201).redirect("/");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Your email or password is wrong");
  }
};



const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          //session
          req.session.userID = user._id;
          req.session.authenticated = true;

          console.log(req.session.userID);
          res.status(200).redirect("/");
        } else {
          res.status(400).send("Password is wrong");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", error });
  }
};
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const getProfile = async (req, res) => {
  const userID = req.session.userID;
  try {
    const user = await User.findById(userID);
    const image = await Image.findOne({userID:userID})
    const posts = await Image.find({userID: req.session.userID})
    console.log(user)
    res.render("profile", {item: user, photo: image, posts: posts})
  } catch (error) {
    console.log(error)   
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users)
  } catch (error) {
    console.log(error)
  }
}



const renderLogin = (req, res) => {
  res.render("login");
};

const renderRegister = (req, res) => {
  res.render("register");
};

module.exports = {
  createAccount,
  login,
  logout,
  renderLogin,
  renderRegister,
  getProfile,
  getAllUsers

};
