var config = require('qsystem').getConfig();
var express = require('express');
var router = new express.Router();

module.exports = router;

router.get(config.basepath + 'healthcheck', function(req, res) {
	res.json({status: 'ok'});
});
