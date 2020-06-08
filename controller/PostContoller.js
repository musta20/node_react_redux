const PostRout = require('express').Router();
const PostModel = require('../models/PostModel').PostModel;
const JoiScheam = require('../models/PostModel').JoiScheam;
const fs             = require('fs-extra');
const formidable     = require('formidable');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

   
PostRout.use(bodyParser.json())
PostRout.use(bodyParser.urlencoded({extended:false}));
PostRout.use(cookieParser())

PostRout.get('/post',function(req,res){

     PostModel.find({},function(err, docs){
         if(err) {return res.status(500).send({"data":"err"});}

        return res.status(200).send({"data":docs});

    });

});
PostRout.post('/profile',  (req, res) => {

     const path = './controller/uploads/';

     var form = new formidable.IncomingForm();
     form.uploadDir = path;
     form.encoding = 'binary';

     form.parse(req, function(err, fields, files) {
          if (err) {
               console.log(err);
               res.status(500).send('upload failed')
          } else {
              var thf = files.upload
               var oldpath = thf.path;
               var filename = Math.floor(Math.random() * 100001)+thf.name;
               var newpath = path+filename;
               console.log(thf);

               fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    console.log("http://127.0.0.1:3000/imges/"+filename);
                    res.send({
                        "uploaded": 1,
                        "fileName": filename,
                        "url": "http://127.0.0.1:4000/imges/"+filename
                    }).end();

                    
               });
          }
     });
})
  
PostRout.get('/post/:id',function(req,res){
    PostModel.findById(req.params.id,function(err, docs){
        if(err) {return res.status(500).send({"data":"err"});}

       return res.status(200).send(docs);

   });

});

PostRout.post('/post',async function(req,res){
    console.log(req.body);
    console.log('Cookies: ', req.cookies)

    try {  
    await JoiScheam.validateAsync(req.body);

     await new PostModel(req.body).save();
     res.status(200).send({"data":req.body});
} 
catch (e){
    res.status(500).send({"data":e.message});

}
})

PostRout.delete('/post/:id',async function(req,res){
    try {  

         await PostModel.findByIdAndRemove(req.params.id);
         res.status(200).send({"data":"deleted"});
    } 
    catch (e){
        res.status(500).send({"the erorr":e.message});
    
    }
})

PostRout.put('/post/:id',async function(req,res){
    try {  
        await JoiScheam.validateAsync(req.body);
    
         await PostModel.findByIdAndUpdate(req.params.id,req.body);
         res.status(200).send({"data":"data updated"});
    } 
    catch (e){
        res.status(200).send({"data":e.message});
    
    }
})


exports.PostRout = PostRout;