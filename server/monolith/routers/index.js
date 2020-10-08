const router = require('express').Router()
const moviesRouter = require('./moviesRouter')
const tvSeriesRouter = require('./tvSeriesRouter')

router.use('/movies', moviesRouter)
router.use('/tvseries', tvSeriesRouter)

module.exports = router