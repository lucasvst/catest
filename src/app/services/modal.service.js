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
		svc.modal = {};

		/**
		 * Service methods.
		 */
		svc.open = open;
		svc.close = close;

		/**
		 * Public functions (exposed by methods).
		 */
		function open(modal) {

			angular.extend(svc.modal, modal);

			svc.modal.instance = $uibModal.open({
				animation: false,
				templateUrl: '/views/common/modal.html',
				backdrop: false,
				controller: 'ModalController as modalCtrl'
			});
		}

		function close() {

			svc.modal.instance.close();

			if (svc.modal.afterClose) {
				svc.modal.afterClose()
			}

			init();
		}

		/**
		 * Private functions (not exposed).
		 */
		function init() {
			svc.modal = {
				instance: undefined,
				title: '',
				message: '',
				status: 'info',
				afterClose: undefined
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
