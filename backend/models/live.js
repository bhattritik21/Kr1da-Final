const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comments: [{
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('live', chatSchema);