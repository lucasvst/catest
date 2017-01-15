(function(angular) {
	'use strict';

	angular
	.module('app')
	.directive('carList', carList)

	carList.$inject = ['$filter'];

	function carList($filter) {

		return {

			restrict: 'E',
			templateUrl: '/views/directives/car-list.html',
			scope: {
				filter: '=',
				items: '=',
				remove: '=',
				update: '=',
				image: '='
			},

			link: function($scope, elem, attrs) {

				$scope.filteredItems = $scope.items;
				$scope.config = {
					itemsPerPage: 5,
					fillLastPage: false,
					maxPages: 5,
					paginatorLabels: {
						first: "‹‹‹",
						last: "›››",
						jumpAhead: "››",
						jumpBack: "‹‹",
						stepAhead: "›",
						stepBack: "‹",
					}
				}
			},

			controller: function($scope) {

				$scope.$watch('filter', changeFilter)

				function changeFilter(value) {
					$scope.filteredItems = $filter("carFilter")($scope.items, $scope.filter);
				}
			}
		};
	}

})(window.angular);
