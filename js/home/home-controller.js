'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	'use strict';

	var HomeCtrl = function HomeCtrl(Data, Api, State) {
		_classCallCheck(this, HomeCtrl);

		var vm = this;
		vm.data = Data;
		vm.state = State;
		vm.api = Api;

		vm.ctrlName = 'HomeCtrl';
	}

	/**
  * @ngdoc object
  * @name home.controller:HomeCtrl
  *
  * @description
  *
  */
	;

	angular.module('home').controller('HomeCtrl', HomeCtrl);
})();
//# sourceMappingURL=home-controller.js.map
