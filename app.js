let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let imgSchema = require("./model");
let fs = require("fs");
let path = require("path");

app.set("view engine", "ejs");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("DB connection succesfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + " - " + Date.now());
  },
});

let upload = multer({ storage: storage });

app.get("/", (req, res) => {
  imgSchema.find({}).then((data, err) => {
    if (err){console.log(err)};
    res.render("imagepage", { items: data });
  });
});

app.post("/", upload.single("image"), (req, res, next) => {
  let obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png"
    },
  };

  imgSchema.create(obj).then((err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

let port = process.env.PORT || "3000";
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${port}`);
});
