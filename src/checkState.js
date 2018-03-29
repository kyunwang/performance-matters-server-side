var buildingList = document.getElementsByClassName('building');

// function isCached (img_url) {
// 	var imgEle = document.createElement('img');
// 	imgEle.src = img_url;
// 	return imgEle.complete || (imgEle.width + imgEle.height) > 0;
// }

// function checkBuildings () {
// 	// var image = new Image();
// 	// image.src = src;

// 	// return image.complete;
// 	for (var i = 0; i < buildingList.length; i++) {
// 		console.log(buildingList[i]);
// 	}
// }

if (navigator.onLine) {
} else {
	var offlineNotice = document.getElementsByClassName('offline')[0];
	offlineNotice.classList.remove('hidden');
	// console.log('offline');
}
