const express = require('express');
const bodyParser = require('body-parser')
const Post = require('../model/post');
const router = express.Router()

router.use(bodyParser());

router.get("/posts", async (req, res) => {
    const posts = await Post.find({user:req.user});
    res.json({
        status: "success",
        posts
    })
})


router.post("/posts", async (req, res) => {
    try {
        const post = await Post.create({
            name: req.body.name,
            body: req.body.body,
            img: req.body.img,
            user: req.user
        })
        return res.json({
            status: "success",
            post
        })
    } catch(e){
        console.log(e);
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put("/posts/:id", async (req, res) =>{
    const post = await Post.updateOne({_id: req.params.id, user: req.user}, {body: req.body.body});

    if(post.modifiedCount > 0){
        res.json({
            status: "Updated",
        })
    }else {
        res.json({
            status: "You cannot update this post"
        })
    }
})

router.delete("/posts/:id", async (req, res) => {
    const post = await Post.deleteOne({_id: req.params.id, user: req.user});
    console.log(post);
    if(post.deletedCount > 0){
        res.json({
            status: "Deleted",
        })
    }else {
        res.json({
            status: "you cannot delete this post",
        })
    }
})

module.exports = router