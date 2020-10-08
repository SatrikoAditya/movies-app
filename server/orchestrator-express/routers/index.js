const router = require('express').Router()
const EntertainMe = require('../controllers/EntertainMe')
const moviesRouter = require('./moviesRouter')
const tvSeriesRouter = require('./tvSeriesRouter')

router.get('/entertainme', EntertainMe.findAll)
router.use('/movies', moviesRouter)
router.use('/series', tvSeriesRouter)

module.exports = router