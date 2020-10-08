const router = require('express').Router()
const TvSeriesController = require('../controllers/TvSeriesControllers')

router.get('/', TvSeriesController.findAll)
router.post('/', TvSeriesController.create)
router.delete('/:id', TvSeriesController.delete)
router.put('/:id', TvSeriesController.update)
router.get('/:id', TvSeriesController.findOne)

module.exports = router