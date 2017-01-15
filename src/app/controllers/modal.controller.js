(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['ModalService'];

	function ModalController(ModalService) {

		/**
		 * Me.
		 */
		var vm = this;

		/**
		 * Controller properties.
		 */
		vm.title = ModalService.modal.title;
		vm.message = ModalService.modal.message;
		vm.image = ModalService.modal.image;

		/**
		 * Controller methods.
		 */
		vm.close = ModalService.close;
	}

})(window.angular);
