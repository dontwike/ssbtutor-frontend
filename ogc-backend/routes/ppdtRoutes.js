const express = require("express");
const router = express.Router();
const Authorization = require("../middleware/Authorization");
const prisma = require("../model/prisma");
const ppdt = require("../model/mongodb/ppdt");

router.get("/ppdt", Authorization, async (req, res) => {
  try {

    //MongoDB
    const PPDT_posts = await ppdt.find();

    // Prisma
    // const PPDT_posts = await prisma.PPDTModel.findMany();
    // console.log(PPDT_posts);

    res.status(200).json({
      PPDT_posts,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/ppdt/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
      }

      // MongoDB
      const post = await ppdt.findOne({
        id: id
      });

      // Prisma
      // const post = await prisma.PPDTModel.findUnique({
      //   where: { id },
      // });
  
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      res.status(200).json({ success: true, post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  });
  

module.exports = { router };
