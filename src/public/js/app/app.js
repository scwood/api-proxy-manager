(function () {
  'use strict';

  angular
    .module('app', ['ui.bootstrap', 'ui.router', 'blockUI', 'toastr', 'ngAnimate', 'ngResource'])
    .constant('BASE_PATH', '/NationwideV2')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          'header': {
            templateUrl: 'js/app/modules/header/header.html',
            controller: 'HeaderController',
            controllerAs: 'header',
          }
        }
      })
      .state('app.login', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'js/app/modules/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login',
          }
        }
      })
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'content@': {
            templateUrl: 'js/app/modules/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard',
          }
        }
      });

    $urlRouterProvider.otherwise(function ($injector, $location) {
      var $state = $injector.get('$state');
      $state.go('app.dashboard');
    });

    $httpProvider.interceptors.push(function ($q) {
      return {
        responseError: function (rejection) {
          if (rejection.status === 401) {
            location.reload();
          }
          return $q.reject(rejection);
        }
      };
    });
  }
})();
