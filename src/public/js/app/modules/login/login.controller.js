(function() {

  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$state', 'Auth'];

  function LoginController($state, Auth) {
    var vm = this;

    vm.username = null;
    vm.password = null;
    vm.error = null;

    vm.login = login;

    function login() {
      Auth.login(vm.username, vm.password)
        .then(function() {
          $state.go('app.dashboard');
        })
        .catch(function(error) {
          vm.error = error;
          vm.password = null;
        });
    }
  }
})();
