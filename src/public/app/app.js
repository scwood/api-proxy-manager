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
					templateUrl: 'app/header/header.html',
				}
			}
		})
		.state('app.login', {
			url: '/login',
			views: {
				'content@': {
					templateUrl: 'app/login/login.html',
					controller: 'LoginController',
					controllerAs: 'loginController'
				}
			}
		})
		.state('app.proxies', {
			url: '/proxies',
			views: {
				'content@': {
					templateUrl: 'app/proxies/proxies.html',
					controller: 'ProxiesController',
					controllerAs: 'proxiesController'
				}
			}
		})
		.state('app.proxy', {
			url: '/proxies/:id',
			views: {
				'content@': {
					templateUrl: 'app/proxy/proxy.html',
					controller: 'ProxyController',
					controllerAs: 'proxyController'
				}
			},
			params: {
				proxy: null
			}
		})
		.state('app.newProxy', {
			url: '/proxies/new',
			views: {
				'content@': {
					templateUrl: 'app/proxy/proxy.html',
					controller: 'ProxyController',
					controllerAs: 'proxyController'
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
