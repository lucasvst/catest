(function(angular) {
	'use strict';

	var env	= {};

	env.baseUrl = '/api/';

	env.cars = resourceOf('cars')

	angular.module('app').constant('API', env);

	function resourceOf(resourceName) {
		return env.baseUrl + resourceName + '.json';
	}

})(angular);
