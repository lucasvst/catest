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
		vm.carsSelected = [];

		/**
		 * Controller methods.
		 */
		vm.setCarFilter = setCarFilter;
		vm.remove = remove;
		vm.update = update;
		vm.showImage = showImage;
		vm.toggleItems = toggleItems;

		/**
		 * Public functions (exposed by methods).
		 */
		function setCarFilter(query) {
			vm.carFilter = query;
		}

		function remove(cars) {
			GarageService.remove(cars).then(successRemoveCbk, errorRemoveCbk);

		}

		function update(car) {
			$state.go('update', { id: car.id })
		}

		function showImage(car) {
			ModalService.open({
				title: car.modelo,
				image: car.imagem
			})
		}

		function toggleItems(car) {
			var _carIndex = vm.carsSelected.indexOf(car);

			if (_carIndex >= 0) {
				vm.carsSelected.splice(_carIndex, 1);
				return;
			}

			vm.carsSelected.push(car);
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

		GarageService.getAll();
	}

})(window.angular);
