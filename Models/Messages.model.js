const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessagesSchema= new Schema({
    senderId:{
        type:"ObjectId",
        required: true
    },
    recipientId:{
        type:"ObjectId",
        required: false
    },
    content:{
        type:String,
        required: true
    },
    sentDate:{
        type:Date,
        required: true
    },
    readDate:{
        type:Date,
        required: false
    }
});

const Messages = mongoose.model('message',MessagesSchema)
module.exports = Messages;