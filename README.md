# performance-matters-server-side

Try to use only ES5 (will use template literals somethimes cus..... dang concatenation)

## Table of Contents
- [Getting Started](#getting-started)
- [Building](#building)
- [Tooling](#tooling)
	- [Npm scripts](#scripts)
- [Optimalisation](#optimalisation)
- [Empty as for now](#)

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

### Scripts

These are the script I use a lot.

#### npm start
I used this one before using `Browserify`

`"start": "nodemon server.js"`

This runs the server through `nodemon` which will restart the server on file changes

#### npm run watch
`"watch": "watchify src/index.js --outfile dist/bundle.js & nodemon server.js"`

Watchify will `watch` the given file and output the changes to `dist/bundle.js` on file changes.
#### npm run build
`"build": "browserify src/index.js > dist/bundle.js && uglifyjs dist/bundle.js --compress --output dist/bundle.js"`

Same oll' but now we only `bundle` the JS and `uglify/minify` it without starting a server.

#### npm run pull
`"pull": "git fetch && git pull"`

This guy checked on updated in `origin` and pulls changes from the `origin/<current-branch>`


## Optimalisation

1. The bundling of Javascript and minifying it. Using `uglify-js`
2. Using the `compression` package
3. Minify css


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
Thinking about wha to do and how..... want to use wafs man....

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
