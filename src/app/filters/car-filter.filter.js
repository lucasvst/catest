(function(angular) {
	"use strict";

	angular
	.module("app")
	.filter('carFilter', [carFilter]);

	function carFilter () {
		return function(input, string) {

			if ( ! (string))
				return input;

			var output = [],
				_query = string.toLowerCase();

			angular.forEach(input, function(car) {

				if (
					car.marca.toLowerCase().indexOf(_query) >= 0
					||
					car.combustivel.toLowerCase().indexOf(_query) >= 0
				) {
					output.push(car);
				}
			});

			return output;
		};
	}

})(window.angular);
