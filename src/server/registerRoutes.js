var express = require('express');
var passport = require('passport');
var router = new express.Router();
var proxyController = require('./controllers/proxy');
var authController = require('./controllers/auth');
var authenticate = require('./middleware/authenticate');
var checkForBody = require('./middleware/checkForBody');

router.route('/:brandId/:proxyId')
	.get(notImplemented);

router.route('/admin/api/proxies')
	.get(proxyController.getProxies)
	.post(checkForBody([
		'brandName', 'proxyName', 'authToken', 'url', 'queryParameters'
	]), proxyController.createProxy);

router.route('/admin/api/proxies/:id')
	.patch(proxyController.updateProxy)
	.delete(proxyController.deleteProxy);

router.route('/admin/api/tokens')
	.post(checkForBody(['username', 'password']), authController.createToken);

function notImplemented(req, res) {
	res.sendStatus(501);
}

module.exports = router;
