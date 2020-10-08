const router = require('express').Router()
const MovieController = require('../controllers/MovieControllers')

router.get('/', MovieController.findAll)
router.post('/', MovieController.create)
router.delete('/:id', MovieController.delete)
router.put('/:id', MovieController.update)
router.get('/:id', MovieController.findOne)

module.exports = router