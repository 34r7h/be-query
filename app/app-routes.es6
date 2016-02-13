(function () {
	'use strict';

	angular
		.module('query')
		.config(config);

	function config($urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/search');
			/*$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];*/
	}
}());
