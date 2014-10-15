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
	return us.remove({ user: user }, function (err) {
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
	return usr.find({id:idd}).exec();
};


User.prototype.findByUser = function(us) {
	var usr = User;
	var result = usr.findOne({user: us}).exec();
	
	return result;
};



User.prototype.findAll = function() {
	var usr = User;
	return usr.find().exec();
};

User.prototype.nextID = function() {
	var next;
	var obj;
	var usr = User;
	var query = usr.find().exec();
	var count =0;
	query.then(function(qusers){	
		if(quser.size<1) {//por si la base de datos est'a en blanco
			next=0;
		return 0;
		}
		else{
			qusers.forEach(function(quser){

				count++;
				next=count;
			});

		}
	});

	return next;
};


module.exports = User;