const Router = require('express')
const router = new Router()
const placeController = require('../controllers/placeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), placeController.create)
router.get('/', placeController.getAll)

module.exports = router
