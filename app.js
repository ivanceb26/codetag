var express = require('express');
var app= express();
// var User = require('./user.js');
// var Document = require('./docum.js')


//var user = new User();
//user.insertUser('ivan ceballos','nw','lalala','123@123.com');


// var documents = Document();
// documents.insertDocument('1','titulo1','3','lalalala',new Date(),'usuario1',true);
// documents.deleteDocument('titulo1');

//user.deleteUser('ivan ceballos');


//console.log("lalala \n");
// view engine setup
app.engine('jade', require('jade').__express);


app.get('/prueba', function(req, res){
  var fileName = "versions.jade";
    
  res.render(__dirname+'/views/'+fileName);
  //res.render(fileName);
        
});








app.get('/static/1', function(req, res){
  var fileName = "1.png";
    
  res.sendfile(__dirname+'/static/'+fileName);
        
});

app.get('/static/2', function(req, res){
  var fileName = "2.png";
    
  res.sendfile(__dirname+'/static/'+fileName);
        
});

app.get('/static/3', function(req, res){
  var fileName = "3.png";
    
  res.sendfile(__dirname+'/static/'+fileName);
        
});

app.get('/static/4', function(req, res){
  var fileName = "4.png";
    
  res.sendfile(__dirname+'/static/'+fileName);
        
});

app.get('/static/5', function(req, res){
  var fileName = "5.png";
    
  res.sendfile(__dirname+'/static/'+fileName);
        
});

var server = app.listen(3000, function(){
	console.log('Listening on port %d', server.address().port);
});
