(function () {
	'use strict';

	class HomeCtrl {
		constructor($http, $sce, Data) {
			let vm = this;
			vm.db = Data;
			vm.data = {};
			vm.trustSrc = function (src) {
				console.log('trust src', src);
				return $sce.trustAsResourceUrl(src);
			};
			function browserQuery(query, band) {
				var parsedResult = {};
				var context = {};
				context.data = {};

				// context.data.key = 'AIzaSyAPQoU5zkFq3_sP3fB-v_V-mUhTspAU1bc';


				context.data.key = 'AIzaSyBL3VFlBRvdgmTeTQ_yr_E76RtNrtJn--k';
				context.data.cx = encodeURIComponent('009026615269609811859:gj09_ghhxea');


				var baseUrl = 'https://www.googleapis.com/customsearch/v1';
				// var query = context.data.query;
				var queryDebug = '&q=location:new%20york%20city daterange:2457403-2457433 %22Aventura%20%26%20Romeo%20Santos%22 %22bowery%20ballroom%22';
				var auth = '?key=' + context.data.key + '&cx=' + context.data.cx;
				var authQuery = auth + '&q=' + query;
				var authQueryDebug = auth + queryDebug;
				// console.log(query);
				var links = [];
				var req = {
					method: 'GET',
					url: baseUrl + authQuery,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
					// data: { query: bands[z] && venues[y] && locations[x] ? query : 'something missing' }
				};
				$http(req).then(function (success) {
					console.log(success);
					vm.data[band] ? null : vm.data[band] = [];
					vm.data[band].push(success.data);
				}, function (error) {
					console.error(error);
				});
			}

			vm.ctrlName = 'HomeCtrl';
			Date.prototype.getJulian = function () {
				return Math.floor(this / 86400000 - this.getTimezoneOffset() / 1440 + 2440587.5);
			};
			var locations = ['new york city'];
			var venues = ['bowery ballroom', 'cake shop', 'united palace theatre'];
			var bands = ['the hairs', 'Aventura & Romeo Santos'];

			var today = new Date(); //set any date
			var julian = today.getJulian();
			// var auth = '?key='+context.data.key+'&cx='+context.data.cx;

			//var location = 'new york city';
			//var band = 'Aventura & Romeo Santos';
			//var venue = 'United Palace Theatre';
			var dateRange = 'daterange:' + (julian - 30) + '-' + julian;

			var queries = {};
			for (var x = 0; x < locations.length; x++) {
				for (var y = 0; y < bands.length; y++) {
					queries[bands[y]] = [];
					for (var z = 0; z < venues.length; z++) {
						//var rawQuery = '&q=location:' + (locations[x] ? locations[x] : '') + ' ' + dateRange + ' %22' + (bands[z] ? bands[z] : '') + '%22 %22' + (venues[y] ? venues[y] : '') + '%22';
						var rawQuery = 'location:' + (locations[x] ? locations[x] : '') + ' ' + dateRange + ' "' + (bands[z] ? bands[z] : '') + '" "' + (venues[y] ? venues[y] : '') + '"';
						var query = encodeURIComponent(rawQuery);
						console.log(bands[z] && venues[y] && locations[x] ? query : 'something missing');
						browserQuery(query, bands[z]);

					}
				}
			}
			setTimeout(function () {
				let time = Date.now();
				vm.db.fb[time] = JSON.stringify(vm.data);
				vm.db.fb.$save();
				console.info(vm.db.fb);
			}, 10000);
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
