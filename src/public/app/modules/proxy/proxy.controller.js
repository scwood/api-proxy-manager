(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProxyController', ProxyController);

	ProxyController.$inject = ['toastr', 'Proxy'];

	function ProxyController(toastr, Proxy) {
		var vm = this;

		vm.proxy = { queryParameters: [1,2,3] };

		vm.refreshProxies = refreshProxies;

		function refreshProxies() {

		}
	}
})();
