var mongoose = require('mongoose');
var db = require('./db_connect.js');
var Db = db;

var schema = new mongoose.Schema({ 
	id: 'number',
	title: 'string',
	version: 'number',
	comment: 'string',
	date: 'date',
	owner: 'string',
	head:'boolean'
});

var Documents = mongoose.model('documents',schema);

Documents.prototype.insertDocument = function(i,titl,versio,commen,dat,own,hea){
	var newdoc = new Documents({
		id: i,
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

Documents.prototype.deleteDocument = function(titl){
	var doc = Documents;
	doc.remove({ title: titl }, function (err) {
  		if (err){ 
  			console.log("delete doc error \n");
  			return handleError(err);
  		}
  		else console.log("deleted doc ok \n");
  	// removed!
	});
}


module.exports = Documents;