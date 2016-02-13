(function () {
	'use strict';

	class HomeCtrl {
		constructor($http) {
			let vm = this;
			vm.ctrlName = 'HomeCtrl';
			Date.prototype.getJulian = function() {
				return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
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
			var dateRange='daterange:'+(julian-30)+'-'+julian;

			var queries = {};
			for(var x = 0; x < locations.length;x++){
				for(var y = 0; y < bands.length; y++){
					queries[bands[y]] = [];
					for(var z = 0; z < venues.length;z++){
						var query = '&q=location:'+encodeURIComponent(locations[x]?locations[x]:'')+' '+dateRange+' %22'+encodeURIComponent(bands[z]?bands[z]:'')+ '%22 %22'+ encodeURIComponent(venues[y]?venues[y]:'')+'%22';

						console.log(bands[z] && venues[y] && locations[x] ? query : 'something missing');

						var req = {
							method: 'POST',
							url: 'https://query.stamplayapp.com/api/codeblock/v1/run/gsearch',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							data: { query: bands[z] && venues[y] && locations[x] ? query : 'something missing' }
						};
						$http(req).then(function(success){console.log(success)}, function(error){error});

					}
				}
			}
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
