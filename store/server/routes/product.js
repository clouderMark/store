import express from 'express'
import ProductController from '../controlers/Product.js'
import ProductPropController from '../controlers/ProductProp.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()
//Список товаров выбранной категории и выбранного бренда
router.get('/getall/categoryId/:categoryId([0-9]+)/brandId/:brandId([0-9]+)/areaId/:areaId([0-9]+)', ProductController.getAll)
//список товаров выбранной категории
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
//список товаров выбранного бренда
router.get('/getall/brandId/:brandId([0-9]+)', ProductController.getAll)
//список товароа выбранного решения
router.get('/getall/areaId/:areaId([0-9]+)', ProductController.getAll)
//список всех товаров
router.get('/getall', ProductController.getAll)
//получить один товар
router.get('/getone/:id([0-9]+)', ProductController.getOne)
//создать товар каталога - нужны права администратора
router.post('/create',
    authMiddleware,
    adminMiddleware,
    ProductController.create)
//обновить товар каталога - нужны права администратора
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductController.update)
//удалить товар каталога - нужны права администратора
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