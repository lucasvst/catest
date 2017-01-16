(function(angular) {
	"use strict";

	angular
	.module("app")
	.filter('dash', [dash]);

	function dash () {
		return function(input) {

			if ( ! input)
				return '-';

			return input;
		};
	}

})(window.angular);
