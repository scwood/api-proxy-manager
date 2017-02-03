var express = require('express');
var passport = require('passport');
var router = new express.Router();
var serviceController = require('./controllers/service');
var adminController = require('./controllers/admin');
var authenticate = require('./middleware/authenticate');
var checkForBody = require('./middleware/checkForBody');

router.route('/:brandId/:serviceId')
	.get(notImplemented);

router.route('/admin/api/services')
	.get(authenticate, notImplemented);

router.route('/admin/api/services/:id')
	.post(notImplemented)
	.patch(notImplemented)
	.delete(notImplemented);

router.route('/admin/api/tokens')
	.post(checkForBody(['username', 'password']), adminController.postToken);

function notImplemented(req, res) {
	res.sendStatus(501);
}

module.exports = router;
