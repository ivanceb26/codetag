var mongoose = require('mongoose');
var db = require('./db_connect.js');
var Db = db;

var schema = new mongoose.Schema({ 
	id: 'number',
	idorigin: 'number', 
	title: 'string',
	version: 'number',
	comment: 'string',
	date: 'date',
	owner: 'string',
	head:'boolean'
});

var Documents = mongoose.model('documents',schema);

Documents.prototype.insertDocument = function(i,idori,titl,versio,commen,dat,own,hea){
	var newdoc = new Documents({
		id: i,
		idorigin: idori,
		title: titl,
		version: versio,
		comment: commen,
		date: dat,
		owner: own,
		head:hea  
	});

	newdoc.save(function (err, newus) {
		if (err) return console.error(err);
		else console.log("insert doc ok \n");
	});
}

Documents.prototype.deleteDocument = function(idd){
	var doc = Documents;
	doc.remove({ id : idd }, function (err) {
  		if (err){ 
  			console.log("delete doc error \n");
  			return handleError(err);
  		}
  		else console.log("deleted doc ok \n");
  	// removed!
	});
}

Documents.prototype.findById = function(idd) {
	var doc = Documents;
	doc.find({id:idd}, function(err, docu) {
		if(!err) {
			console.log(docu);
			return docu;
		} else {
			console.log('ERROR: ' + err);
		}
	});
};


Documents.prototype.findByTitle = function(titl) {
	var doc = Documents;
	doc.find({title:titl}, function(err, docu) {
		if(!err) {
			console.log(docu);
			return docu;
		} else {
			console.log('ERROR: ' + err);
		}
	});
};

Documents.prototype.findByIdOrigin = function(idd) {
	var doc = Documents;
	doc.find({idorigin:idd}, function(err, docu) {
		if(!err) {
			console.log(docu);
			return docu;
		} else {
			console.log('ERROR: ' + err);
		}
	});
};

Documents.prototype.findAll = function() {
	var doc = Documents;
	doc.find(function(err, docu) {
		if(!err) {
			console.log(docu);
			return docu;
		} else {
			console.log('ERROR: ' + err);
		}
	});
};

module.exports = Documents;