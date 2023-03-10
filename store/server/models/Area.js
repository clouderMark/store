import { Area as AreaMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Area {
    async getAll() {
        const areas = await AreaMapping.findAll()
        return areas
    }

    async getOne(id) {
        const area = await AreaMapping.findByPk(id)
        if (!area) {
            throw new Error('Область не найдена в БД')
        }
        return area
    }

    async create(data) {
        const {name} = data
        const area = await AreaMapping.create({name})
        return area
    }

    async update(id, data) {
        const area = await AreaMapping.findByPk(id)
        if (!area) {
            throw new Error('Область не найдена в БД')
        }
        const {name = area.name} = data
        await area.update({name})
        return area
    }

    async delete(id) {
        const area = await AreaMapping.findByPk(id)
        if(!area) {
            throw new Error('Область не найдена в БД')
        }
        await area.destroy()
        return area
    }
}

export default new Area()