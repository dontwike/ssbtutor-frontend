const { default: mongoose } = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

const Posts = mongoose.model("Post", PostSchema);
module.exports = Posts;
