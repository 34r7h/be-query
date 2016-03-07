(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name query.factory:Api
	 *
	 * @description
	 *
	 */
	angular
		.module('query')
		.factory('Api', Api);

	function Api($http, $sce, $timeout, Data, State) {
		let ApiBase = {};
		ApiBase.trustSrc = function (src) {
			// console.log('trust src', src);
			return $sce.trustAsResourceUrl(src);
		};
		ApiBase.parseSheet = (sheetId, worksheetCount) => {
			Data.fb.$loaded().then(()=>{
				//!Data.fb.sheetData ? Data.fb.sheetData = {} : null;
				// Data.fb.sheetData[sheetId] = {};
				var sheetFeed = [];
				var sheetJson = [];
				for(var x=0; x < worksheetCount; x++){
					console.log('Parsing sheet', x+1);
					sheetJson[x] = 'https://spreadsheets.google.com/feeds/cells/' + sheetId + '/'+(x+1)+'/public/values?alt=json-in-script&callback=doData';
					console.log(sheetJson[x]);
					((count)=>{
						$http.get(sheetJson[count]).then((success)=>{
							console.log(success.data);
							sheetFeed[count] = success.data.replace('// API callback\ndoData(', '').replace(');', '');
							Data.fb.sheetData[sheetId]['sheet'+count] = sheetFeed[count];
						},(error)=>{
							console.log(error);
						})
					})(x);

				}
				$timeout(()=>{Data.fb.$save();},10000);
				/*!Data.fb.sheetData[sheetId] ? Data.fb.sheetData[sheetId] = {} : null;*/
			});
		};
		// ApiBase.parseSheet('1cTKB4VTRk4-qdOtMkC12JMXdMIlgqTDwu8QruJg-ysc');
		ApiBase.querify = () => {
			Date.prototype.getJulian = function () {
				return Math.floor(this / 86400000 - this.getTimezoneOffset() / 1440 + 2440587.5);
			};
			var cities = ['new york city'];
			var venues = ['Webster Hall', 'PlayStation Theater', 'Gramercy Theatre'];
			var bands = ['Daya', 'Tinashe', 'Nick Carter', 'Killswitch Engage'];

			var today = new Date(); //set any date
			var julian = today.getJulian();
			var dateRange = 'daterange:' + (julian - 30) + '-' + julian;
			var queries = {};
			for (var x = 0; x < cities.length; x++) {
				for (var y = 0; y < bands.length; y++) {
					queries[bands[y]] = [];
					for (var z = 0; z < venues.length; z++) {
						//var rawQuery = '&q=location:' + (locations[x] ? locations[x] : '') + ' ' + dateRange + ' %22' + (bands[z] ? bands[z] : '') + '%22 %22' + (venues[y] ? venues[y] : '') + '%22';
						var rawQuery = 'location:"' + (cities[x] ? cities[x] : '') + '" ' + dateRange + ' "' + (bands[y] ? bands[y] : '') + '" "' + (venues[z] ? venues[z] : '') + '"';
						var query = encodeURIComponent(rawQuery);
						// console.log(bands[y] && venues[z] && cities[x] ? query : 'something missing');
						bands[y] !== undefined ? ApiBase.query(query, bands[y], venues[z], cities[x]) : null;
					}
				}
			}
			let time = Date.now();
			Data.fb.$loaded().then(()=> {
				!Data.fb[State.user.uid].history ? Data.fb[State.user.uid].history = {} : null;
				Data.fb[State.user.uid].history[time] = JSON.stringify(State.data);
				Object.keys(State.data).length > 0 ? Data.fb.$save() : null;
			});
		};
		ApiBase.query = (query, band, venue, city) => {

			var context = {data:{}};
			// context.data.key = 'AIzaSyAPQoU5zkFq3_sP3fB-v_V-mUhTspAU1bc';
			// context.data.key = 'AIzaSyAMQd1zbtPKZMTpH9Mqke2wnLlA1yBEoZU';
			context.data.key = 'AIzaSyD1c_QdWfmsIRw2HFo2LuJsQcMFGeu9BJw';
			// context.data.key = 'AIzaSyCoKhTHvXzcnYBdmwDijkVQ4BmoupX5qdc';
			// context.data.key = 'AIzaSyBL3VFlBRvdgmTeTQ_yr_E76RtNrtJn--k';
			context.data.cx = encodeURIComponent('009026615269609811859:gj09_ghhxea');

			var baseUrl = 'https://www.googleapis.com/customsearch/v1';
			var auth = '?key=' + context.data.key + '&cx=' + context.data.cx;
			var authQuery = auth + '&q=' + query;
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
				(State.data[band] || success.data.queries.request['0'].count === 0) ? null : State.data[band] = [];
				success.data.queries.request['0'].count !== 0 ? State.data[band].push({
					data: success.data,
					venue: venue,
					city: city
				}) : null;
			}, function (error) {
				console.error(error);
			});
		};
		ApiBase.login = (user, pass) => {
			console.info('Login ' + user);
			Data.auth.$authWithPassword({
				email: user,
				password: pass
			}).then(function (auth) {
				console.log("Logged in as:", auth.uid);
				Data.fb.$loaded().then(()=>{!Data.fb[auth.uid] ? (Data.fb[auth.uid] = {created: Date.now()}, Data.fb.$save()) : null});
				State.user = auth;
				Data.history = Data.fb[auth.uid];
			}).catch(function (error) {
				console.error("Authentication failed:", error);
			});
		};
		ApiBase.logout = () => {
			Data.auth.$unauth();
			State.user = null;
		};
		ApiBase.register = (user, pass) => {
			Data.auth.$createUser({
				email: user,
				password: pass
			}).then(function (userData) {
				console.info("User " + userData.uid + " created successfully!");
				Data.fb[userData.uid] = {created: Date.now()};
				Data.fb.$save();
				return Data.auth.$authWithPassword({
					email: user,
					password: pass
				});
			}).then(function (auth) {
				console.info("Logged in as:", auth.uid);
				State.user = auth;
			}).catch(function (error) {
				console.error("Error: ", error);
			});
		};
		return ApiBase;
	}
}());
