module.exports.getThisWeek = function (res){
	
	var http = require('http'),
		crypto = require('crypto'),
		md5 = crypto.createHash('md5'),
		moment = require('moment'),
		pubKey = require('../api/api.js').pubKey,
		privKey = require('../api/api.js').privKey,
		date = new Date(),
		time = date.getTime(),
		args = '&ts=' + time + '&apikey=' + pubKey + '&hash=' + md5.update(time + privKey + pubKey).digest('hex'),
		opts,
		body = '';

		//should probably change this to something else
		function getWeek(){

			var current = date,
			year = current.getFullYear(),
			month = current.getMonth() + 1,
			day = current.getDay(),
			theDate = current.getDate(),
			sunday = theDate - day,
			nextSunday = sunday + 7,
			formatted;

			/*if (sunday === 0) {

				month = month - 1;

			}

			if (month < 0) {

				year = year - 1;
				month = month + 1;

			}*/

			formatted = year + '-' + month + '-' + sunday + ',' + year + '-' + month + '-' + nextSunday;


			return formatted;


		}
		//console.log( date.getFullYear(), date.getMonth() + 1, date.getDate() - day);
		//console.log(date.today());
		//console.log(getWeek());
		(function(){

			opts = {

				host: 'gateway.marvel.com',
				path: '/v1/public/comics?dateRange=' + getWeek()/*2014-05-11%2C2014-05-17*/ + '&limit=100	' + args

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

					//console.log(body);
					//body = decodeURIComponent(body);//JSON.parse(decodeURIComponent(body));
					body = JSON.parse(body);
					body.data.results.forEach( function(i){

					i.dates.forEach( function(e){
						var date = {type: 'sale', 'date': ''};

						//console.log(e)

						//console.log(i.dates);
						if (e.type === 'onsaleDate') {

							e.date = moment(e.date).format('D MMM YYYY');
							date.date = e.date;

							i.dates = date;


						}

						//console.log(moment.format(e.date));


					});


				});
					res.json(body);

				});

			}).end();

		})();

};