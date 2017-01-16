(function(angular) {
	"use strict";
	angular
		.module('app')
		.config(defineRoutes);

	defineRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function defineRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: true
			}).hashPrefix('!');

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url:'/',
				views: {
					'': {
						templateUrl: 'views/car/list.html',
						controller: 'ListController as listCtrl',

					},
					'navbar@home': { templateUrl: 'views/common/navbar.html' }
				}
			})
			.state('add', {
				url:'/novo',
				views: {
					'': {
						templateUrl: 'views/car/add.html',
						controller: 'FormController as formCtrl',

					},
					'navbar@add': { templateUrl: 'views/common/navbar.html' }
				}
			})
			.state('update', {
				url:'/editar/:id',
				views: {
					'': {
						templateUrl: 'views/car/add.html',
						controller: 'FormController as formCtrl',

					},
					'navbar@update': { templateUrl: 'views/common/navbar.html' }
				}
			})
	}
})(window.angular);