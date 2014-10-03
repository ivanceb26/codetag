var express = require('express');
var stylus = require('stylus');
var app= express();
var bodyParser = require('body-parser')

//router
var routes = require('./routes/index.js');
var users = require('./routes/users.js');

 var User = require('./model/user.js');
 var Document = require('./model/docum.js')


var user = new User();
//user.insertUser('ivan ceballos','nw','lalala','123@123.com');
user.findAll();


var documents = Document();
//documents.insertDocument('2','1','titulo1','3','lalalala',new Date(),'usuario1',true);
// documents.deleteDocument('titulo1');
//documents.findById(1);
//documents.findById(1);
//documents.findByTitle("titulo1");
//documents.findByIdOrigin(1);
//documents.findAll();
//user.deleteUser('ivan ceballos');


//console.log("lalala \n");
// view engine setup
var jsonParser = bodyParser.json()

app.use(bodyParser());
app.set('views', __dirname+'/views');

app.engine('jade', require('jade').__express);

app.use(stylus.middleware({
  src: __dirname+'/css' ,
  dest: __dirname + '/public/css',
  debug: true,
  force: true
}));

app.use(express.static(__dirname+"/public"));

app.use('/', routes);
//app.use('/users', users);


//utils
var emailValidate= function ( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        return false;
    else return true;
}




// Object.size = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };

function userExist(usrr){

  //var us = {};
  var us = user.findByUser(usrr);
  console.log(us);
   //if(us[0].user==usrr) return false;
   //else return true;
}


userExist("lalalala");
////





app.post('/signup', function(req, res){

    var error = false;
    
     var dat={};
     dat[0] = req.body.name;
     dat[1] = req.body.email;
     dat[2] = req.body.user;
     dat[3] = req.body.pass;
     dat[4] = req.body.repass;


     if(dat[0].length<3 || dat[0].lenght>18  ){

      res.send("name length error, name length recomended is between 4 and 17 characters");
      error = true;
     }
     if(!emailValidate(dat[1]) ){

      res.send("Email format error");
      error = true;
     }
     if(userExist(dat[2]) ){

      res.send("User exist in our database, please, input other");
      error = true;
     }


     if(dat[3].length<8 || dat[0].length>18  ){

      res.send("pass length error, name length recomended is between 4 and 17 characters");
      error = true;
     }else if(dat[3]!=dat[4] ){

      res.send("passwords no match");
      error = true;
     }

     if(!error){
        user.insertUser(user.nextID(),dat[0],dat[2],dat[3],dat[1]);
        res.send("Registro Corercto");
     }

     //console.log(dat);
     //return 0;

});






var server = app.listen(3000, function(){
	console.log('Listening on port %d', server.address().port);
});
