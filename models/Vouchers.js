const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  Voucherchema = new Schema({
    code:{
        type:String,
        unique:true,
        required:[true,'Name field is required']
    },
    User:{
        type:String,
        required:[true,'description field is required']
    },
    price:{
        type:String,
        required:[true,'Price field is required']
    },
    paymentType:{
        type:String,
        required:[true,'Price field is required']
    },

});const Voucherchema = mongoose.model('Vouchers',Voucherchema);
module.exports=Voucherchema;