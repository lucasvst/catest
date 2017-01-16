(function(angular) {
	'use strict';

	var api	= {};

	api.baseUrl = 'api/';

	api.cars = resourceOf('cars');

	angular.module('app').constant('API', api);

	function resourceOf(resourceName) {
		return api.baseUrl + resourceName + '.json';
	}

})(angular);
