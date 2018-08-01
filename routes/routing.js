var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
 const Admin = require('../models/Admin');
const Gusers = require('../models/GlobalUser');
const Uploads = require('../models/Upload');
const request = require('request');
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
var config = require('./config');
var aws = require('aws-sdk');
const uniqueRandom = require('unique-random');
var multer = require('multer');
var multerS3 = require('multer-s3');

var filename = uuid.v4();

 router = express()
var s3 = new aws.S3({ /* ... */ })

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'www.televu.com',
        acl: 'public-read',
        metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});


        },
        key: function (req, file, cb) {

            var fileExt = file.originalname.toString();
            if(fileExt.includes('.mp3')){

                cb(null, Date.now().toString()+'.mp3')
            }
            if(fileExt.includes('.jpg')){

                cb(null, Date.now().toString()+'.jpg')
            }

        }

    })
});

router.post('/uploads',upload.any(), function(req,res, next) {
    var code = uuid.v4();
    var counter =0
    var s3locationCover =req.files[0].location;
    var s3locationmp3 =req.files[1].location;

      var respond={

          message:'uploaded',
          S3mp3:s3locationmp3,
          S3pic:s3locationCover

      }

    if(s3locationCover.length>0){

        counter++
    }
    if(s3locationmp3.length>0){

        counter++
    }


    // var body={
    //     ArtistMain
    //         :
    //     req.body.ArtistMain,
    //     FeaturedArtist
    //         :
    //     req.body.FeaturedArtist,
    //     Iscr
    //         :
    //     req.body.Iscr,
    //     ReleaseDate
    //         :
    //         Date.now(),
    //     genre
    //         :
    //     req.body.genre,
    //     label
    //         :
    //     req.body.label,
    //     origin
    //         :
    //     req.body.origin,
    //     title
    //         :
    //     req.body.title,
    //     userID
    //         :
    //     req.body.userID,
    //     s3locationCover:s3locationCover,
    //     s3locationmp3:s3locationmp3,
    //     Status:'0',
    //     GuruCode:code,
    //     Dateuploaded:Date.now()
    // }

            // var token2 ={ token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1lc3NhZ2UiOiJjcmVhdGVkIiwiZGF0YSI6eyJTM21wMyI6Imh0dHBzOi8vczMuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vd3d3LnRlbGV2dS5jb20vMTUyNjQ3OTA0NDUyMS5tcDMiLCJTM3BpYyI6Imh0dHBzOi8vczMuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vd3d3LnRlbGV2dS5jb20vMTUyNjQ3OTA0NDQ4Ny5qcGcifX0sImlhdCI6MTUyNjQ3OTA1Nn0.nU2dApEnjYZz9vkddvr0n9m4dHjwD-dML-TlTKtIR24'}

    //

    console.log(counter);
    var token = jwt.sign({message:respond }, config.secret, {

    });

     if(counter==2){
         res.header("Access-Control-Allow-Origin", "*");



         res.status(201).send({XRhI:token});
     }else {

         res.header("Access-Control-Allow-Origin", "*");



         res.status(401).send({XRhI:'error'});

     }






    //console.log(req.files);
    // console.log(req)
    //     res.status(201).send({details:respond});







});

router.post('/up/:id',function (req,res,next) {
    var response ={
        message:"ok",


    }


    Uploads.findByIdAndUpdate({_id:req.params.id},req.body).then(function (user) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send({message:'created'});


    }).catch(next);
});
router.get('/content',function (req,res,next) {



    Uploads.find().then(function (contnent) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(contnent);


    }).catch(next);
});


