(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('ApiService', ApiService);

	ApiService.$inject = ['API', '$http'];

	function ApiService (API, $http) {

		var svc = {};

		svc.getCars = getCars;
		function getCars() {
			return $http.get(API.cars);
		}

		return svc;
	}

})(window.angular);
