const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const ppdt = require("../model/mongodb/ppdt");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ssb-ogc",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage });

router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const imgUrl = req.files[0].path;

    //MongoDB
    const mongodata = await ppdt.find();
    let mongoLen = mongodata.length + 1;

    const newMongoPost = await ppdt.create({
      id: mongoLen,
      name: "PPDT " + mongoLen,
      link: imgUrl,
    });
    res.send("Upload completed successfully!!!");
  } catch (err) {
    res.send(err.message);
  }
});

router.post('/watupload', function(req, res) {
  try {
    
  } catch (error) {
    
  }
});

module.exports = {
  storage,
  router,
};
