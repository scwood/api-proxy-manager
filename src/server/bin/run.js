var app = require('../app.js');
var logger = require('../lib/logger');
var config = require('qsystem').getConfig();

var port = process.env.EXPRESS_PORT || 3500;

app.listen(port, function() {
	logger.info('Application started: ' + config.version);
});
