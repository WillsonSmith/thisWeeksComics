var express = require('express');
var router = express.Router();

//var func = require('./getComic.js');
/* GET users listing. */

function render(res, query) {

var http = require('http');

var opts = {

			port: '3000',
			path: '/comic/' + query

		},
		body = '';


		http.request(opts, function(result) {
			

			result.on('data', function(chunk) {

				body += chunk;

			});

			result.on('error', function(error) {

				console.log('err', error.message);

			});

			result.on('end', function(){

				body = JSON.parse(body);

				console.log('test');

				res.render('comicDetail', { title: 'Express', copyright: body.copyright, comics: body.data.results });

			});

		}).end();

}

exports.comicDetail = function(req, res){

	var query = req.params.comic;

	render(res, query);

};

//module.exports = router;
