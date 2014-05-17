var express = require('express');
var router = express.Router();

var func = require('../func/getWeeksComics.js');
/* GET users listing. */
router.get('/', function(req, res) {

	var data = func.getThisWeek(res);
  //res.send('respond with a resource');
});

module.exports = router;
