(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var css = "html{font-size:1em;font-family:sans-serif}html{background-color:#fafafa}body{min-width:5em;max-width:40em;margin:3em 1em}main{margin-top:2em;background-color:#fff;padding:1em 1.5em;border-radius:3px;box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}form{position:relative;padding:2em 2.5em}img{width:100%}@media all and (min-width:42em){body{margin:3em auto}}a,a:focus,a:visited{color:#3f3f3f;text-decoration:none}[type=checkbox]{position:absolute;left:999999px;visibility:hidden;display:none}[type=checkbox]+label{display:inline-block;color:#9f9f9f}[type=checkbox]+label:not(:first-of-type){margin-left:2em}[type=checkbox]:checked+label{color:#3f3f3f}.building{display:block;font-size:1.6em;background-color:#fff;padding:1em 2em;transition:all .2s ease-in}.building:focus,.building:hover{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);transform:scale(1.05)}.no-padding{padding:0}"; (require("browserify-css").createStyle(css, { "href": "dist/style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":2}],2:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
require('../dist/style.css');

var filterBuildings = require('./filterBuildings');

},{"../dist/style.css":1,"./filterBuildings":3}]},{},[4]);
