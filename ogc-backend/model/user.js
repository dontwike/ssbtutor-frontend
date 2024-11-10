const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://itspranjal00:GIvGnxmVfSstGVjd@cluster0.2lcew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phno: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
