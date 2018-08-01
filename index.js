const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routing');
app.use(bodyPaser.json());
//init routes
app.use(routes);

//connect to mongodb
mongoose.connect("mongodb://localhost/gurumaya");
mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//error handling
app.use(function (err,req,res,next) {



    console.log(err.message);
    if(err.message.search(' email')){
        res.status(409).send({message:'Email exist'});

    }else{
        res.status(422).send({error:err.message});

    }
});

app.listen(process.env.port||2000,function () {

    console.log("now listening");

});