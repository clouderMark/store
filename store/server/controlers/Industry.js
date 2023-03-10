import IndustryModel from '../models/Industry.js'
import AppError from '../errors/AppError.js'

class Industry {
    async getAll(req, res, next) {
        try {
            const industries = await IndustryModel.getAll()
            res.json(industries)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id индустрии')
            }
            const industry = await IndustryModel.getOne(req.params.id)
            res.json(industry)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия индустрии')
            }
            const industry = await IndustryModel.create(req.body)
            res.json(industry)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id индустрии')
            }
            if (!req.body.name) {
                throw new Error('Нет названия индустрии')
            }
            const industry = await IndustryModel.update(req.params.id, req.body)
            res.json(industry)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id индустрии')
            }
            const industry = await IndustryModel.delete(req.params.id)
            res.json(industry)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Industry()