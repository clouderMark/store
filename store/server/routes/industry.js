import express from 'express'
import IndustryController from '../controlers/Industry.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', IndustryController.getAll)
router.get('/getone/:id([0-9]+)', IndustryController.getOne)
router.post(
    '/create',
    authMiddleware,
    adminMiddleware,
    IndustryController.create)
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    IndustryController.update)
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    IndustryController.delete)

export default router