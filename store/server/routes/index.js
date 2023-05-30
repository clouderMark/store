import  express from 'express'

import product from './product.js'
import industry from './industry.js'
import subindustry from './subIndustry.js'
import solution from './solution.js'
import area from './area.js'
import user from './user.js'
import basket from './basket.js'
import rating from './rating.js'
import order from './order.js'
import message from './message.js'
import subscription from './subscription.js'

const router = new express.Router()

router.use('/product', product)
router.use('/industry', industry)
router.use('/subindustry', subindustry)
router.use('/solution', solution)
router.use('/area', area)
router.use('/user', user)
router.use('/basket', basket)
router.use('/rating', rating)
router.use('/order', order)
router.use('/message', message)
router.use('/subscription', subscription)

export default router