const express = require("express");
const router = express.Router();
const Authorization = require("../middleware/Authorization");
const prisma = require("../model/prisma");
const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require("../model/mongodb/user");

router.get("/getCredits", Authorization, async (req, res) => {
  try {
    console.log("credits");
    const token = req.header("Authorization");
    const userId = jwt.decode(token).userId;

    //MongoDB
    const user = await User.findOne({
      _id: userId,
    });

    // Prisma
    // const user = await prisma.user.findFirst({
    //   id: userId,
    // });

    if (!user) {
      res.status(404).send({
        message: "User not found!",
      });
    }

    res.status(200).json({
      message: "User found!",
      credits: user.credits,
    });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong!!!" });
  }
});

module.exports = { router };