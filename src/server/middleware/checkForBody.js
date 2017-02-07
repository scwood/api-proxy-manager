module.exports = function checkForBody(required) {
	return function (req, res, next) {
		var missing = required.filter(function (param) {
			return !(param in req.body);
		});
		if (missing.length === 0) {
			next();
		} else if (missing.length === 1) {
			res.status(400).send({
				error: 'Missing required value: ' + missing[0]
			});
		} else {
			res.status(400).send({
				error: 'Missing required values: ' + missing.join(', ')
			});
		}
	};
};
