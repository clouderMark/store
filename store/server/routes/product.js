import express from 'express'
import ProductController from '../controlers/Product.js'
import ProductPropController from '../controlers/ProductProp.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()
router.get('/getall/areaId/:areaId', ProductController.getAll) // все проды по одному параметру
router.get('/getall/solutionId/:solutionId', ProductController.getAll)
router.get('/getall/industryId/:industryId', ProductController.getAll)

router.get('/getall/industryId/:industryId/solutionId/:solutionId', ProductController.getAll) // все проды по двум параметрам
router.get('/getall/industryId/:industryId/areaId/:areaId', ProductController.getAll)
router.get('/getall/solutionId/:solutionId/areaId/:areaId', ProductController.getAll)


router.get('/getall/industryId/:industryId/solutionId/:solutionId/areaId/:areaId', ProductController.getAll)  // все проды по трем

router.get('/getall', ProductController.getAll)

router.get('/slider', ProductController.getForSlider)

router.get('/getone/:id([0-9]+)', ProductController.getOne)

router.post('/create',
    authMiddleware,
    adminMiddleware,
    ProductController.create)
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductController.update)
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductController.delete)


/*
*Свойста
*/
//список свойств товара
router.get('/:productId([0-9]+)/property/getall', ProductPropController.getAll)
//одно свойство товара
router.get('/:productId([0-9]+)/property/getone/:id([0-9]+)', ProductPropController.getOne)
//создать свойство товара
router.post(
    '/:productId([0-9]+)/property/create',
    authMiddleware,
    adminMiddleware,
    ProductPropController.create
)
//обновить свойство товара
router.put(
    '/:productId([0-9]+)/property/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropController.update
)
//удалить свойство товара
router.delete(
    '/:productId([0-9]+)/property/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropController.delete
)
export default router