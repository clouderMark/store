import express from 'express'
import SolutionController from '../controlers/Solution.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', SolutionController.getAll)
router.get('/getallandimg', SolutionController.getAllWithImages)
router.get('/getone/:id([0-9]+)', SolutionController.getOne)
router.post(
    '/create',
    authMiddleware,
    adminMiddleware,
    SolutionController.create)
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SolutionController.update)
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SolutionController.delete)

export default router