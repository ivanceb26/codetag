var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/versions', function(req, res){
  var fileName = "versions.jade";
    
  res.render(fileName);
  //res.render(fileName);
        
});

router.get('/', function(req, res){
  var fileName = "home.jade";
    
  res.render(fileName);
  //res.render(fileName);
        
});
router.get('/login', function(req, res){
  var fileName = "loginform.jade";
    
  res.render(fileName);
  //res.render(fileName);
        
});

router.get('/signup', function(req, res){
  var fileName = "signupform.jade";
    
  res.render(fileName);
  //res.render(fileName);
        
});




router.get('/bootstrap/?', function(req, res){
  var fileName = "";
    
  res.sendfile(__dirname+'/bootstrap/'+fileName);
        
});



router.get('/images/1', function(req, res){
  var fileName = "1.png";
    
  res.sendfile('./public/images/'+fileName);
        
});

router.get('/images/2', function(req, res){
  var fileName = "2.png";
    
  res.sendfile('./public/images/'+fileName);
        
});

router.get('/images/3', function(req, res){
  var fileName = "3.png";
    
  res.sendfile('./public/images/'+fileName);
        
});

router.get('/images/4', function(req, res){
  var fileName = "4.png";
    
  res.sendfile('./public/images/'+fileName);
        
});

router.get('/images/5', function(req, res){
  var fileName = "5.png";
    
  res.sendfile('./public/images/'+fileName);
        
});


module.exports = router;
