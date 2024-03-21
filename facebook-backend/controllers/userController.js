const User = require("../model/userModel");
const Image = require("../model/model");
const bcrypt = require("bcrypt");
const cache = require("memory-cache");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Token = require("../model/token");

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

const sendVerificationEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Sezer Karakas" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("email not sent");
    console.error(error);
  }
};

const createAccount = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const surname = req.body.surname;
  const password = req.body.password;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;

  const validatedEmail = validateEmail(email);
  console.log(validatedEmail);
  const validatedPassword = validatePassword(password);
  console.log(validatedPassword);
  if (validatedEmail && validatedPassword) {
    try {
      const user = await User.create({
        email: email,
        name: name,
        surname: surname,
        password: password,
        dateOfBirth: dateOfBirth,
        gender: gender,
        isVerified: false,
      });

      const token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });

      const message = `http://localhost:3000/user/verify/${user._id}/${token.token}`;
      sendVerificationEmail(user.email, "Verify your email", message);

      res.status(201).send("An email sent to your account please verify");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Your email or password is wrong");
  }
};

const verifyAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User not found");
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Token not found");
    await User.updateOne({ _id: user._id }, { isVerified: true });
    await Token.findByIdAndRemove(token._id);
    res.send("Your account has been verified");
  } catch (err) {
    res.status(400).send("An error occurred");
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("User not found");
    if (user.isVerified === false)
      return res.status(400).send("Please verify your account");
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          //session
          req.session.userID = user._id;
          req.session.authenticated = true;

          console.log(req.session.userID);
          res.status(200).send("successfully logged in");
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
    const image = await Image.findOne({ userID: userID });
    const posts = await Image.find({ userID: req.session.userID });
    console.log(user);
    res.render("profile", { item: user, photo: image, posts: posts });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAccount,
  login,
  logout,
  getProfile,
  getAllUsers,
  verifyAccount,
};