router.post('/uploadfinal', function(req, res, next) {
console.log('heya');
    var code = uuid.v4();

     var query={
         ArtistMain
             :
             req.body.ArtistMain,
         FeaturedArtist
             :
         req.body.FeaturedArtist,
         Iscr
             :
         req.body.Iscr,
         ReleaseDate
             :
             Date.now(),
         genre
             :
         req.body.genre,
         label
             :
         req.body.label,
         origin
             :
         req.body.origin,
         title
             :
         req.body.title,
         userID
             :
         req.body.userID,
         s3locationCover:req.body.s3locationCover,
         s3locationmp3:req.body.s3locationmp3,
         Status:'0',
         GuruCode:code,
         Dateuploaded:Date.now()
     }

    // body={s3locationCover:s3locationCover,s3locationmp3:s3locationmp3,Status:'0',GuruCode:guruCode,}

          Uploads.create(query).then(function (upload) {
              res.header("Access-Control-Allow-Origin", "*");

              var response ={
                  message:"created",
                  details:upload

              }
              var XRhI = jwt.sign({ response}, config.secret, {

              });

              res.status(201).send({XRhI});

          }).catch(next);










});



router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.post('/super',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("post admin");
    Admin.create(req.body).then(function (Admin) {

        res.status(201).send({message:'created'});


    }).catch(next);


});

//post
router.post('/mycontents',function (req,res) {

    res.header("Access-Control-Allow-Origin", "*");
    Uploads.find({
        userID: req.body.userID
    }, function(err, requests) {


        res.status(201).send({data:requests});


    })

});



router.get('/activate/:id',function (req,res,next) {
    console.log("approver");


    Gusers.findByIdAndUpdate({_id:req.params.id},req.body={ "status": "1"}).then(function (user) {



        res.status(201).send({message:'activated'});


    }).catch(next);
});
router.post('/register',function (req,res,next) {
    res.header("Access-Control-Allow-Origin");
    console.log("post admin");
    Gusers.create(req.body).then(function (user) {
      // var userID  =  user._id;
      // console.log(userID);
      //
      //
      //   var transporter = nodemailer.createTransport({
      //       service: 'gmail',
      //       auth: {
      //           user: 'royalezbby@gmail.com',
      //           pass: 'munashe95'
      //       }
      //   });
      //
      //   var mailOptions = {
      //       from: 'royalezbby@gmail.com',
      //       to: req.body.email,
      //       subject: 'Support Guru',
      //       text: 'Thanks for creating a Guru account',
      //       html: '<h1>Welcome to Guru Please Activate your Account ' +
      //       '<a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a>'
      //
      //   };
      //
      //   transporter.sendMail(mailOptions, function(error, info){
      //       if (error) {
      //           console.log(error);
      //       } else {
      //           console.log('Email sent: ' + info.response);
      //       }
      //   });

        res.status(201).send({message:'created'});


    }).catch(next);


});
router.post('/super/login',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('login');
    console.log(req.body);
    Admin.findOne({
        username: req.body.username
    }, function(err, user) {

        console.log(err);

        if(!user){


            res.status(401).send({message:'wrong username or password'});
        }else {

            // if(user.password.toString()=== req.body.password.toString()){
            //     res.send(user);
            // }else {
            //     res.status(401).send({message:'wrong username or password'});
            // }
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                console.log('correct', isMatch); // -> Password123: true


                if(isMatch==true){
                    res.send(user.username);
                }else{
                    res.status(401).send({message:'wrong username or password'});
                }
            });


        }


    }).catch(next);
});
router.post('/login',function (req,res,next) {


    Gusers.findOne({
        email: req.body.email
    }, function(err, user) {

        console.log(err);

        if(!user){


            res.status(401).send({message:'wrong username or password'});
        }else {

            // if(user.password.toString()=== req.body.password.toString()){
            //     res.send(user);
            // }else {
            //     res.status(401).send({message:'wrong username or password'});
            // }
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                console.log('correct', isMatch); // -> Password123: true

                if(isMatch==true){



                    var token = jwt.sign({ user: user }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.status(200).send({ auth: true, token: token });
                    // res.status(200).send(user);
                }else{
                    res.status(401).send({message:'wrong username or password'});
                }
            });


        }


    }).catch(next);
});
//  var token = req.headers['x-access-token'];
//if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
module.exports = router;