const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  Serieschema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    description:{
        type:String,
        required:[true,'description field is required']
    },
    user:{
        type:String,
        required:[true,'description field is required']
    },
    userID:{
        type:String,
        unique:true,
        required:[true,'description field is required']
    }

});const Serieschema = mongoose.model('series',Serieschema);
module.exports=Serieschema;