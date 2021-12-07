const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/kr1da?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI = "mongodb+srv://bhattritik21:bhattritik21@cluster0.zxqfc.mongodb.net/mern-Kr1da?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;