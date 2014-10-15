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
	path: 'string',
	head:'boolean'
});

var Documents = mongoose.model('documents',schema);

Documents.prototype.insertDocument = function(i,idori,titl,versio,commen,own,pathh,hea){
	var now = new Date();
	var jsonDate = now.toJSON();

	var newdoc = new Documents({
		id: i,
		idorigin: idori,
		title: titl,
		version: versio,
		comment: commen,
		date: jsonDate,
		owner: own,
		path: pathh,
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
	return doc.find({id:idd}).exec();
};

Documents.prototype.findByTitle = function(titl) {
	var doc = Documents;
	return doc.find({title:titl}).exec();
};

Documents.prototype.findByIdOrigin = function(idd) {
	var doc = Documents;
	return doc.find({idorigin:idd}).exec();
};

Documents.prototype.findAll = function() {
	var doc = Documents;
	return doc.find().exec();
};

module.exports = Documents;