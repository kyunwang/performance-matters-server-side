var router = require('express').Router();


// define the home page route
router.get('/', function (req, res) {
	res.send('Hello mate!');
})


module.exports = router;