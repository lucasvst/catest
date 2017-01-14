(function(angular) {
	'use strict';

	angular
	.module('app')
	.directive('carList', carList)

	carList.$inject = ['NgTableParams', 'GarageService'];

	function carList(NgTableParams, GarageService) {

		return {

			restrict: 'E',
			templateUrl: 'views/directives/car-list/main.html',
			scope: {
				cars: '='
			},

			link: function(scope, elem, attrs) {

				scope.tableParams = new NgTableParams({}, {
					counts: [],
					getData: function(params) {
						return GarageService.getAll().then(function(cars) {
							params.total(cars.length);
							return cars;
						});
					}
				});
			}
		};
	}

})(window.angular);
