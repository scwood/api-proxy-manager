(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProxyController', ProxyController);

	ProxyController.$inject = ['toastr', 'Proxy'];

	function ProxyController(toastr, Proxy) {
		var vm = this;

		vm.proxy = { queryParameters: [] };

		vm.refreshProxies = refreshProxies;
		vm.addQueryParam = addQueryParam;
		vm.deleteQueryParam = deleteQueryParam;

		function refreshProxies() {

		}

		function addQueryParam() {
			vm.proxy.queryParameters.push({
				key: '',
				value: '',
				canOverride: false
			});
		}

		function deleteQueryParam(index) {
			vm.proxy.queryParameters.splice(index, 1);
		}
	}
})();
