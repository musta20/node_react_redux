const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')))


app.get('/',function(req,res){
 // return  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  return  res.sendFile(path.join(__dirname, 'src', 'index.html'))
})




app.listen(3000,console.log('running 3000 port'))