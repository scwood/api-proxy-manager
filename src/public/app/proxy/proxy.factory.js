angular
	.module('app')
	.factory('Proxy', Proxy);

Proxy.$inject = ['$resource', 'API_PATH'];

function Proxy($resource, API_PATH) {
	return $resource(
		API_PATH + '/proxies/:id',
		{ id: '@id' },
		{ query: { method: 'GET', isArray: false } }
	);
}
