var bunyan = require('bunyan');

module.exports = bunyan.createLogger({
	name: 'logs',
	streams: [
		{
			// log INFO and above to stdout
			level: 'debug',
			stream: process.stdout
		},
		{
			// log warn and above to a file
			type: 'rotating-file',
			period: '1w',
			count: 3,
			level: 'warn',
			path: '/var/log/error.log'
		}
	]
});
