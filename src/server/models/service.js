var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
	brandId: {
		type: String,
		required: true
	},
	serviceId: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	queryParameters: [
		{
			_id: false,
			key: {
				type: String,
				required: true
			},
			value: {
				type: String,
				required: true
			},
			canOverride: {
				type: Boolean,
				required: true
			}
		}
	]
});

var Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
