var express = require('express');

var app = express();

// Can't think of a good anme....
var mainRoute = require('./routes');

// Require the dotenv file
require('dotenv').config({ path: './vars.env' });

app
	.use(express.static('public'))
	.set('view engine', 'pug')
	.set('views', 'views')
	.use('/', mainRoute)

app.listen(3500, function () {
	console.log('server is running on port 3500');
})
