import { Industry as IndustryMapping } from './mapping.js'
import AppError from '../errors/AppError.js'
import FileService from '../services/File.js';

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

    async create(data, cardImg) {
        const cardImage = FileService.save(cardImg) ?? '';
        const {name} = data
        const industry = await IndustryMapping.create({name, cardImage})
        return industry
    }

    async update(id, data, cardImg) {
        const industry = await IndustryMapping.findByPk(id)
        if (!industry) {
            throw new Error('Индустрия не найдена в БД')
        }
        const file = FileService.save(cardImg)
        if (file && industry.cardImage) {
            FileService.delete(industry.cardImage)
        }
        const {
            name = industry.name,
            cardImage = file ? file : industry.cardImage,
        } = data
        await industry.update({name, cardImage})
        await industry.reload()
        return industry
    }

    async delete(id) {
        const industry = await IndustryMapping.findByPk(id)
        if(!industry) {
            throw new Error('Индустрия не найдена в БД')
        }
        if (industry.cardImage) {
            FileService.delete(industry.cardImage)
        }
        await industry.destroy();
        return industry
    }
}

export default new Industry()