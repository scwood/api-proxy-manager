
(function () {

  'use strict';

  angular
    .module('app')
    .directive('datepicker', datepicker);

  function datepicker() {
    return {
      require: 'ngModel',
      link: function(scope, el, attr, ngModel) {
        $(el).datepicker({ format: 'yyyy-mm-dd' }).on('changeDate', function (e) {
          ngModel.$setViewValue($(el).val());
        });
      }
    }
  }

})();
