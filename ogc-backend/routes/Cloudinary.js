const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const express = require("express");
const ppdt_posts = require("../model/prisma");
const prisma = require("../model/prisma");
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

// For a single file
// router.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req.file);
//     res.send('Done');
// });

// For multiple files
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

    // Prisma
    // const data = await ppdt_posts.PPDTModel.findMany();
    // let length = data.length + 1;

    // const newPost = await prisma.PPDTModel.create({
    //   data: {
    //     id: length,
    //     name: "PPDT " + length,
    //     link: imgUrl,
    //   },
    // });
    res.send("Upload completed successfully!!!");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  storage,
  router,
};
