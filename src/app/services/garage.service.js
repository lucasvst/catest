(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('GarageService', GarageService);

	GarageService.$inject = ['ApiService', '$q', 'md5'];

	function GarageService(ApiService, $q, md5) {

		/**
		 * Me.
		 */
		var svc = {};

		/**
		 * Service properties.
		 */
		svc.cars = [];
		svc.car = {};

		/**
		 * Service methods.
		 */
		svc.getAll = getAll;
		svc.get = get;
		svc.persist = persist;
		svc.remove = remove;

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
				svc.cars.forEach(function(car) {
					car.id = md5.createHash(car.placa);
				})
				defer.resolve(svc.cars);
			}, function(res) { console.log(res); defer.reject(res) });

			return defer.promise;
		}

		function get(id) {

			var defer = $q.defer();

			var cars = svc.cars.filter(function(car) {
				return car.id == id;
			});

			if (cars.length) {
				svc.car = cars[0];
			}

			defer.resolve(svc.car);
			return defer.promise;
		}

		function persist(car) {

			if ( ! car.hasOwnProperty('id')) {
				return add(car);
			} else {
				return update(car);
			}
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
			 * purposes the application will ADD the item to the reference array
			 * and continue without persist this state.
			 */
			svc.cars.push(car);
			var asyncRes = {
				status: true,
				message: 'Veículo adicionado à frota com sucesso!'
			}

			defer.resolve(asyncRes)
			return defer.promise;
		}

		function update(car) {

			var defer = $q.defer(),
				validation = validate(car);

			if ( ! validation.status) {
				defer.reject(validation.error);
				return defer.promise;
			}

			/**
			 * Here should be the $http or equivalent integration. Only for test
			 * purposes the application will UPDATE the item to the reference array
			 * and continue without persist this state.
			 */
			 /* do nothing, already updated at reference array */
			var asyncRes = {
				status: true,
				message: 'Veículo atualizado com sucesso!'
			}

			defer.resolve(asyncRes)
			return defer.promise;
		}

		function remove(car) {

			var defer = $q.defer(),
				_carIndex = svc.cars.indexOf(car);

			/**
			 * Here should be the $http or equivalent integration. Only for test
			 * purposes the application will REMOVE the item from the reference array
			 * and continue without persist this state.
			 */
			svc.cars.splice(_carIndex, 1);
			var asyncRes = {
				status: true,
				message: 'Veículo removido com sucesso!'
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
