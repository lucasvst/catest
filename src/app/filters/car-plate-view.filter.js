(function(angular) {
	"use strict";

	angular
	.module("app")
	.filter('carPlateView', carPlateView);

	carPlateView.$inject = ['ForwardAgent'];

	function carPlateView (ForwardAgent) {
		return function(input) {

			return ForwardAgent.toView(input);
		};
	}

})(window.angular);
