(function(angular) {
	'use strict';

	angular
	.module('app')
	.directive('carForm', carForm)

	carForm.$inject = ['FUEL_LIST'];

	function carForm(FUEL_LIST) {

		return {

			restrict: 'E',
			templateUrl: 'views/directives/car-form.html',
			scope: {
				item: '=',
			},

			link: function($scope, elem, attrs) {
				$scope.fuelList = FUEL_LIST;
			},

			controller: 'CarController as carCtrl'
		};
	}

})(window.angular);
