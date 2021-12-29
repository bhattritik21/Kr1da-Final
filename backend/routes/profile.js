const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: "../public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + file.originalname);
    }
})
const upload = multer({ storage: fileStorageEngine });

router.get('/fetchallposts', fetchuser, async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "_id name").populate("comments.postedBy", "_id name")
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 1: Get All the Posts using: GET "/fetchallposts". Login required
router.get('/fetchposts', fetchuser, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).populate("comments.postedBy", "_id name");
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Post using: POST "/post". Login required
router.post('/post', fetchuser, upload.single('photo'), async (req, res) => {
    try {
        if (req.file == null) {
            return res.status(400).send("No files uplaoded");
        }
        const photo = req.file.filename;
        const title = req.body.title;

        const post = new Post({
            user: req.user.id, title, photo
        })
        const savePost = await post.save()
        res.send({ title: savePost.title, photo: savePost.photo })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatepost/:postId', fetchuser, async (req, res) => {
    const { title, photo } = req.body;
    try {
        // Create a newNote object
        const newPost = {};
        if (title) { newPost.title = title };
        if (photo) { newPost.photo = photo };

        // Find the note to be updated and update it
        let post = await Post.findById(req.body.postId);
        if (!post) { return res.status(404).send("Not Found") }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        post = await Post.findByIdAndUpdate(req.body.postId, { $set: newPost }, { new: true })
        res.json({ post });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletepost/:postId', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let post = await Post.findById(req.body.postId);

        if (!post) { return res.status(404).send("Not Found") }
         

        // Allow deletion only if user owns this post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        post = await Post.findByIdAndDelete(req.body.postId)
        res.json({ "Success": "post has been deleted", post: post });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Like
router.put('/like', fetchuser, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.user.id } }, { new: true })
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: UnLike
router.put('/unlike', fetchuser, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.user.id } }, { new: true })
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 6: Comments
router.put('/comments', fetchuser, async (req, res) => {
    try {
        const comment = { text: req.body.text, postedBy: req.user.id }
        const post = await Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true }).populate("comments.postedBy", "_id name").populate("user", "_id name");
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 7: Update profile
router.post('/updateUser', fetchuser,upload.single('photo'),  async (req, res) => {
    try {
        const photo = req.file.filename;
     
        const  bio = req.body.bio;
        // console.log(photo,bio,req.body.postId);
        const user = await User.findByIdAndUpdate(req.body.postId,  { profilePic: photo, bio:bio }, { new: true }).select("-password")
        res.json(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })

  
module.exports = router;