(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('GarageService', GarageService);

	GarageService.$inject = ['ApiService', '$q'];

	function GarageService(ApiService, $q) {

		/**
		 * Me.
		 */
		var svc = {};

		/**
		 * Service properties.
		 */
		svc.cars = [];

		/**
		 * Service methods.
		 */
		svc.getAll = getAll;
		svc.add = add;

		/**
		 * Public functions (exposed by methods).
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

		function add(car) {

			var defer = $q.defer(),
				validation = validate(car);

			if ( ! validation.status) {
				defer.reject(validation.error);
				return defer.promise;
			}

			/**
			 * Here should be the $http or equivalent integration. Only for test
			 * purposes the application will add the item to the reference array
			 * and continue without persist.
			 */
			svc.cars.push(car);
			var asyncRes = {
				status: true,
				message: 'Veículo adicionado à frota com sucesso!'
			}

			defer.resolve(asyncRes)
			return defer.promise;
		}

		/**
		 * Private functions (not exposed).
		 */
		function validate(car) {

			/**
			 * There's no business rule, validation mock
			 * only for test purposes. Normally this is an
			 * important and required step in a real world application.
			 *
			 * I could pass an objet like
			 * { status: false, message: 'Validation fails at field ...' }
			 */
			var validation = {
				status: true
			}
			return validation;
		}

		/**
		 * Return me.
		 *
		 * angular.factory gives the return of function,
		 * instead a NEW instance, like angular.service.
		 */
		return svc;
	}

})(window.angular);
