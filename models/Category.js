const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  Movieschema = new Schema({
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
    }

});const Movieschema = mongoose.model('movies',Movieschema);
module.exports=Movieschema;