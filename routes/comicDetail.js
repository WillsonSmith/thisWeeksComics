var express = require('express');
var router = express.Router();

//var func = require('./getComic.js');
/* GET users listing. */

function render(res, query){

var http = require('http');

var opts = {

			port: '3000',
			path: '/comic/' + query

		},
		body = '';
		//console.log(opts.host + opts.path);
		//console.log(opts.path);

		http.request(opts, function(result){
			

			result.on('data', function(chunk){
				//console.log('dat');

				body += chunk;

			});

			result.on('error', function(error){

				console.log('err', error.message);

			});

			result.on('end', function(){

				//console.log(body);
				//body = decodeURIComponent(body);//JSON.parse(decodeURIComponent(body));
				body = JSON.parse(body);
				//console.log(moment);
				console.log('test');

				res.render('comicDetail', { title: 'Express', copyright: body.copyright, comics: body.data.results });

			});

		}).end();

}

exports.comicDetail = function(req, res){

	var query = req.params.comic;
	//console.log(query);
	//console.log(req.params);
	render(res, query);
	//var data = func.retrieve(res, query);

};

//module.exports = router;
