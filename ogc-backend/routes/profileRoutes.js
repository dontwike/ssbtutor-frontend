const express = require("express");
const router = express.Router();
const Authorization = require("../middleware/Authorization");
const { getUserById } = require("../Service/UserService/userSevrice");

router.get("/getCredits", Authorization, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).send({
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found!",
      credits: user.credits,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Something went wrong!!!",
    });
  }
});

module.exports = { router };
