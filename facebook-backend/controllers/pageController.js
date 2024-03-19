const User = require("../model/userModel");
const fs = require("fs");
const Image = require("../model/model");
let multer = require("multer");
const cloudinary = require("cloudinary").v2;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + " - " + Date.now());
  },
});

let upload = multer({ storage: storage });

const searchUser = async (req, res) => {
  const { searchWord } = req.body;
  searchWord = searchWord.toLowerCase();
  const foundUsers = [];
  try {
    const users = await Usser.find();
    users.forEach((user) => {
      if (user.name.contains(searchWord)) {
        foundUsers.push(user);
      }
    });
    res.render("results", { items: foundUsers });
  } catch (error) {
    console.log(error);
  }
};

const getImages = (req, res) => {
  Image.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }

    res.render("imagepage", { items: data });
  });
};

const postImage = (req, res, next) => {
  let obj = {
    userID: req.session.userID,
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };

  Image.create(obj).then((err, item) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
};

const deleteImage = async (req, res) => {
  const id = req.params.id;
  try {
    const image = await Image.findByIdAndDelete(id);
    console.log(image.name, "deleted!");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const mainPage = async (req, res) => {
  console.log(req.session.userID);
  //   uploadImage("C:/Users/sezer/Desktop/foto/babam-kopya_NGorn__HD.jpg");
  fetchCloudinaryImages();
  try {
    const imageData = await Image.find({});
    const userData = await User.find({});
    const photos = await fetchCloudinaryImages();

    console.log(photos);
    const data = { photos, userData };
    res.send( data );
  } catch (error) {
    console.log(error);
  }
};

const getAllImages = async (req, res) => {
  try {
    // Cloudinary'den tüm fotoğrafları çekin
    const photos = await fetchAllPhotos();
    // Galeri sayfasını render edin ve fotoğrafları veri olarak geçirin
    res.render("gallery", { photos });
  } catch (error) {
    res.status(500).send("Galeri yüklenirken bir hata oluştu.");
  }
};

const fetchCloudinaryImages = async () => {
  try {
    const result = await cloudinary.api.resources({ type: "upload" });
    return result.resources;
  } catch (error) {
    console.error(
      "Cloudinary'den fotoğraflar çekilirken bir hata oluştu:",
      error
    );
    return [];
  }
};
/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postImage,
  getImages,
  deleteImage,
  mainPage,
  uploadImage,
};
