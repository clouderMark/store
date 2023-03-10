import express from 'express'
import AreaController from '../controlers/Area.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', AreaController.getAll)
router.get('/getone/:id([0-9]+)', AreaController.getOne)
router.post(
    '/create',
    authMiddleware,
    adminMiddleware,
    AreaController.create)
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    AreaController.update)
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    AreaController.delete)

export default router