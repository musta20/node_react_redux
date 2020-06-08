const express = require('express');
const PostRout = require('./controller/PostContoller').PostRout;
const UserRout = require('./controller/UserController').UserRout;
const cors = require('cors');
const app  = express();
const port = 4000;
const path = require('path');

app.use(cors());
app.use('/',PostRout);
app.use('/',UserRout);


//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'build')))


app.get('/',function(req,res){
 //res.send('yse uam');
  return  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  //return  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/imges/undefined',function(req,res){
  return  res.sendFile(path.join(__dirname, 'controller/uploads/', 'undefined.png'))
})

 
app.get('/imges/:name',function(req,res){
  return  res.sendFile(path.join(__dirname, 'controller/uploads/', req.params.name))
})




app.listen(port, () => console.log(`This app listening at http://localhost:${port}`))

