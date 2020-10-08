const router = require('express').Router()
const TvSeriesControllers = require('../controllers/TvSeriesControllers')

router.get('/', TvSeriesControllers.findSeries)
router.post('/', TvSeriesControllers.addSeries)
router.delete('/:id', TvSeriesControllers.deleteSeries)
router.put('/:id', TvSeriesControllers.updateSeries)
router.get('/:id', TvSeriesControllers.findOneSeries)

module.exports = router