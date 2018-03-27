# performance-matters-server-side

Trying to use only ES5 (will use template literals somethimes cus..... dang concatenation)

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
	- [](#)
	- [](#)

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
- []()

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





-------- Random stuff below ^^


## Setup server
Ofcourse I need to setup the server first. I did not remember how to do that on top of my hat(head) - You got it? 😏

I used [this][express-base] simple server as a base and also used the `request` package example.




Overview for now

Thinking about what to do....

Creating a setup with packages I think I might need
- nodemon
- express
- pug
- dotenv
- eslint
- body-parser


## Core functionality
Thinking about wha to do and how..... 

Get the core functionality together for now:
- List all buildings
- Get details from building
- Filter on specific buildings

**Extra:**
- Get buildings between a specific time of from a specific time
- Search on name

BTW: the data is not super accurate as the data comes from wikidata where everybody can add data as they want to.
And The build and demolish years, I hard coded in it.


## 

Add older script from client side version a.k.a. the helpers and made the query to the sparql/wikidata endpoint

Todo: clean helpers and check what is needed. Know more....


## Todo
- offline support ?


[express-base]: https://github.com/cmda-minor-web/performance-matters-bootstrap/blob/master/examples/simple-server/server.js

[b-perf]: https://github.com/kyunwang/performance-matters-server-side/blob/master/docs/b-perf.png
[b-sum]: https://github.com/kyunwang/performance-matters-server-side/blob/master/docs/b-sum.png

[a-perf]: https://github.com/kyunwang/performance-matters-server-side/blob/master/docs/a-perf.png
[a-sum]: https://github.com/kyunwang/performance-matters-server-side/blob/master/docs/a-sum.png
[]: s