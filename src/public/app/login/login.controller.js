angular
	.module('app')
	.controller('LoginController', LoginController)

LoginController.$inject = ['$state', 'Auth'];

function LoginController($state, Auth) {
	var self = this;

	self.username = null;
	self.password = null;
	self.error = null;

	self.login = login;

	function login() {
		Auth.login(self.username, self.password)
			.then(function() {
				$state.go('app.dashboard');
			})
			.catch(function(error) {
				self.error = error;
				self.password = null;
			});
	}
}
