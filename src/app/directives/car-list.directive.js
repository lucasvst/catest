(function(angular) {
	'use strict';

	angular
	.module('app')
	.directive('carList', carList)

	carList.$inject = ['$filter'];

	function carList($filter) {

		return {

			restrict: 'E',
			templateUrl: 'views/directives/car-list.html',
			scope: {
				filter: '=',
				items: '='
			},

			link: function($scope, elem, attrs) {

				$scope.filteredItems = $scope.items;
			},

			controller: function($scope) {

				$scope.$watch('filter', changeFilter)

				function changeFilter(value) {
					$scope.filteredItems = $filter("filter")($scope.items, $scope.filter);
				}
			}
		};
	}

})(window.angular);
