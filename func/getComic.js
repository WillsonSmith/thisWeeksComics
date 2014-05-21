module.exports.retrieve = function(res, id){

	var r = require('./required.js').require,
		http = r.http,
		crypto = require('crypto'),
		md5 = crypto.createHash('md5'),
		pubKey = r.pubKey,
		privKey = r.privKey,
		fmtDate = require('./fmtDate.js'),
		time = r.date.getTime(),
		args = '?ts=' + time + '&apikey=' + pubKey + '&hash=' + md5.update(time + privKey + pubKey).digest('hex');
		

	var opts = {

				host: 'gateway.marvel.com',
				path: '/v1/public/comics/' + id + args

			};

	var body = '';

	console.log(id);

	http.request(opts, function(result) {

		result.setEncoding('utf8');

		result.on('data', function(chunk) {

			body += chunk;

		});

		result.on('error', function(error) {

			console.log('err', error.message);

		});

		result.on('end', function() {

			/*try {
			
				body = JSON.parse(body);
			
			} catch (er) {

				return {

					error: er

				};

			}*///may or may not need

			body = JSON.parse(body);
			
			if ('data' in body) {

				body.data.results.forEach(function(i){

					fmtDate.fmt(i.dates);

				});

			}
			
			res.json(body);

		});

	}).end();

};