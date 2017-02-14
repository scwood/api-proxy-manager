var mongoose = require('mongoose');

var proxySchema = new mongoose.Schema({
	brandName: {
		type: String,
		required: true
	},
	proxyName: {
		type: String,
		required: true
	},
	authToken: {
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

var Proxy = mongoose.model('Proxy', proxySchema);
module.exports = Proxy;
