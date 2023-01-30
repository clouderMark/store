import { Brand as BrandMapping } from '../models/mapping.js'
import AppError from '../errors/AppError.js'

class Brand {
    async getAll() {
        const brands = await BrandMapping.findAll()
        return brands
    }

    async getOne(id) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('Бренд не найдена в БД')
        }
        return brand
    }

    async create(data) {
        const {name} = data
        const brand = await BrandMapping.create({name})
        return brand
    }

    async update(id, data) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('Бренд не найдена в БД')
        }
        const {name = brand.name} = data
        await brand.update({name})
        return brand
    }

    async delete(id) {
        const brand = await BrandMapping.findByPk(id)
        if(!brand) {
            throw new Error('Брэнд не найдена в БД')
        }
        await brand.destroy()
        return brand
    }
}

export default new Brand()