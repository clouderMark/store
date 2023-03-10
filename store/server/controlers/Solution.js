import SolutionModel from '../models/Solution.js'
import AppError from '../errors/AppError.js'

class Solution {
    async getAll(req, res, next) {
        try {
            const solutions = await SolutionModel.getAll()
            res.json(solutions)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id решения')
            }
            const solution = await SolutionModel.getOne(req.params.id)
            res.json(solution)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const solution = await SolutionModel.create(req.body)
            res.json(solution)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('Не указан id решения')
            }
            const solution = await SolutionModel.update(req.params.id, req.body)
            res.json(solution)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {   
            if (!req.params.id) {
                throw new Error('Не указан id решения')
            }
            const solution = await SolutionModel.delete(req.params.id)
            res.json(solution)
        } catch(e)  {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Solution()