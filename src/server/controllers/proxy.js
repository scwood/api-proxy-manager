var Proxy = require('../models/proxy');

module.exports.getProxies = function (req, res, next) {
	Proxy.find()
		.then(function (proxies) {
			res.send({ proxies: proxies });
		})
		.catch(next);
};

module.exports.createProxy = function (req, res, next) {
	Proxy.find({ brandName: req.body.brandName, proxyName: req.body.proxyName })
		.then(function (documents) {
			if (documents.length !== 0) {
				res.status(400).send({
					error: 'Proxy with that brandId and brandId already exists'
				});
				return;
			}
			return Proxy.create(req.body)
				.then(function (proxy) {
					res.send({ proxy: proxy });
				})
		})
		.catch(next);
};

module.exports.updateProxy = function (req, res, next) {
	Proxy.findById(req.params.id)
		.then(function (proxy) {
			if (proxy === null) {
				send404(res);
				return;
			}
			Object.keys(req.body).forEach(function (key) {
				proxy[key] = req.body[key];
			});
			return proxy.save()
				.then(function (proxy) {
					res.send({ proxy: proxy });
				})
		})
		.catch(next);
};

module.exports.deleteProxy = function (req, res, next) {
	Proxy.findById(req.params.id)
		.then(function (proxy) {
			if (proxy === null) {
				send404(res);
				return;
			}
			return proxy.remove()
				.then(function () {
					res.send({ success: true });
				});
		})
		.catch(next);
};

function send404(res) {
	res.status(404).send({ error: 'Proxy not found' });
}
