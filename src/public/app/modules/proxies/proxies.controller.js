(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProxiesController', ProxiesController);

	ProxiesController.$inject = ['toastr', 'Proxy'];

	function ProxiesController(toastr, Proxy) {
		var vm = this;

		vm.numberOfItemsPerPage = 10;
		vm.proxies = [];
		vm.isLoading = false;

		vm.refreshProxies = refreshProxies;
		vm.deleteProxy = deleteProxy;
		vm.generateClientUrl = generateClientUrl;

		vm.refreshProxies();

		function refreshProxies() {
			vm.isLoading = true;
			Proxy.query().$promise
			  .then(function (response) {
			  	vm.proxies = response.proxies;
			  	vm.isLoading = false;
			  })
			  .catch(toastr.error);
		}

		function deleteProxy(id) {
			console.log(Proxy)
			Proxy.delete({id: id}).$promise
				.then(refreshProxies)
				.then(function () {
					toastr.success('Proxy deleted');
				})
				.catch(toastr.error);
		}

		function generateClientUrl(proxy) {
			return 'https://qualtrics.com/apps/apiManager/' +
					proxy.brandName + '/' + proxy.proxyName + '?token=' + proxy.token;
		}
	}
})();
