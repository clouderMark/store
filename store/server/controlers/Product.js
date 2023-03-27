import ProductModel  from '../models/Product.js'
import AppError from "../errors/AppError.js"

class Product {
    async getAll(req, res, next) {
        try {
            const {industryId = null, solutionId = null, areaId = null} = req.params
            const industries = industryId ? industryId.split(',').map((el) => el >= 0 ? +el : null).filter((el) => el) : null;
            const solutions = solutionId ? solutionId.split(',').map((el) => el >= 0 ? +el : null).filter((el) => el) : null;
            const areas = areaId ? areaId.split(',').map((el) => el >= 0 ? +el : null).filter((el) => el) : null;
            let {limit = null, page = null} = req.query
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 3
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            const options = {industryId: industries, solutionId: solutions, areaId: areas, limit, page}
            const products = await ProductModel.getAll(options)
            res.json(products)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getForSlider(req, res, next) {
        try {
            if (!req.query.limit) {
                throw new Error('Не указано количнство продуктов для слайдера');
            }
                const products = await ProductModel.getForSlider(req.query.limit);

                res.json(products);
            } catch (e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.getOne(req.params.id)
            res.json(product)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const product = await ProductModel.create(req.body, req.files?.image)
            res.json(product)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан Id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const product = await ProductModel.update(req.params.id, req.body, req.files?.image)
            res.json(product)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.delete(req.params.id)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Product()