(function(angular) {
	"use strict";
	angular
		.module('app')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', defineRoutes]);

	function defineRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
			}).hashPrefix('!');

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url:'/',
				views: {
					'': {
						templateUrl: 'views/home/main.html',
						controller: 'CarController as carCtrl',

					},
					'navbar@home': { templateUrl: 'views/common/navbar.html' }
				},
			})
	}
})(window.angular);