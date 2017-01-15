(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('ForwardAgent', ForwardAgent);

	ForwardAgent.$inject = [];

	function ForwardAgent() {

		/**
		 * Me.
		 */
		var svc = {};

		/**
		 * Service methods.
		 */
		svc.normalizeCarPlate = normalizeCarPlate;

		/**
		 * Public functions (exposed by methods).
		 */
		function normalizeCarPlate(_string) {

			var PATTERN = /^(\w\w\w)-?(\d\d\d\d)$/,
				parts = PATTERN.exec(_string);

			return parts[1] + '-' + parts[2];
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
