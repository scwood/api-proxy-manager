(function () {

	'use strict';

	angular
		.module('app')
		.factory('Job', Job);

	Job.$inject = ['$resource', 'BASE_PATH'];

	function Job($resource, BASE_PATH) {
		var Job = $resource(
			BASE_PATH + '/jobs/:id',
			{ id: '@id' },
			{ query: { method: 'GET', isArray: false } }
		);

		Job.downloadJobFile = downloadJobFile;

		function downloadJobFile(id) {
			var url = BASE_PATH + '/jobs/' + id;
			window.open(url);
		}

		return Job;
	}

})();
