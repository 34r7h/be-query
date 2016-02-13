
/**
 * Read here for more information:
 * https://stamplay.com/docs/platform/codeblocks/setup
 *
 * WARNING: your code must stay inside module.exports
 * TEST: Save the code and try it clicking on "Run It Now"
 */
module.exports = function(context, cb) {
	var google = require('googleapis');
	var request = require('request');
	var baseUrl = 'https://www.googleapis.com/customsearch/v1';
	console.log(baseUrl);
	Date.prototype.getJulian = function() {
		return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
	};
	var searchRequest = function (query, bands, y) {
		request(baseUrl+query,function(error, response, result){
			if(!error){
				console.log(result);
				var parsedResult = JSON.parse(result);
				var links = [];
				if (parsedResult.items.length > 0 ){
					for(var a = 0; a < parsedResult.items.length;a++){
						links.push(parsedResult.items[a].link);
					}
				}
				queries[bands[y]].push(links);
				cb(null, queries);

			}
		});
	};
	var locations = ['new york city'];
	var venues = ['bowery ballroom', 'cake shop', 'united palace theatre'];
	var bands = ['the hairs', 'Aventura & Romeo Santos'];

	var today = new Date(); //set any date
	var julian = today.getJulian();
	var auth = '?key='+context.data.key+'&cx='+context.data.cx;

	var dateRange='daterange:'+(julian-30)+'-'+julian;

	var queries = {};
	for(var x = 0; x < locations.length;x++){
		for(var y = 0; y < bands.length; y++){
			queries[bands[y]] = [];
			for(var z = 0; z < venues.length;z++){
				var query = auth+'&q=location:'+encodeURIComponent(locations[x])+' '+dateRange+' %22'+encodeURIComponent(bands[z])+ '%22 %22'+ encodeURIComponent(venues[y])+'%22';
				searchRequest(query, bands, y);
			}
		}
	}
	// var query = auth+'&q=location:'+encodeURIComponent(location)+' '+dateRange+' %22'+encodeURIComponent(band)+ '%22 %22'+ encodeURIComponent(venue)+'%22';
} ;