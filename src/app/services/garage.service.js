(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('GarageService', GarageService);

	GarageService.$inject = ['ApiService', 'ForwardAgent', '$q', 'md5'];

	function GarageService(ApiService, ForwardAgent, $q, md5) {

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
		svc.resetCar = resetCar;

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

			var defer = $q.defer(),
				existentCar = getById(id, svc.cars);

			if (existentCar) {
				svc.car = angular.copy(existentCar);
			}

			defer.resolve(svc.car);
			return defer.promise;
		}

		function persist(car) {

			var validation = validate(car);

			if ( ! validation.status) {
				var defer = $q.defer();
				defer.reject(validation);
				return defer.promise;
			}

			if ( ! car.hasOwnProperty('id')) {
				return add(car);
			} else {
				return update(car);
			}
		}

		function add(car) {

			var defer = $q.defer();

			car.placa = ForwardAgent.toApi(car.placa);
			car.id = md5.createHash(car.placa);

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
				existent = getById(car.id, svc.cars);

			angular.extend(existent, car)

			/**
			 * Here should be the $http or equivalent integration. Only for test
			 * purposes the application will UPDATE the item to the reference array
			 * and continue without persist this state.
			 */
			var asyncRes = {
				status: true,
				message: 'Veículo atualizado com sucesso!'
			}

			defer.resolve(asyncRes)
			return defer.promise;
		}

		function remove(cars) {

			var defer = $q.defer(),
				_length = svc.cars.length;

			/**
			 * Here should be the $http or equivalent integration. Only for test
			 * purposes the application will REMOVE the item from the reference array
			 * and continue without persist this state.
			 */
			for (var i = _length - 1; i >= 0; i--) {
				if (cars.indexOf(svc.cars[i]) > -1) {
					svc.cars.splice(i, 1);
				}
			}
			var asyncRes = {
				status: true,
				message: 'Veículo removido com sucesso!'
			}

			defer.resolve(asyncRes)
			return defer.promise;
		}

		function resetCar() {
			svc.car = {};
		}

		/**
		 * Private functions (not exposed).
		 */
		function validate(car) {

			var validation = {
				status: true
			};

			/**
			 * Validate Car Plate.
			 */
			var carPlateIsValid = ForwardAgent.validate(car.placa);
			if ( ! carPlateIsValid) {
				validation.status = false;
				validation.message = 'Formato de Placa Inválida!';
			}

			return validation;
		}

		function getById(id, cars) {
			var existent = cars.filter(function(car) {
				return car.id == id;
			});
			if (existent.length) {
				return existent[0];
			}
			return null;
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
