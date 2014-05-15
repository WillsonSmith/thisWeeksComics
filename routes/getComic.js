module.exports.retrieve = function(res, id){

	var http = require('http'),
		crypto = require('crypto'),
		md5 = crypto.createHash('md5'),
		pubKey = require('../api/api.js').pubKey,
		privKey = require('../api/api.js').privKey,
		date = new Date(),
		time = date.getTime(),
		args = '?ts=' + time + '&apikey=' + pubKey + '&hash=' + md5.update(time + privKey + pubKey).digest('hex');
		

	var opts = {

				host: 'gateway.marvel.com',
				path: '/v1/public/comics/' + id + args

			};

	var body = '';

	console.log(id);

	http.request(opts, function(result){

		result.setEncoding('utf8');

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
			
			res.json(body);

		});

	}).end();

};