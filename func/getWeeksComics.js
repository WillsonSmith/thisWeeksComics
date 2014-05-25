module.exports.getThisWeek = function (res){
	
	var r = require('./required.js').require,
		http = r.http,
		crypto = require('crypto'),
		md5 = crypto.createHash('md5'),
		pubKey = r.pubKey,
		privKey = r.privKey,
		time = r.date.getTime(),
		moment = r.moment,
		fmtDate = require('./fmtDate.js'),
		args = '&ts=' + time + '&apikey=' + pubKey + '&hash=' + md5.update(time + privKey + pubKey).digest('hex'),
		opts,
		body = '';

		//should probably change this to something else

		function setDateTime(object, dateObject) {

			object.date = moment(dateObject).format('YYYY-MM-D');

		}

		function getWeek(){

			var current = new Date(),//r.date,
			o1 = {},
			o2 = {},
			formatted;

			current.setDate(current.getDate() - current.getDay());
			//console.log(current.getDate(), current.getDate() - current.getDay());
			setDateTime(o1, current);

			current.setDate(current.getDate() + 7);
			setDateTime(o2, current);

			formatted = o1.date + ',' + o2.date;

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
					var thingie;

					body = JSON.parse(body);

					if ('data' in body) {

						fmtDate.fmt(body);
						/*for (var i = 0; i < body.data.results.length; i++) {

							thingie = fmtDate.fmt(body.data.results[i].dates);

						}
						console.log(thingie);*/
						/*body.data.results.forEach( function(i, index){

							
							//body.data.results[index].dates = moment(i[0].date).format('D MMM YYYY');
							fmtDate.fmt(body.data.results[index].dates);


						});*/
					}

					res.json(body);

				});

			}).end();

		})();

};