module.exports.getThisWeek = function (res){
	
	var r = require('./required.js').require,
		http = r.http,
		crypto = require('crypto'),
		md5 = crypto.createHash('md5'),
		pubKey = r.pubKey,
		privKey = r.privKey,
		time = r.date.getTime(),
		//moment = r.moment,
		fmtDate = require('./fmtDate.js'),
		args = '&ts=' + time + '&apikey=' + pubKey + '&hash=' + md5.update(time + privKey + pubKey).digest('hex'),
		opts,
		body = '';

		//should probably change this to something else
		function getWeek(){

			var current = r.date,
			year = current.getFullYear(),
			month = current.getMonth() + 1,
			day = current.getDay(),
			theDate = current.getDate(),
			sunday = theDate - day,
			nextSunday = sunday + 7,
			formatted;


			formatted = year + '-' + month + '-' + sunday + ',' + year + '-' + month + '-' + nextSunday;


			return formatted;


		}

		(function(){

			opts = {

				host: 'gateway.marvel.com',
				path: '/v1/public/comics?dateRange=' + getWeek() + '&limit=100	' + args

			};

			console.log(opts.host + opts.path);
			
			http.request(opts, function(result){

	      		result.setEncoding('utf8');

				result.on('data', function(chunk){

					body += chunk;

				});

				result.on('error', function(error){

					console.log('err', error.message);

				});

				result.on('end', function(){

					body = JSON.parse(body);

					if ('data' in body) {

						body.data.results.forEach( function(i){
							
							fmtDate.fmt(i.dates);

						});
					}

					res.json(body);

				});

			}).end();

		})();

};