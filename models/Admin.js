const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
//create user schema
SALT_WORK_FACTOR = 10;
const  AdminSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:[true,'Name field is required']

    },

    password:{
        type:String,
        required:[true,'password field is required']
    },

    role:{
        type:String,
        required:[false,'password field is required']
    },

});

AdminSchema.pre('save', function(next) {
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

AdminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Admin = mongoose.model('Admin',AdminSchema);
module.exports=Admin;