import { Solution as SolutionMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Solution {
    async getAll() {
        const solutions = await SolutionMapping.findAll()
        return solutions
    }

    async getOne(id) {
        const solution = await SolutionMapping.findByPk(id)
        if (!solution) {
            throw new Error('Решение не найдена в БД')
        }
        return solution
    }

    async create(data) {
        const {name} = data
        const solution = await SolutionMapping.create({name})
        return solution
    }

    async update(id, data) {
        const solution = await SolutionMapping.findByPk(id)
        if (!solution) {
            throw new Error('Решение не найдена в БД')
        }
        const {name = solution.name} = data
        await solution.update({name})
        return solution
    }

    async delete(id) {
        const solution = await SolutionMapping.findByPk(id)
        if(!solution) {
            throw new Error('Решение не найдена в БД')
        }
        await solution.destroy()
        return solution
    }
}

export default new Solution()