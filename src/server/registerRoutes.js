var express = require('express');
var passport = require('passport');
var router = new express.Router();
var serviceController = require('./controllers/service');
var authController = require('./controllers/auth');
var authenticate = require('./middleware/authenticate');
var checkForBody = require('./middleware/checkForBody');

router.route('/:brandId/:serviceId')
	.get(notImplemented);

router.route('/admin/api/services')
	.get(authenticate, serviceController.getServices)
	.post(authenticate, checkForBody([
		'brandId', 'serviceId', 'token', 'url', 'queryParameters'
	]), serviceController.createService);

router.route('/admin/api/services/:id')
	.patch(authenticate, serviceController.updateService)
	.delete(authenticate, serviceController.deleteService);

router.route('/admin/api/tokens')
	.post(checkForBody(['username', 'password']), authController.createToken);

function notImplemented(req, res) {
	res.sendStatus(501);
}

module.exports = router;
