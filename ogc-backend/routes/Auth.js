const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../model/prisma");
const User = require("../model/mongodb/user");

// User-Registration
router.post("/signup", async (req, res) => {
  try {
    const { username, password, name, phno } = req.body;

    //MongoDB
    const ifUsernamePresent = await User.findOne({
      username: username,
    });
    const ifPhoneNumberPresent = await User.findOne({
      phno: phno,
    });

    // Prisma
    // const ifUsernamePresent = await prisma.user.findFirst({
    //   where: { username },
    // });
    // const ifPhoneNumberPresent = await prisma.user.findFirst({
    //   where: { phno },
    // });

    if (ifUsernamePresent || ifPhoneNumberPresent) {
      console.log("username or phone number already exists");

      return res.status(400).json({
        success: false,
        message: "Username or phone number already exists. Please log in!",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    //MongoDB
    const createUser = await User.create({
      username,
      password: hashPass,
      name,
      phno,
      credits: 100,
      role: "user",
    });

    // Prisma
    // const createUser = await prisma.user.create({
    //   data: {
    //     username,
    //     password: hashPass,
    //     name,
    //     phno,
    //     credits: 100,
    //     role: "user",
    //   },
    // });
    console.log(createUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: createUser.id,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});

// User-Login
router.post("/login", async (req, res) => {
  try {
    console.log("login");
    const { username, password } = req.body;
    console.log(username);

    //MongoDB
    const ifUserPresent = await User.findOne({
      username: username,
    });

    // Prisma
    // const ifUserPresent = await prisma.user.findFirst({
    //   where: { username: username },
    // });
    console.log(ifUserPresent);

    if (!ifUserPresent) {
      console.log("Username does not exist");
      return res.status(400).json({
        success: false,
        message: "Username does not exist. Please sign up!",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      ifUserPresent.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password didn't match. Authentication failed!",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: ifUserPresent._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      message: "Login successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failed. An error occurred.",
    });
  }
});

module.exports = router;
