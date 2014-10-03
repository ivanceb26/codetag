var mongoose = require('mongoose');
var db = require('./db_connect.js');
var Db = db;

var schema = new mongoose.Schema({
	id: 'number', 
	name: 'string',
	user: 'string',
	password: 'string',
	email: 'string'
});

//var User = function(){};
//User.prototype.model = mongoose.model('User', schema);
var User = mongoose.model('User', schema);

User.prototype.insertUser = function(idd,nam,us,pass,mail){
	//var newus= new User.prototype.model({ name: nam ,user: us ,password: pass,email:mail  })
	var newus = new User({
		id:idd,
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
	us.remove({ user: user }, function (err) {
  		if (err){ 
  			console.log("delete us error \n");
  			return handleError(err);
  		}
  		else console.log("deleted us ok \n");
  	// removed!
	});
}


User.prototype.findById = function(idd) {
	var usr = User;
	usr.find({id:idd}, function(err, usru) {
		if(!err) {
			//console.log(usru);
			return usru;
		} else {
			console.log('ERROR: ' + err);
		}
	});
};


User.prototype.findByUser = function(titl) {
	var usr = User;
	usr.find({user:titl}, function(err, usru) {
		if(!err) {
			//console.log(usru);
			return usru;
		} else {
			console.log('ERROR: ' + err);
		}
	});
};



User.prototype.findAll = function() {
	var usr = User;
	usr.find(function(err, usru) {
		if(!err) {
			//console.log(usru);
			return usru;
		} else {
			console.log('ERROR: ' + err);
		}
	});
};

User.prototype.nextID = function() {
	var next=0;
	var obj;
	var usr = User;
	usr.find(function(err, usru) {
		if(!err) {
			if(usru.length<1) return 0; //por si la base de datos est'a en blanco
			console.log(usru);
			obj=usru;

			next=obj[0].id;
			for (var i = obj.length - 1; i >= 0; i--) {
				if(next<=obj[i].id){
					next=obj[i].id+1;
				}
			};

		} else {
			console.log('ERROR: ' + err);
		}
	});

	
	return next;
};


module.exports = User;