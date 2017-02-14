angular
	.module('app')
	.controller('ProxyController', ProxyController);

ProxyController.$inject = ['toastr', 'Proxy', '$state'];

function ProxyController(toastr, Proxy, $state) {
	var self = this;

	self.proxy = { queryParameters: [] };

	self.addQueryParam = addQueryParam;
	self.deleteQueryParam = deleteQueryParam;

	if ($state.params.proxy) {
		self.proxy = $state.params.proxy;
	} else {
		// fetch by id
	}

	function addQueryParam() {
		self.proxy.queryParameters.push({
			key: '',
			value: '',
			canOverride: false
		});
	}

	function deleteQueryParam(index) {
		self.proxy.queryParameters.splice(index, 1);
	}
}
