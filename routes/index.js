var router = require('express').Router();
var request = require('request');

var helpers = require('../helpers');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
// 	console.log('Time: ', Date.now())
// 	next()
// })

// define the home page route
router.get('/', function (req, res) {
	// Check whether the session.data contains data (is not expired yet)
	if (req.session.data) {
		res.send('Got the data right here');
	} else {
		console.log(req.session.data);

		var query = `
			SELECT ?item ?itemLabel ?image ?coordinate_location ?type WHERE {
			SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],nl". }
				{  
					?item wdt:P31 wd:Q32815 .
					?item wdt:P131 wd:Q9899 .
					BIND('mosque' AS ?type) .
					OPTIONAL {
						?item wdt:P18 ?image .
						?item wdt:P625 ?coordinate_location .
					}
				} UNION {
					?item wdt:P31 wd:Q16970 .
					?item wdt:P131 wd:Q9899 .
					BIND('church' AS ?type) .
					OPTIONAL {
						?item wdt:P18 ?image .
						?item wdt:P625 ?coordinate_location .
					}
				} UNION {
					?item wdt:P31 wd:Q697295 .
					?item wdt:P131 wd:Q9899 .
					BIND('shrine' AS ?type) .
					OPTIONAL {
						?item wdt:P18 ?image .
						?item wdt:P625 ?coordinate_location .
					}
				} UNION {
					?item wdt:P31 wd:Q44539 .
					?item wdt:P131 wd:Q9899 .
					BIND('temple' AS ?type) .
					OPTIONAL {
						?item wdt:P18 ?image .
						?item wdt:P625 ?coordinate_location .
					}
				} UNION {
					?item wdt:P31 wd:Q44613 .
					?item wdt:P131 wd:Q9899 .
					BIND('monastery' AS ?type) .
					OPTIONAL {
						?item wdt:P18 ?image .
						?item wdt:P625 ?coordinate_location .
					}
				} UNION {
					?item wdt:P31 wd:Q34627 .
					?item wdt:P131 wd:Q9899 .
					BIND('synagogue' AS ?type) .
					OPTIONAL {
						?item wdt:P18 ?image .
						?item wdt:P625 ?coordinate_location .
					}
				}
			}`
		var endpointUrl = 'https://query.wikidata.org/sparql';
		var headers = { 'Accept': 'application/sparql-results+json' };
		var fullUrl = endpointUrl + '?query=' + encodeURIComponent(query);

		var options = {
			url: fullUrl,
			headers: headers
		};

		request(options, function (err, response, body) {
			if (err) {
				// Return a error template
				return err;
			}

			var jsonData = JSON.parse(body);
			var test = helpers.cleanData(jsonData);
			req.session.data = helpers.groupItems(test.results.bindings);

			res.json(req.session.data);
		});
	}
})

module.exports = router;
