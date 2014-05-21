var moment = require('moment');
var format = function(item) {

	item.forEach( function(i){
		var date = {type: 'sale', 'date': ''};

		if (i.type === 'onsaleDate') {

			date.date = moment(i.date).format('D MMM YYYY');

			i.dates = date;

		}

	});

};

module.exports.fmt = format;