angular
	.module('app')
	.service('Session', Session)

function Session() {

	var service = {
		create: create,
		destroy: destroy,
	}

	return service;

	function create(username) {
		this.username = username;
	}

	function destroy() {
		this.username = null;
	}

}
