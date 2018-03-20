var helpers = {
	randomYear (startYear = null) {
		var chance = Math.random();

		if (!startYear) {
			return Math.floor(chance * (2017 - 1600) + 1600);
		}

		if (startYear && chance > 0.6) {
			return Math.floor(chance * (2017 - startYear) + startYear);
		}

		return 2018; // A base year for now (even though they still exist)
	},
	cleanData (data) {
		// Need to refactor this
		data.results.bindings = data.results.bindings.map(item => {
			item.buildYear = helpers.randomYear();
			item.demolishYear = helpers.randomYear(item.buildYear);

			if (!item.coordinate_location) return item;

			// Clean and create usable coordinates
			var coords = item.coordinate_location.value
				.split(' ')

			coords = coords.map((item, i) => {
				return Number(item.replace(/[^0-9\.]+/g, ''));
			})

			var geoTemplate = {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: coords
				},
				properties: {
					title: 'Mapbox',
					description: 'Washington, D.C.'
				}
			};

			item.coordinate_location.value = geoTemplate;

			// this.geojson.features.push(geoTemplate);

			return item;
		});
		return data;
	},
	groupItems (dataArray) {
		// Thanks to https://stackoverflow.com/a/33850667/8525996
		var output = [];

		dataArray.forEach(function (value) {
			var existing = output.filter(function (v, i) {
				if (value.itemLabel && v.itemLabel) {
					return v.itemLabel.value == value.itemLabel.value;
				}
				return false;
			});

			if (value.image) {
				if (existing.length) {
					var existingIndex = output.indexOf(existing[0]);
					output[existingIndex].image.value = output[existingIndex].image.value.concat(value.image.value);
				} else {
					if (typeof value.itemLabel.value === 'string') {
						value.image.value = [value.image.value];
					}
					output.push(value);
				}
			}
		});

		// this.buildingData.results.bindings = output;
		return output;
	}
}

module.exports = helpers;
