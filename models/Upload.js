const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const  uploadsSchema = new Schema({
    title:{
        type:String,
        required:[true,'Name field is required']
    },
    ArtistMain:{
        type:String,
        required:[true,'Artist field is required']
    },
    FeaturedArtist:{
        type:String,
        required:[true,'FeaturedArtist field is required']
    },
    userID:{
        type:String,
        required:[true,'userID field is required']
    },
    genre:{
        type:String,
        required:[true,'genre field is required']
    },
    origin:{
        type:String,
        required:[true,'origin field is required']
    },
    label:{
        type:String,
        required:[true,'label field is required']
    },
    ReleaseDate:{
        type:Date,
        required:[true,'ReleaseDate field is required']
    },
    Dateuploaded:{
        type:Date,
        required:[true,'Dateupload field is required']
    },
    Iscr:{
        type:String,
        required:[false,'Iscr field is required']
    },
    GuruCode:{
        unique:true,
        type:String,
        required:[true,'GuruCode field is required']
    },
    Status:{

        type:String,
        required:[true,'GuruCode field is required']
    },
    s3locationCover:{

        type:String,
        required:[false,'s3locationCover field is required']
    },
    s3locationmp3:{

        type:String,
        required:[false,'s3locationmp3 field is required']
    }

});




const Uploads = mongoose.model('Uploads',uploadsSchema);
module.exports=Uploads;