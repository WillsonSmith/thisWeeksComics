var express = require('express');
var router = express.Router();

var moment = require('moment');

var http = require('http');
function render(res){
var opts = {

			port: '3000',
			path: '/week'

		},
		body = '';

		http.request(opts, function(result){

			result.on('data', function(chunk){

				body += chunk;

			});

			result.on('error', function(error){

				console.log('err', error.message);

			});

			result.on('end', function(){

				body = JSON.parse(body);

				res.render('index', { title: 'Express', copyright: body.attributionHTML, comics: body.data.results });

			});

		}).end();

}

router.get('/', function(req, res) {

	render(res);
	//res.render('index', { title: 'Express' });
});

module.exports = router;
