# Religious Buildings in Amsterdam - (Server rendered)

This is a server-side version focused on the core functions based on [this repo](https://github.com/kyunwang/Religious-Buildings-Amsterdam)

As you can see in the demo(the gif) a simple list will be shown with various religious buildings in Amsterdam. You can filter and see some details about the building.

The goal of this project is to server-side render the application while focussing on the core functionality. The repo linked above is fully client-side which is somewhat slower than server-side rendered applications. This server-side rendered application should be faster than the client-side rendered one.

**Time for this project:** 2 days (from a week) + small adjustments

This repo makes use of:
- Browserify (bundling)
- Pug (templating)
- Express.js
- A service worker

![Demo][rba-demo]

*Note: Trying to use only ES5. Template literals will be used instead of cancatenating*

## Table of Contents
- [Getting Started](#getting-started)
- [Building](#building)
- [Tooling](#tooling)
- [Audit](#audit)
	- [Setting & Tools](#settings-&-tools)
	- [Browser](#browser)
	- [Tools](#tools)
- [Optimalisation](#optimalisation)
	- [First snapshot](#first-snapshot)
	- [Inject CSS](#inject-css)
	- [Compression](#compression)
	- [Final Result](#final-result)
- [Service Worker](#service-worker)
	- [Job story](#job-story)
	- [Impact](#impact)
	- [Online](#online)
	- [Offline](#offline)
	- [Conclusion](#conclusion)
- [To do](#to-do)

## Getting started

If you want to work on this project, follow these steps:
1. First we clone (fork if you want) the repo.
	Run `git clone https://github.com/kyunwang/performance-matters-server-side.git` in your terminal
2. `cd` to the repo and run `npm install` to install the dependencies
3. Run `npm start` to run the server
4. Go to `http://localhost:3500/`
5. Have fun!

## Building
To build the project you have to follow the steps from **[Getting Started](#getting-started)** first.
The now you can build it by running: `npm run build` you will get the bundled and minified/uglified javascript.

*Note*: Running `npm run watch` will also bundle the javascript, but will not minify.


## Tooling
The tools for this project is:
- Browserify - (with its plugins) - for our JS bundling
- NPM scripts: for requiring JS modules client-side
- CommonJS: to run our browserify who bundles our JS which uses CommonJS

### Bundling Tools
The tools used for bundling:
- [browserify-css](https://github.com/cheton/browserify-css)
- [uglify-js](https://github.com/mishoo/UglifyJS2)

## Audit
The audits will be based on the *Homepage*

### Settings & Tools
The settings and tools used for the audit.

- Disable cache 
- Throttle: 3G Slow
#### Browser
- Google Chrome
- (maybe firefox quantum / safari)

#### Tools
- Google Chrome Devtools
	- Network
	- Timeline
	- Audits

## Optimalisation

1. The bundling of Javascript and minifying it. Using `uglify-js` (First audit)
2. Using the `compression` package
3. Minify css

### First snapshot
The first snapshot is made after bundling the JS with `Browserify`

**Stats:**

Network tab
- 3 Requests
- 14.7 KB Transferred
- Finish: 4.26s
- DOMContentLoaded: 4.27s
- Load: 4.26s

- First paint happens around 1200ms.
- First and Consistently Interactive 1220ms


![before summary][b-sum]
![before performance][b-perf]


### Inject CSS
Injecting CSS and minifying with `browserify-css` into the head tag

Network tab
- 2 Requests
- 17.1 KB Transferred
- Finish: 4.32s
- DOMContentLoaded: 4.34s
- Load: 4.34s

- First paint happens around 670ms.
- First and Consistently Interactive 1360ms

**Notes**
- The performance point dropped from 100 to 99.
- The first paint time almost decreased by a half
- 140 ms increase in First interactive
- A relatively high increase in transferred kb

I still think it is worth the cost because of the decrease in the first meaningful paint.

### Compression

Network tab
- 3 Requests
- 4.3 KB Transferred
- Finish: 4.10s
- DOMContentLoaded: 4.10s
- Load: 4.10s

- First paint happens around 1210ms.
- First and Consistently Interactive 1220ms

**Notes**
- The first paint time had a minimal increase of 10ms
- The total transferred kb decreased significantly from 17.1kb to 4.3kb

### Async & Defer
Added `async` and `defer` to the import of `bundle.js`



### Final result
This is the result of all the optimalisations together.

Network tab
- 2 Requests
- 8.0 KB Transferred
- Finish: 4.16s
- DOMContentLoaded: 2.07s
- Load: 4.16s

- First paint happens around 640ms.
- First and Consistently Interactive 1330ms

![after summary][a-sum]
![after performance][a-perf]

**Conclusion**
At last there seems to be a increase in the first and consitently interactive state. The first meaningfull paint did improve a lot. Because of the injected CSS there is a increase of KB transferred but also a decrease in the first meaninfull paint.


*Note: Not a lot optimalisation due to time contrains.*

### To look into
What else can you do to optimize:
- Spend more time for critical CSS
- Maybe lazy load the content (is that possible throught the server?)

## Service worker
We will be implementing a service worker for at least the following:
- Caching static assets and serve them
- Give feedback to the user wether they are online or not

Extra:
- Cache the homepage
- Be able to cache visited detail pages

### Job story

Template: *When ____, I want to ____, So I can ____*

**Job story**
When I am visiting Amsterdam, I want to visit religious buildings without using too much data, So I can quickly and cheaply visit the places I wan to go to.

### Impact
The impact that the service worker has/might bring.

**These audits are made after the caching.**

#### Online
Network tab
- 3 Requests
- 4.8 KB Transferred
- Finish: 107ms
- DOMContentLoaded: 106ms
- Load: 114ms

- First paint happens around 650ms.
- First and Consistently Interactive 650ms

#### Offline
Network tab
- 3 Requests
- 0 KB Transferred
- Finish: 34ms
- DOMContentLoaded: 27ms
- Load: 37ms

#### Conclusion
The service worker really did speed up the page loads (after the first caching) by a huge margin.

Offline it is even quicker and it is certainly worth it to implement a service worker.


## To do
- [ ] Add a static map using google maps in the detail page
- [ ] Fix some styling



[express-base]: https://github.com/cmda-minor-web/performance-matters-bootstrap/blob/master/examples/simple-server/server.js

[b-perf]: https://github.com/kyunwang/performance-matters-server-side/blob/master/doc/b-perf.png
[b-sum]: https://github.com/kyunwang/performance-matters-server-side/blob/master/doc/b-sum.png

[a-perf]: https://github.com/kyunwang/performance-matters-server-side/blob/master/doc/a-perf.png
[a-sum]: https://github.com/kyunwang/performance-matters-server-side/blob/master/doc/a-sum.png

[rba-demo]: https://github.com/kyunwang/performance-matters-server-side/blob/master/doc/rba-demo.gif