const express = require('express');
const router = express.Router();
const Posts = require("../model/ppdt");
const Authorization = require("../middleware/Authorization");

router.get('/ppdt', Authorization, async (req, res) => {
    const post = await Posts.find();

    res.status(200).json({
        post
    })
    
})

router.get('/ppdt/:id', Authorization, async (req, res) =>{
    const post = await Posts.findById(req.params.id);
    console.log(post);
    res.status(200).json({post});
})

module.exports = {router}