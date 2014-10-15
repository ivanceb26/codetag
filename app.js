var express = require('express');
var http = require('http');
var stylus = require('stylus');
var app= express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Dropbox = require("dropbox");


//router
var routes = require('./routes/index.js');
var users = require('./routes/users.js');

var User = require('./model/user.js');
var Document = require('./model/docum.js');


var userM = new User();
var documents = Document();




///////****** EXPRESS CONFIGURE ********//////////
var jsonParser = bodyParser.json();

app.use(cookieParser('AuthApplalala'));
app.use(session());

app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});


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
 
////////************* DROPBOX **************////////////



var client = new Dropbox.Client({
    key: "i6b5c2dx9yyhbid",
    secret: "vr1y3b0k2u6sy7h"
});

//client.authDriver(new Dropbox.AuthDriver.NodeServer(3000));



var showError = function(error) {
  switch (error.status) {

  case Dropbox.ApiError.INVALID_TOKEN:{
    console.log('DropboxINVALID_TOKEN');
    break;
  }
    

  case Dropbox.ApiError.NOT_FOUND:{
    // The file or folder you tried
    console.log('DropboxNOT_FOUND')
    break;
  }

  case Dropbox.ApiError.OVER_QUOTA:{
    console.log('DropboxOVER_QUOTA');
    break;
  }

  case Dropbox.ApiError.RATE_LIMITED:{
    console.log('DropboxRATE_LIMITED');
    break;
  }

  case Dropbox.ApiError.NETWORK_ERROR:{
    console.log('DropboxNETWORK_ERROR');
    break;
  }

  case Dropbox.ApiError.INVALID_PARAM:{
    console.log('DropboxINVALID_PARAM');
    break;
  }
  case Dropbox.ApiError.OAUTH_ERROR:{
    console.log('DropboxOAUTH_ERROR');
    break;
  }
  case Dropbox.ApiError.INVALID_METHOD:
  {
    console.log('DropboxINVALID_METHOD');
  }
  default:{
    console.log('DropboxDEFAULTERROR');
    break;
  }
}
}




////////********** UTILS ******************//////////
function emailValidate ( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        return false;
    else return true;
}


function authenticate(us, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', us, pass);

    User.findOne({
        user: us
    },

    function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
            if(pass==user.password){
              console.log("si es igual");
              //return user;
              return fn(null,user);
            }
              fn(new Error('invalid password'));
          
        } else {
            return fn(new Error('cannot find user'));
        }
    });

}


function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

function userExistSession(req, res, next) {
    User.count({
        user: req.body.user
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.redirect("/signup");
        }
    });
}


////************* TESTS **************************************/////

//authenticate('nw','lalalala');


//user.insertUser('ivan ceballos','nw','lalala','123@123.com');
//user.findAll();

// documents.insertDocument('2','1','undoc.doc','2','comments text','userown','dropbox',true);
// documents.insertDocument('1','1','undoc.doc','1','comments text','userown','dropbox',true);
// documents.insertDocument('5','5','title','1','comments text','userown','dropbox',true);
// documents.insertDocument('9','5','title','2','comments text','userown','dropbox',true);
// documents.insertDocument('6','6','esteesotro.odt','1','comments text','userown','dropbox',true);
// documents.insertDocument('3','1','undoc.doc','3','comments text','userown','dropbox',true);
// documents.insertDocument('8','4','otrodoc.xls','2','comments text','userown','dropbox',true);
// documents.insertDocument('4','4','otrodoc.xls','1','comments text','userown','dropbox',true);

// documents.deleteDocument('titulo1');
//user.deleteUser('ivan ceballos');


//console.log("lalala \n");
// view engine setup
/////////****************************************************//////


//////********** POST METHODS *********/////////

app.post('/login', function(req, res){

  var logon = false;
  var dat={};
  dat[0] = req.body.user;
  dat[1] = req.body.pass;

  authenticate(dat[0],dat[1],function (err, user) {
    if (user) {

      req.session.regenerate(function () {

        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
        //client.authDriver(new Dropbox.AuthDriver.NodeServer(3000));

        // client.authenticate(function(error, client) {
        //   if (error) {
        //     return showError(error);
        //   }
        // });
        res.redirect('/');
      });
    }
    else {
      req.session.error = 'Authentication failed, please check your ' + ' username and password.';
      res.redirect('/login');
    }
  });
  
});



app.post('/signup', function(req, res){


  var error = false;

  var dat={};
  dat[0] = req.body.titleu;
  dat[1] = req.body.commentu;

  dat[3] = req.body.pass;
  dat[4] = req.body.repass;


  if(dat[0].length<3 || dat[0].lenght>18  ){
    error = true;
    req.session.error = "name length error, name length recomended is between 4 and 17 characters";
    res.redirect("/signup");
  }else if(!emailValidate(dat[1]) ){
    error = true;
    req.session.error = "Email format error ";
    res.redirect("/signup");
  }else if(dat[3].length<8 || dat[0].length>18  ){
    error = true;
    req.session.error = "pass length error, name lenght recomended is between 8 and 17 characters";
    res.redirect("/signup");

  }else if(dat[3]!=dat[4] ){
    error = true;
    req.session.error = "passwords no match";
    res.redirect("/signup");

  }else if (!error) {
    User.count({
        user: dat[2]
    }, function (err, count) {
        if (!(count === 0)) {
            error = true;
            req.session.error = "User exist in our database, please, input other user name or sigin";
            res.redirect("/signup");
        } else{
          //userM.insertUser(userM.nextID(),dat[0],dat[2],dat[3],dat[1]);
          res.send("Register Success");
        }
    });
  };
 

});

app.post('/upload', function(req, res){


  var error = false;

  var dat={};
  dat[0] = req.body.name;
  dat[1] = req.body.email;
  dat[2] = req.body.user;
  dat[3] = req.body.pass;
  dat[4] = req.body.repass;


  if(dat[0].length<3 || dat[0].lenght>18  ){
    error = true;
    req.session.error = "name length error, name length recomended is between 4 and 17 characters";
    res.redirect("/signup");
  }else if(!emailValidate(dat[1]) ){
    error = true;
    req.session.error = "Email format error ";
    res.redirect("/signup");
  }else if(dat[3].length<8 || dat[0].length>18  ){
    error = true;
    req.session.error = "pass length error, name lenght recomended is between 8 and 17 characters";
    res.redirect("/signup");

  }else if(dat[3]!=dat[4] ){
    error = true;
    req.session.error = "passwords no match";
    res.redirect("/signup");

  }else if (!error) {
    User.count({
        user: dat[2]
    }, function (err, count) {
        if (!(count === 0)) {
            error = true;
            req.session.error = "User exist in our database, please, input other user name or sigin";
            res.redirect("/signup");
        } else{
          //userM.insertUser(userM.nextID(),dat[0],dat[2],dat[3],dat[1]);
          res.send("Register Success");
        }
    });
  };
 

});



///////******* SERVER *********/////////

var server = app.listen(3000, function(){
	console.log('Listening on port %d', server.address().port);
});
