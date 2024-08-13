const mongoose = require("mongoose");
//media schema applied
const MediaScheam = new mongoose.Schema({
    //name
    name:{
        type:String,
        required:true,
    },
    //tag
    tag:{
        type:String,
    },
    //image url
    Url : {
        type:String,
    },
    email:{
        type:String,

    }

});
//exports that media schema here
module.exports  = mongoose.model('CloudMedia' , MediaScheam);