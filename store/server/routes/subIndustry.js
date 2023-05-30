import express from 'express'
import SubIndustryController from '../controlers/SubIndustry.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', SubIndustryController.getAll)
router.get('/getone/:id([0-9]+)', SubIndustryController.getOne)
router.post(
    '/create',
    authMiddleware,
    adminMiddleware,
    SubIndustryController.create)
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SubIndustryController.update)
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SubIndustryController.delete)

export default router
