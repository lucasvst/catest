(function(angular) {
	"use strict";

	angular
		.module('app')
		.service('ApiService', ApiService);

	ApiService.$inject = ['API', '$http'];

	function ApiService (API, $http) {

		/**
		 * Me.
		 */
		var svc = this;

		/**
		 * Service methods.
		 */
		svc.getCars = getCars;
		function getCars() {
			return $http.get(API.cars);
		}

		/**
		 * angular.service returns a NEW INSTANCE,
		 * instead function return, like angular.factory.
		 * This way there's no need to return anything, once
		 * everything appended to 'this' will be available at the instance.
		 */
	}

})(window.angular);
