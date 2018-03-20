var router = require('express').Router();

var buildingController = require('../controllers/buildingController');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
// 	console.log('Time: ', Date.now())
// 	next()
// })

// define the home page route
router.get('/', buildingController.homePage);
router.get('/building/:name', buildingController.detailPage);

module.exports = router;
