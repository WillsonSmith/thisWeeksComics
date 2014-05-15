var express = require('express');
var router = express.Router();

var func = require('./getComic.js');
/* GET users listing. */

exports.comic = function(req, res){
	var query = req.params.comic;
	console.log(query);
	console.log(req.params);
	var data = func.retrieve(res, query);
  //res.send('respond with a resource');
};

//module.exports = router;
