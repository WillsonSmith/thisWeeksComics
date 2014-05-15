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
		//console.log(opts.host + opts.path);


		http.request(opts, function(result){

			result.on('data', function(chunk){

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

				res.render('index', { title: 'Express', copyright: body.copyright, comics: body.data.results });

			});

		}).end();

}

/* GET home page. */
router.get('/', function(req, res) {

	render(res);
	//res.render('index', { title: 'Express' });
});

module.exports = router;
