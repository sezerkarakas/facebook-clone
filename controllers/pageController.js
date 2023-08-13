const User = require("../model/userModel")
const fs = require("fs")
const Image = require("../model/model")
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
        })
        res.render("results", { items: foundUsers })
    } catch (error) {
        console.log(error)
    }
}

const getImages = (req, res) => {

    Image.find({}).then((data, err) => {
        if (err) {
            console.log(err);
        }

        res.render("imagepage", { items: data });
    });
}



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
            res.redirect("/")
        } else {
            res.redirect("/");
        }
    });
}

const deleteImage = async (req, res) => {
    const id = req.params.id;
    try {
        const image = await Image.findByIdAndDelete(id);
        console.log(image.name, "deleted!")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}

const mainPage = async (req, res) => {
    console.log(req.session.userID);
    try {
        const imageData = await Image.find({});
        const userData = await User.find({});
        const data = { imageData, userData }
        res.render("mainpage", { items: data });
    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    postImage,
    getImages,
    deleteImage,
    mainPage
}