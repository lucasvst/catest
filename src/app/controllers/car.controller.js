(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('CarController', CarController);

	CarController.$inject = ['GarageService'];

	function CarController(GarageService) {

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

		/**
		 * Init.
		 */
		GarageService.getAll();

		/**
		 * Internal functions.
		 */
		function setCarFilter(query) {
			vm.carFilter = query;
		}
	}

})(window.angular);
