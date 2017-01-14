(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('GarageService', GarageService);

	GarageService.$inject = ['ApiService', '$q'];

	function GarageService(ApiService, $q) {

		/**
		 * Service object.
		 */
		var svc = {};

		/**
		 * Cars.
		 */
		svc.cars = [];

		/**
		 * Get all cars from Garage.
		 */
		svc.getAll = getAll;

		/**
		 * Internal functions.
		 */
		function getAll(clearCache) {

			var defer = $q.defer();

			if (svc.cars.length && !clearCache) {
				defer.resolve(svc.cars);
				return defer.promise;
			}

			ApiService.getCars().then(function(res){
				angular.copy(res.data, svc.cars);
				defer.resolve(svc.cars);
			}, function(res) { console.log(res); defer.reject(res) });

			return defer.promise;
		}

		/**
		 * Return service object.
		 */
		return svc;
	}

})(window.angular);
