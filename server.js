var express = require('express');
var session = require('express-session');

var app = express();

// Can't think of a good name....
var mainRoute = require('./routes');

// Require the dotenv file
require('dotenv').config({ path: './vars.env' });

app
	.use(express.static('public'))
	.set('view engine', 'pug')
	.set('views', 'views')
	.use(session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		// cookie: { secure: false, maxAge: 6000// 6 Seconds }
		// cookie: { secure: false, maxAge: 60000 // 1 Minute }
		cookie: {
			secure: false,
			maxAge: 300000 // 5 Minute
		}
	}))
	.use('/', mainRoute)

// Define port to listen to
app.listen(3500, function () {
	console.log('server is running on port 3500');
})
