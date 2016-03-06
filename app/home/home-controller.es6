(function () {
	'use strict';

	class HomeCtrl {
		constructor(Data, Api, State) {
			let vm = this;
			vm.data = Data;
			vm.state = State;
			vm.api = Api;


			vm.ctrlName = 'HomeCtrl';

		}
	}

	/**
	 * @ngdoc object
	 * @name home.controller:HomeCtrl
	 *
	 * @description
	 *
	 */
	angular
		.module('home')
		.controller('HomeCtrl', HomeCtrl);
}());
