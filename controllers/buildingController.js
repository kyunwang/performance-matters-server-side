var request = require('request');

var modifyData = require('../data/modifyData');

exports.homePage = function (req, res) {
// Check whether the session.data contains data (is not expired yet)
	if (req.session.data) {
	// res.send('Got the data right here');
		res.render('home', {
			data: req.session.data,
			filterKeys: req.session.filterKeys
		});
	} else {
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
			var cleanedData = modifyData.cleanData(jsonData);
			var keys = cleanedData.results.bindings.map(item => item.type.value);

			req.session.data = modifyData.groupItems(cleanedData.results.bindings);
			req.session.filterKeys = keys.filter((d, i, self) => i === self.indexOf(d));

			// [req.session.data, res.session.filterKeys] = Promise.all([
			// 	promiseGrouping,
			// 	promiseFilterKeys
			// ])

			res.render('home', {
				data: req.session.data,
				filterKeys: req.session.filterKeys
			});
		});
	}
}

exports.detailPage = function (req, res) {
	var buildingName = req.params.name;
	var building = req.session.data.filter(function (building) {
		return building.itemLabel.value === buildingName;
	})
	//  if (!building) {
	//  res.render('404');
	//  }

	res.render('details', {
		building: building[0]
	})
}

exports.getBuildingsByKey = function (req, res) {
	var data = req.session.data.filter(function (item) {
		return req.body.key.includes(item.type.value);
	});

	res.render('home', {
		data: data,
		filterKeys: req.session.filterKeys
	});
}
