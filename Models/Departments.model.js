const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DepartmentsSchema= new Schema({
    name:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    }
});

const Departments = mongoose.model('deparment',DepartmentsSchema)
module.exports = Departments;