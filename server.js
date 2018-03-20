var express = require('express')

var app = express()

// Require the dotenv file
require('dotenv').config({ path: './vars.env' })

app.use(express.static('public'))
app.set('view engine', 'pug')
app.set('views', 'views')

app.get('/', function (req, res) {
  res.send('Hello Mate!')
})

app.listen(3500, function () {
  console.log('server is running on port 3500')
})
