const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:false
    },
    cohort:{
        type:String,
        required:false
    },
    location:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dhw1mueq4/image/upload/v1692710474/nopicture_pxjqht.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})
mongoose.model("User",userSchema)