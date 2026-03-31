const Router = require('express')
const router = new Router()
const foodRouter = require('./foodRouter')
const userRouter = require('./userRouter')
const placeRouter = require('./placeRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/place', placeRouter)
router.use('/food', foodRouter)

module.exports = router
