var moment = require('moment');

function innerLoop(result) {

	var date = {type: 'sale', 'date': ''};

	for (var j = 0; j < result.dates.length; j++) {

		if (result.dates[j].type === 'onsaleDate') {

			date.date = moment(result.dates[j].date).format('D MMM YYYY');

			result.dates = date;

		}

	}

}

var format = function(body) {

	var results = body.data.results,
		length = results.length;

	for (var i = 0; i < length; i++) {

		innerLoop(body.data.results[i]);

	}

	
};

module.exports.fmt = format;