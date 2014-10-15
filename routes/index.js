var express = require('express');
var router = express.Router();



function auth(route,req, res){
    if (req.session.user) {
        res.render(route);
    } else {
        res.redirect('/login');
    }

}

/* GET home page. */
router.get('/versions', function(req, res){
  auth("versions.jade",req,res);
        
});

router.get('/', function(req, res){
  auth("home.jade",req,res);
});

router.get('/login', function(req, res){
  if (req.session.user) res.redirect('/');
  else  res.render("loginform.jade");

});

router.get('/signup', function(req, res){    
  if (req.session.user)res.redirect('/');
  else res.render("signupform.jade");
});

router.get('/bootstrap/?', function(req, res){
  var fileName = "";
    
  res.sendfile(__dirname+'/bootstrap/'+fileName);
        
});

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});





///////******IMAGE PREVIEWS************///////

// router.get('/images/1', function(req, res){
//   var fileName = "1.png";  
//   res.sendfile('./public/images/'+fileName);
// });

// router.get('/images/2', function(req, res){
//   var fileName = "2.png";
//   res.sendfile('./public/images/'+fileName);
// });

// router.get('/images/3', function(req, res){
//   var fileName = "3.png";
//   res.sendfile('./public/images/'+fileName);
// });

// router.get('/images/4', function(req, res){
//   var fileName = "4.png";
//   res.sendfile('./public/images/'+fileName);
// });

// router.get('/images/5', function(req, res){
//   var fileName = "5.png";
//   res.sendfile('./public/images/'+fileName);
// });


module.exports = router;
