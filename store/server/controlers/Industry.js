import IndustryModel from '../models/Industry/Industry.js'
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
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const industry = await IndustryModel.create(
                req.body,
                req.files?.cardImage,
                req.files?.headerImage,
                req.files?.infoImage,
                req.files?.opinionImage,
                req.files?.sliderImage,
            );
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
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const industry = await IndustryModel.update(
                req.params.id,
                req.body,
                req.files?.cardImage,
                req.files?.headerImage,
                req.files?.infoImage,
                req.files?.opinionImage,
                req.files?.sliderImage,
            );
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