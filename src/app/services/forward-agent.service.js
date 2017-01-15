(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('ForwardAgent', ForwardAgent);

	ForwardAgent.$inject = ['CAR_PLATE_PATTERN'];

	function ForwardAgent(CAR_PLATE_PATTERN) {

		/**
		 * Me.
		 */
		var svc = {};

		/**
		 * Service methods.
		 */
		svc.toApi = toApi;
		svc.toView = toView;

		/**
		 * Public functions (exposed by methods).
		 */
		function toApi(_string) {

			var PATTERN = CAR_PLATE_PATTERN,
				parts = PATTERN.exec(_string);

			return parts[1] + '-' + parts[2];
		}

		function toView(_string) {

			var PATTERN = CAR_PLATE_PATTERN,
				parts = PATTERN.exec(_string);

			return parts[1] + parts[2];
		}

		/**
		 * Return me.
		 *
		 * angular.factory gives the return of function,
		 * instead a NEW instance, like angular.service.
		 */
		return svc;
	}

})(window.angular);
