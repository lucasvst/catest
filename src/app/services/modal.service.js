(function(angular) {
	"use strict";

	angular
		.module('app')
		.factory('ModalService', ModalService);

	ModalService.$inject = ['$uibModal'];

	function ModalService($uibModal) {

		/**
		 * Me.
		 */
		var svc = {};

		/**
		 * Service properties.
		 */
		svc.modal;

		/**
		 * Service methods.
		 */
		svc.open = open;
		svc.close = close;

		/**
		 * Public functions (exposed by methods).
		 */
		function open(modal) {

			svc.modal.title = modal.title;
			svc.modal.message = modal.message;

			svc.modal.instance = $uibModal.open({
				animation: false,
				templateUrl: 'views/common/modal.html',
				size: 'sm',
				backdrop: false,
				controller: 'ModalController as modalCtrl'
			});
		}

		function close() {

			svc.modal.instance.close();
			init();
		}

		/**
		 * Private functions (not exposed).
		 */
		function init() {
			svc.modal = {
				instance: undefined,
				title: '',
				message: ''
			};
		}

		/**
		 * Main init.
		 */
		init();

		/**
		 * Return me.
		 *
		 * angular.factory gives the return of function,
		 * instead a NEW instance, like angular.service.
		 */
		return svc;
	}

})(window.angular);
