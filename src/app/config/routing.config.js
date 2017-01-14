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
						templateUrl: 'views/car/main.html',
						controller: 'CarController as carCtrl',

					},
					'navbar@home': { templateUrl: 'views/common/navbar.html' }
				},
			})
			.state('add', {
				url:'/novo',
				views: {
					'': {
						templateUrl: 'views/car/add.html',
						controller: 'CarController as carCtrl',

					},
					'navbar@add': { templateUrl: 'views/common/navbar.html' }
				},
			})
	}
})(window.angular);