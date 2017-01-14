(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('CarController', CarController);

	CarController.$inject = ['GarageService', 'ModalService'];

	function CarController(GarageService, ModalService) {

		/**
		 * Me.
		 */
		var vm = this;

		/**
		 * Controller properties.
		 */
		vm.cars = GarageService.cars;
		vm.carFilter;

		/**
		 * Controller methods.
		 */
		vm.setCarFilter = setCarFilter;
		vm.add = addCar;

		/**
		 * Public functions (exposed by methods).
		 */
		function setCarFilter(query) {
			vm.carFilter = query;
		}

		function addCar(car) {
			GarageService.add(car).then(successAddCbk, errorAddCbk);
		}

		/**
		 * Private functions (not exposed).
		 */
		function successAddCbk(res) {
			ModalService.open({
				title: 'Sucesso!',
				message: res.message,
			})
		}

		function errorAddCbk(res) {
			ModalService.open({
				title: 'Erro!',
				message: res.message,
			})
		}

		/**
		 * Init.
		 */
		GarageService.getAll();
	}

})(window.angular);
