const router = require('express').Router()
const MoviesControllers = require('../controllers/MoviesController')

router.get('/', MoviesControllers.findMovies)
router.post('/', MoviesControllers.addMovie)
router.delete('/:id', MoviesControllers.deleteMovie)
router.put('/:id', MoviesControllers.updateMovie)
router.get('/:id', MoviesControllers.findOneMovie)

module.exports = router