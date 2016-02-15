module.exports = function(context, cb) {

	var google = require('googleapis');
	var request = require('request');
	var baseUrl = 'https://www.googleapis.com/customsearch/v1';
	console.log(baseUrl);
	var query = context.data.query;
	var auth = '?key='+context.data.key+'&cx='+context.data.cx;
	var authQuery = auth+query;

	request(baseUrl+authQuery,function(error, response, result){
		if(!error){
			console.log(result);
			var parsedResult = JSON.parse(result);
			var links = [];
			if (parsedResult.items.length > 0 ){
				for(var a = 0; a < parsedResult.items.length;a++){
					links.push(parsedResult.items[a].link);
				}
			}
			cb(null, links);
		}
	});
} ;