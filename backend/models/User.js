const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        typeof:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true

    },
    isAdmin:{
        type:Boolean,
        default:false

    },
},
    {timestamp:true}
)

module.exports=mongoose.model('User',userSchema)