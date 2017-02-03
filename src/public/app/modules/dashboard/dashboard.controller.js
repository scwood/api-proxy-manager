(function () {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['toastr', 'Job'];

	function DashboardController(toastr, Job) {
		var vm = this;

		vm.jobForm = {
			startDate: null,
			endDate: null,
			surveyType: null,
		};
		vm.currentPage = 1;
		vm.numberOfJobsPerPage = 10;

		vm.clearJobForm = clearJobForm;
		vm.submitJobForm = submitJobForm;
		vm.refreshJobs = refreshJobs;
		vm.downloadJobFile = downloadJobFile;
		vm.deleteJob = deleteJob;
		vm.paginate = paginate;

		vm.refreshJobs();

		function clearJobForm() {
			vm.jobForm.startDate = null;
			vm.jobForm.endDate = null;
			vm.jobForm.surveyType = null;
		}

		function submitJobForm() {
			var job = new Job(vm.jobForm);
			job.$save()
				.then(clearJobForm)
				.then(refreshJobs)
				.then(function () {
					toastr.success('Refresh files list to monitor progress', 'Transform job started');
				})
				.catch(toastr.error);
		}

		function refreshJobs() {
			vm.jobs = [];
			// Job.query().$promise
			//   .then(function (response) {
			//     vm.jobs = response.result;
			//   })
			//   .catch(toastr.error);
		}

		function downloadJobFile(id) {
			Job.downloadJobFile(id);
		}

		function deleteJob(id) {
			Job.delete({id: id}).$promise
				.then(refreshJobs)
				.then(function () {
					toastr.success('Transform file deleted');
				})
				.catch(toastr.error);
		}

		function paginate(job) {
			var begin = (vm.currentPage - 1) * vm.numberOfJobsPerPage;
			var end = begin + vm.numberOfJobsPerPage;
			var index = vm.jobs.indexOf(job);
			return begin <= index && index < end;
		}
	}
})();
