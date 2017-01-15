(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('ListController', ListController);

	ListController.$inject = ['GarageService'];

	function ListController(GarageService) {

		/**
		 * Me.
		 */
		var vm = this;

		/**
		 * Controller properties.
		 */
		// vm.car = car;
		vm.cars = GarageService.cars;
		vm.carFilter;

		/**
		 * Controller methods.
		 */
		vm.setCarFilter = setCarFilter;

		/**
		 * Public functions (exposed by methods).
		 */
		function setCarFilter(query) {
			vm.carFilter = query;
		}

		GarageService.getAll();
	}

})(window.angular);
