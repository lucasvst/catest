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
				items: '=',
				showImage: '=',
			},

			link: function($scope, elem, attrs) {

				$scope.filteredItems = $scope.items;
				$scope.list = { selectAll: false }
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

				$scope.$watch('filter', changeFilter);
				function changeFilter(value) {
					$scope.filteredItems = $filter("carFilter")($scope.items, $scope.filter);
				}

				$scope.toggleCheckboxes = toggleCheckboxes;
				function toggleCheckboxes(selectAll) {
					$scope.filteredItems.forEach(function(item) {
						item.selected = selectAll;
					})
				}

				$scope.$watch('filteredItems', toggleSelectAll, true);
				function toggleSelectAll() {
					var count = $scope.filteredItems.filter(function(item) {
							return item.selected;
						}).length,
						isAllChecked = count == $scope.filteredItems.length;

					$scope.list.selectAll = isAllChecked;
				}
			}
		};
	}

})(window.angular);
