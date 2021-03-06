var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var compression = require('compression');

var path = require('path');

var app = express();

// Can't think of a good name....
var mainRoute = require('./routes');

var helpers = require('./helpers');

// Require the dotenv file
require('dotenv').config({ path: './vars.env' });

// Set views
app.set('view engine', 'pug')
	.set('views', 'views');

// Set static route
app.use('/', express.static(path.join(__dirname, '/dist/'), { maxAge: '31d' }));

app.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(session({
		secret: 'SUPERduper98161SecretForEveryone!!!!',
		resave: false,
		saveUninitialized: true,
		// cookie: { secure: false, maxAge: 6000// 6 Seconds }
		// cookie: { secure: false, maxAge: 60000 // 1 Minute }
		cookie: {
			secure: false,
			// maxAge: 6000 // 6 Seconds
			// maxAge: 60000 // 1 Minute
			// maxAge: 300000 // 5 Minute
			maxAge: 600000 // 10 Minute
		}
	}))
	.use(compression())
	// pass variables to our templates + all requests
	// Locals are all the vars available in the template
	// From wesbos
	.use(function (req, res, next) {
		res.locals.h = helpers;
		next();
	})
	.use('/', mainRoute)

// Define port to listen to
app.listen(3500, function () {
	console.log('server is running on port 3500');
})
