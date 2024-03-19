const router = require("express").Router();
const userController = require("../controllers/userController");
const pageController = require("../controllers/pageController");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + " - " + Date.now());
  },
});

let upload = multer({ storage: storage });

router.get("/", pageController.mainPage);
router.post("/login", userController.login);
router.post("/register", userController.createAccount);
router.get("/logout", userController.logout);
router.get("/user/verify/:id/:token", userController.verifyAccount);
router.get("/profile", userController.getProfile);
router.get("/getAll", userController.getAllUsers);
router.post("/", pageController.uploadImage);

module.exports = router;
