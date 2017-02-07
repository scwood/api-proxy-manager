var Service = require('../models/service');

module.exports.getServices = function getServices(req, res, next) {
	Service.find()
		.then(function (services) {
			res.send({ services: services });
		})
		.catch(next);
};

module.exports.createService = function createService(req, res, next) {
	Service.find({ brandId: req.body.brandId, serviceId: req.body.serviceId })
		.then(function (documents) {
			if (documents.length !== 0) {
				res.status(400).send({
					error: 'Service with that brandId and brandId already exists'
				});
				return;
			}
			return Service.create(req.body)
				.then(function (service) {
					res.send({ service: service });
				})
		})
		.catch(next);
};

module.exports.updateService = function updateService(req, res, next) {
	Service.findById(req.params.id)
		.then(function (service) {
			if (service === null) {
				send404(res);
				return;
			}
			Object.keys(req.body).forEach(function (key) {
				service[key] = req.body[key];
			});
			return service.save()
				.then(function (service) {
					res.send({ service: service });
				})
		})
		.catch(next);
};

module.exports.deleteService = function deleteService(req, res, next) {
	Service.findById(req.params.id)
		.then(function (service) {
			if (service === null) {
				send404(res);
				return;
			}
			return service.remove()
				.then(function () {
					res.send({ success: true });
				});
		})
		.catch(next);
};

function send404(res) {
	res.status(404).send({ error: 'Service not found' });
}
