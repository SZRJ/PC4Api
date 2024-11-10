const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema= new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: false
    },
    email:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: false
    },
    creationDate:{
        type:String,
        required: false
    }
});

const Users = mongoose.model('user',UsersSchema)
module.exports = Users;