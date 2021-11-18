const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConatctSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const Contact = mongoose.model('contact', ConatctSchema);
  module.exports =  Contact;