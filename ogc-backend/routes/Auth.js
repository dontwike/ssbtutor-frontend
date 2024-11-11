const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Registration
router.post("/signup", async (req, res) => {
  try {
    const { username, password, name, phno } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashPass,
      name: name,
      phno: phno,
    });

    const createUser = await user.save();
    console.log(createUser);

    res.status(201).json({ message: "User saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

//User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
