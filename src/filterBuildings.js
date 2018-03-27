var buildingList = document.getElementsByClassName('building');
var filterLabels = document.getElementsByName('key');

// Object to contain the filterstates
var activeFilters = {};

for (var index = 0; index < filterLabels.length; index++) {
	// Setting the initials filter states
	activeFilters[filterLabels[index].value] = filterLabels[index].checked;

	filterLabels[index].addEventListener('click', function () {
		// Change the filterstate on click and filter the buildings
		activeFilters[this.value] = this.checked;
		filterBuildings();
	});
}

function filterBuildings () {
	for (var indexB = 0; indexB < buildingList.length; indexB++) {
		var buildingType = buildingList[indexB].dataset.type;
		var building = buildingList[indexB];

		if (activeFilters[buildingType]) {
			// Not using classlist for support atm
			building.style.display = 'block';
		} else {
			building.style.display = 'none';
		}
	}
}

module.exports = filterBuildings;
