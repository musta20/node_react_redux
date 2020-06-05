'use strict';

const UserRout = require('express').Router();
const UserModel = require('../models/UserModel').UserModel;
const JoiScheam = require('../models/UserModel').JoiScheam;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
var path = require('path');
var cookieParser = require('cookie-parser')
UserRout.use(bodyParser.json())
UserRout.use(bodyParser.urlencoded({extended:false}));
UserRout.use(cookieParser())


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'controller/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

   
UserRout.post('/UserImg',function(req, res) {
    var publicKEY  = fs.readFileSync('./public.pem', 'utf8');

    jwt.verify(req.cookies.token, publicKEY, function (err, payload) {
        // if token alg != RS256,  err == invalid signature
            if(err){
                return res.status(401).send({"data":"noauth"});}
                upload(req, res, function (err) {
                       if (err instanceof multer.MulterError) {
                           return res.status(500).json(err)
                       } else if (err) {
                           
                           console.log(err)
                           return res.status(500).json(err)
                       }
            
                       var thefile = req.file;
                       console.log(thefile.filename);
                       console.log(payload._id);
                    var donc =    UserModel.findOneAndUpdate(payload._id,{'imgurl':thefile.filename});
                    //  console.log(donc);
                    res.cookie("imgurl",thefile.filename);

                  return res.status(200).send(thefile.filename)
            
                })
        
        });
  

});

UserRout.get('/Mydata',async function(req,res){
    var publicKEY  = fs.readFileSync('./public.pem', 'utf8');

    jwt.verify(req.cookies.token, publicKEY, function (err, payload) {
        // if token alg != RS256,  err == invalid signature
            if(err){
                return res.status(401).send({"data":"noauth"});

            }
            console.log(req.cookies.token)
            console.log(payload)
        UserModel.findById(payload._id,function(err, docs){
            console.log(docs._id);
           return res.status(200).send(docs);
    
      });
 
   });

});

UserRout.get('/user',function(req,res){
    
    UserModel.find({},function(err, docs){
        console.log(docs);
       return res.status(200).send({"data":docs});

   });

});

UserRout.get('/user/:id',function(req,res){
    UserModel.findById(req.params.id,function(err, docs){
        console.log(docs);
       return res.status(200).send({"data":docs});

   });

});

UserRout.post('/verify',function(req,res){
    var publicKEY  = fs.readFileSync('./public.pem', 'utf8');
    
   


});

UserRout.post('/Register',async function(req,res){
console.log(req.body);

try {  
    await JoiScheam.validateAsync(req.body);

     await new UserModel(req.body).save();
     UserModel.findOne({email:req.body.email},function(err, docs){
        var privateKEY  = fs.readFileSync('./private.key', 'utf8');
        var token = jwt.sign({ _id: docs._id }, privateKEY, { algorithm: 'RS256'});
        res.cookie('token', token, { httpOnly: true });
        res.cookie("name",docs.name);
        res.cookie("imgurl",docs.imgurl);

        return res.status(200).send({"token":token});

   });    

     
} 
catch (e){
    console.log(e.message);
    return res.status(500).send({"data":e.message});

}

    
})

UserRout.post('/login',async function(req,res){

    try {  
        
        UserModel.findOne({email:req.body.email},function(err, docs){
            console.log(err);
            var privateKEY  = fs.readFileSync('./private.key', 'utf8');
            var token = jwt.sign({ _id: docs._id }, privateKEY, { algorithm: 'RS256'});
            res.cookie("imgurl",docs.imgurl);

            res.cookie('token', token, { httpOnly: true });
            res.cookie("name",docs.name);
            console.log(docs);
            console.log(docs.imgurl);
            
        return res.status(200).send({"token":token});
    
       });         
    } 
    catch (e){
        res.status(200).send({"data":e.message});
    
    }
   

    })


UserRout.post('/logout',async function(req,res){
        try{
            res.clearCookie('token');

        }catch(e){
            res.status(500).send(e)
        }
        res.status(200).send('ok');

    
        })
    

UserRout.delete('/user',async function(req,res){
    try {  

         await UserModel.findByIdAndRemove(req.params.id);
         res.status(200).send({"data":"deleted"});
    } 
    catch (e){
        res.status(200).send({"the erorr":e.message});
    
    }
})

UserRout.put('/user', function(req,res){

    var publicKEY  = fs.readFileSync('./public.pem', 'utf8');

    jwt.verify(req.cookies.token, publicKEY,async function (err, payload) {
        // if token alg != RS256,  err == invalid signature
            if(err){
                
                return res.status(401).send({"data":"noauth"});}
           
    try {  
      //  await JoiScheam.validateAsync(req.body);
    
         await UserModel.findByIdAndUpdate(payload._id,req.body);
         res.cookie("name",req.body.name);

         res.status(200).send({"data":"data updated"});
    } 
    catch (e){
        console.log(e.message);
        res.status(200).send({"data":e.message});
    
    }
})
})


exports.UserRout = UserRout;