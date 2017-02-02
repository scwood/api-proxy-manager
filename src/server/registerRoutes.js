var express = require('express');
var passport = require('passport');
var router = new express.Router();

router.get('/:brandId/:serviceId', notImplemented);

var adminRouter = new express.Router();

router.route('/admin/services')
	.get(notImplemented);

router.route('/admin/services/:id')
	.post(notImplemented)
	.patch(notImplemented)
	.delete(notImplemented);

function notImplemented(req, res) {
	res.sendStatus(501);
}

module.exports = router;
