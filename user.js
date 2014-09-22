var mongoose = require('mongoose');
var db = require('./db_connect.js');
var Db = db;

var schema = new mongoose.Schema({ 
	name: 'string',
	user: 'string',
	password: 'string',
	email: 'string'
});

//var User = function(){};
//User.prototype.model = mongoose.model('User', schema);
var User = mongoose.model('User', schema);

User.prototype.insertUser = function(nam,us,pass,mail){
	//var newus= new User.prototype.model({ name: nam ,user: us ,password: pass,email:mail  })
	var newus = new User({ 
		name: nam ,
		user: us ,
		password: pass,
		email:mail  
	});

	newus.save(function (err, newus) {
		if (err) return console.error(err);
		else console.log("insert user ok \n");
	});
}

User.prototype.deleteUser = function(nam){
	//var us = User;
	var us = User;
	us.remove({ name: nam }, function (err) {
  		if (err){ 
  			console.log("delete us error \n");
  			return handleError(err);
  		}
  		else console.log("deleted us ok \n");
  	// removed!
	});
}
 	

module.exports = User;