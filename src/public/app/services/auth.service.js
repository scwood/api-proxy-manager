(function () {
	'use strict';

	angular
		.module('app')
		.service('Auth', Auth);

	Auth.$inject = ['$http', '$q', 'Session', 'BASE_PATH'];

	function Auth($http, $q, Session, BASE_PATH) {
		var service = {
			isAuthenticated: isAuthenticated,
			getUsername: getUsername,
			logout: logout,
			login: login,
			refreshAuthFromServer: refreshAuthFromServer,
		};

		return service;

		function isAuthenticated() {
			return !!Session.username;
		}

		function getUsername() {
			return Session.username;
		}

		function login(username, password) {
			return $q(function (resolve, reject) {
				Session.create('blah');
				resolve();
			});
			// return $q(function (resolve, reject) {
			//   $http.post(BASE_PATH + '/users/login', {
			//     username: username,
			//     password: password
			//   })
			//     .then(function (response) {
			//       Session.create(username);
			//       resolve();
			//     })
			//     .catch(function (response) {
			//       Session.destroy();
			//       reject(response.data.error);
			//     });
			//});
		}

		function logout() {
			Session.destroy();
			return $http.post(BASE_PATH + '/users/logout');
		}

		function refreshAuthFromServer() {
			return $q(function (resolve, reject) {
				resolve();
			});
			// return $q(function (resolve, reject) {
			// 	$http.get(BASE_PATH + '/users/current')
			// 		.then(function (response) {
			// 			if (response.data.result === null) {
			// 				Session.destroy();
			// 				reject();
			// 			} else {
			// 				Session.create(response.data.result.username);
			// 				resolve();
			// 			}
			// 		});
			// });
		}
	}
})();
