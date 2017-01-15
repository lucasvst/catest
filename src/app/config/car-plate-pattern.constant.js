(function(angular) {
	'use strict';

	var CAR_PLATE_PATTERN = /^(\w\w\w)-?(\d\d\d\d)$/;

	angular.module('app').constant('CAR_PLATE_PATTERN', CAR_PLATE_PATTERN);

})(angular);
