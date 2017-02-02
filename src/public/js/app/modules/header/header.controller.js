(function() {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$state', 'Auth'];

  function HeaderController($state, Auth) {
    var vm = this;

    vm.logout = logout;

    vm.username = Auth.getUsername;

    function logout() {
      Auth.logout()
        .then(function() {
          $state.go('app.login');
        });
    }
  }
})();
