var jwt = require('jsonwebtoken');
var qsystem = require('qsystem');
var config = qsystem.getConfig();

module.exports = function authenticate(req, res, next) {
	if (!req.headers || !('authorization' in req.headers)) {
		res.status(401).send({ error: 'Missing authorization header' });
		return;
	}
	var authHeader = req.headers.authorization;
	var parts = authHeader.split(' ');
	if (parts.length < 2 ||
		parts.length > 2 ||
		parts.shift().toLowerCase() !== 'bearer') {
		res.status(401).send({ error: 'Invalid authorization header format' });
		return;
	}
	var token = parts[0];
	var decoded;
	try {
		decoded = jwt.verify(token, config.secret);
	} catch (error) {
		notifyInvalidToken();
		return;
	}
	if (!decoded.valid) {
		notifyInvalidToken();
		return;
	}
	next();

	function notifyInvalidToken() {
		res.status(401).send({ error: 'Invalid authorization token' });
	}
};
