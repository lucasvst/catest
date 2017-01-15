(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('FormController', FormController);

	FormController.$inject = ['GarageService', 'ModalService', '$state', '$stateParams'];

	function FormController(GarageService, ModalService, $state, $stateParams) {

		/**
		 * Me.
		 */
		var vm = this;

		/**
		 * Controller properties.
		 */
		vm.car = GarageService.car;
		vm.cars = GarageService.cars;

		/**
		 * Controller methods.
		 */
		vm.persist = persist;

		/**
		 * Public functions (exposed by methods).
		 */
		function persist(car) {
			GarageService.persist(car).then(successAddCbk, errorAddCbk);
		}

		/**
		 * Private functions (not exposed).
		 */
		function successAddCbk(res) {
			ModalService.open({
				title: 'Sucesso!',
				message: res.message,
				afterClose: function() {
					$state.go('home');
				}
			})
		}

		function errorAddCbk(res) {
			ModalService.open({
				title: 'Erro!',
				message: res.message,
			})
		}

		GarageService.getAll();
		GarageService.get($stateParams.id);
	}

})(window.angular);
