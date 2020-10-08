const router = require('express').Router()
const MoviesController = require('../controllers/MoviesControllers')

router.get('/', MoviesController.findAll)
router.post('/', MoviesController.create)
router.delete('/:id', MoviesController.delete)
router.put('/:id', MoviesController.update)

module.exports = router