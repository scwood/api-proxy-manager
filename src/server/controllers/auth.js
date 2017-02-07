var jwt = require('jsonwebtoken');
var qsystem = require('qsystem');
var config = qsystem.getConfig();

module.exports.createToken = function createToken(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	if (username !== 'admin' || password !== 'admin') {
		res.status(401).send({ error: 'Incorrect username/password combination' });
		return;
	}
	var token = jwt.sign({ valid: true }, config.secret);
	res.status(201).send({ token: token });
};
