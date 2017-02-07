var mongoose = require('mongoose')
var app = require('../app.js');
var logger = require('../utils/logger');
var config = require('qsystem').getConfig();

var port = process.env.EXPRESS_PORT || 3500;

mongoose.connect(config.mongo);
app.listen(port, function() {
	logger.info('Application started: ' + config.version);
});
