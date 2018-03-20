# performance-matters-server-side

Try to use only ES5 (will use template literals somethimes cus..... dang concatenation)

## Table of Contents

### Getting started

If you want to work on this project, follow these steps:
1. First we clone (fork if you want) the repo.
	Run `git clone https://github.com/kyunwang/performance-matters-server-side.git` in your terminal
2. `cd` to the repo and run `npm install` to install the dependencies
3. Run `npm start` to run the server
4. Go to `http://localhost:3500/`
5. Have fun!

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
- Filter on specific buildings
- Get buildings between a specific time of from a specific time
- Get details from building

BTW: the data is not super accurate as the data comes from wikidata where everybody can add data as they want to.
And The build and demolish years, I hard coded in it.


## 

Add older script from client side version a.k.a. the helpers and made the query to the sparql/wikidata endpoint

Todo: clean helpers and check what is needed. Know more....


## Todo



[express-base]: https://github.com/cmda-minor-web/performance-matters-bootstrap/blob/master/examples/simple-server/server.js
