import { Industry as IndustryMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Industry {
    async getAll() {
        const industries = await IndustryMapping.findAll()
        return industries
    }

    async getOne(id) {
        const industry = await IndustryMapping.findByPk(id)
        if (!industry) {
            throw new Error('Индустрия не найдена в БД')
        }
        return industry
    }

    async create(data) {
        const {name} = data
        const industry = await IndustryMapping.create({name})
        return industry
    }

    async update(id, data) {
        const industry = await IndustryMapping.findByPk(id)
        if (!industry) {
            throw new Error('Индустрия не найдена в БД')
        }
        const {name = industry.name} = data
        await industry.update({name})
        return industry
    }

    async delete(id) {
        const industry = await IndustryMapping.findByPk(id)
        if(!industry) {
            throw new Error('Индустрия не найдена в БД')
        }
        await industry.destroy()
        return industry
    }
}

export default new Industry()