(function () {
	'use strict';

	angular
		.module('app', ['ui.bootstrap', 'ui.router', 'blockUI', 'toastr', 'ngAnimate', 'ngResource'])
		.constant('API_PATH', '/apps/apiManager/admin/api')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

	function config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider
			.state('app', {
				abstract: true,
				views: {
					'header': {
						templateUrl: 'app/modules/header/header.html',
						controller: 'HeaderController',
						controllerAs: 'header'
					}
				}
			})
			.state('app.login', {
				url: '/login',
				views: {
					'content@': {
						templateUrl: 'app/modules/login/login.html',
						controller: 'LoginController',
						controllerAs: 'login'
					}
				}
			})
			.state('app.proxies', {
				url: '/proxies',
				views: {
					'content@': {
						templateUrl: 'app/modules/proxies/proxies.html',
						controller: 'ProxiesController',
						controllerAs: 'proxies'
					}
				}
			})
			.state('app.proxy', {
				url: '/proxies/:id',
				views: {
					'content@': {
						templateUrl: 'app/modules/proxy/proxy.html',
						controller: 'ProxyController',
						controllerAs: 'proxy'
					}
				}
			})
			.state('app.newProxy', {
				url: '/proxies/new',
				views: {
					'content@': {
						templateUrl: 'app/modules/proxy/proxy.html',
						controller: 'ProxyController',
						controllerAs: 'proxy'
					}
				}
			});

		$urlRouterProvider.otherwise(function ($injector, $location) {
			var $state = $injector.get('$state');
			$state.go('app.login');
		});

		$httpProvider.interceptors.push(function ($q) {
			return {
				responseError: function (rejection) {
					if (rejection.status === 401) {
						//location.reload();
					}
					return $q.reject(rejection);
				}
			};
		});
	}
})();
