import  express from 'express'

import product from './product.js'
import industry from './industry.js'
import brand from './brand.js'
import area from './area.js'
import user from './user.js'
import basket from './basket.js'
import rating from './rating.js'
import order from './order.js'

const router = new express.Router()

router.use('/product', product)
router.use('/industry', industry)
router.use('/brand', brand)
router.use('/area', area)
router.use('/user', user)
router.use('/basket', basket)
router.use('/rating', rating)
router.use('/order', order)

export default router