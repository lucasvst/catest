(function(angular) {
	"use strict";

	angular
		.module('app')
		.controller('ListController', ListController);

	ListController.$inject = ['GarageService', 'ModalService', '$state'];

	function ListController(GarageService, ModalService, $state) {

		/**
		 * Me.
		 */
		var vm = this;

		/**
		 * Controller properties.
		 */
		vm.cars = GarageService.cars;
		vm.carFilter;

		/**
		 * Controller methods.
		 */
		vm.setCarFilter = setCarFilter;
		vm.remove = remove;
		vm.update = update;
		vm.showImage = showImage;
		vm.selectedItemsCount = selectedItemsCount;

		/**
		 * Public functions (exposed by methods).
		 */
		function setCarFilter(query) {
			vm.carFilter = query;
		}

		function remove() {
			GarageService.remove(selectedItems()).then(successRemoveCbk, errorRemoveCbk);

		}

		function update() {
			$state.go('update', { id: selectedItems()[0].id })
		}

		function showImage(car) {
			ModalService.open({
				title: car.modelo,
				image: car.imagem
			})
		}

		function selectedItemsCount() {
			return selectedItems().length;
		}

		/**
		 * Private functions (not exposed).
		 */
		function successRemoveCbk(res) {
			ModalService.open({
				title: 'Sucesso!',
				message: res.message,
				afterClose: function() {
					$state.go('home');
				}
			})
		}

		function errorRemoveCbk(res) {
			ModalService.open({
				title: 'Erro!',
				message: res.message,
			})
		}

		function selectedItems() {
			return vm.cars.filter(function(car) {
				return car.selected;
			})
		}

		GarageService.getAll();
	}

})(window.angular);
