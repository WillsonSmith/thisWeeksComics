module.exports.require = {

	http: require('http'),
	moment: require('moment'),
	pubKey: require('../api/api.js').pubKey,
	privKey: require('../api/api.js').privKey,
	date: new Date()

};