var express = require('express');
var router = express.Router();

var func = require('../func/getComic.js');
/* GET users listing. */

exports.comic = function(req, res){
	
	var query = req.params.comic;
	
	var data = func.retrieve(res, query);

};

//module.exports = router;
