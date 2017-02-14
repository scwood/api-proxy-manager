angular
	.module('app')
	.controller('ProxiesController', ProxiesController);

ProxiesController.$inject = ['toastr', 'Proxy', '$state'];

function ProxiesController(toastr, Proxy, $state) {
	var self = this;

	self.numberOfItemsPerPage = 10;
	self.proxies = [];
	self.isLoading = false;

	self.refreshProxies = refreshProxies;
	self.deleteProxy = deleteProxy;
	self.generateClientUrl = generateClientUrl;
	self.goToProxy = goToProxy;

	self.refreshProxies();

	function refreshProxies() {
		self.isLoading = true;
		Proxy.query().$promise
			.then(function (response) {
				self.proxies = response.proxies;
				self.isLoading = false;
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
		return 'https://qualtrics.com/apps/apiManager/' + proxy.brandName + '/' +
			proxy.proxyName + '?token=' + proxy.authToken;
	}

	function goToProxy(proxy) {
		$state.go('app.proxy', { id: proxy._id, proxy: proxy });
	}
}
