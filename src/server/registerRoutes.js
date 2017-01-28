var express = require('express');
var router = new express.Router();

router.route('/:brandId/:serviceId')
	.get(notImplemented);

router.route('/api/admin/services')
	.get(notImplemented);

router.route('/api/admin/services/:id')
	.post(notImplemented)
	.patch(notImplemented)
	.delete(notImplemented);

function notImplemented(req, res) {
	res.sendStatus(501);
}

module.exports = router;
