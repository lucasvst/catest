(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('CarController', CarController);

	CarController.$inject = ['GarageService'];

	function CarController(GarageService) {

		var vm = this;
	}

})(window.angular);
