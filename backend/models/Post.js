const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Post', PostSchema);