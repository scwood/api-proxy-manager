(function () {
	'use strict';

	angular
		.module('app')
		.filter('arrayToPairs', arrayToPairs);

	function arrayToPairs() {
		return function (input) {
			var result = [];
			for (var i = 0; i < input.length; i += 2) {
				result.push(input.slice(i, i + 2));
			}
			console.log(result)
			return result;
		}
	}
})();
