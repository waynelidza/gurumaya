const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
//create user schema
SALT_WORK_FACTOR = 10;
//create user schema

const  GUserSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:[true,'email field is required']
    },
    status:{
        type:String,
        required:[true,'status field is required']
    },
    password:{
        type:String,
        required:[true,'password field is required']
    },
});


GUserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

GUserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Guser = mongoose.model('Guser',GUserSchema);
module.exports=Guser;