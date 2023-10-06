const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    jobTitle:{type:String,required:true},
    salary:{type:String,required:true},
    location:{type:String,required:true},
    jobtype:{type:String,required:true},
    experience:{type:String,required:true},
    postImg:{type:String},
    userId:{type:String},
})

module.exports = mongoose.model('Post',UserSchema)