const express = require('express');
const router = express.Router();
const live = require('../models/live');
const fetchuser = require('../middleware/fetchuser');

router.post('/livechat', fetchuser, async (req, res) => {
    try {
        const topic = req.body.topic;
        const comments = { text: req.body.text, postedBy: req.user.id }
        let livechat = await live.findOne({ title: topic });
        if (livechat) {
            const posts = await live.findOneAndUpdate(topic, { $push: { comments: comments } }, { new: true });
            res.send(posts);
        }
        else {
            const post = new live({
                title: topic, comments: comments
            })
            const savePost = await post.save()
            res.send({ title: savePost.title, comments: savePost.comments });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchlivechats/:topic', fetchuser, async (req, res) => {
    try {
        const topic = req.params.topic;
        const post = await live.find({title:topic}).populate("comments.postedBy", "_id name");
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;