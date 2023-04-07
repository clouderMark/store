import { Industry as IndustryMapping } from './mapping.js'
import { IndustryParagraph as IndustryParagraphMapping } from './mapping.js'
import AppError from '../errors/AppError.js'
import FileService from '../services/File.js';

class Industry {
    async getAll() {
        const industries = await IndustryMapping.findAll()
        return industries
    }

    async getOne(id) {
        const industry = await IndustryMapping.findByPk(id, {
            include: [
                {model: IndustryParagraphMapping, as: 'paragraphs'}
            ]
        })
        if (!industry) {
            throw new Error('Индустрия не найдена в БД')
        }
        return industry
    }

    async create(data, cardImg, headerImg) {
        const cardImage = FileService.save(cardImg) ?? '';
        const headerImage = FileService.save(headerImg) ?? '';
        const {name, title} = data
        const industry = await IndustryMapping.create({name, cardImage, headerImage, title})
        if (data.paragraphs) {
            const paragraphs = JSON.parse(data.paragraphs)
            for (let paragraph of paragraphs) {
                await IndustryParagraphMapping.create({
                    value: paragraph.value,
                    industryId: industry.id,
                })
            }
        }
        return industry
    }

    async update(id, data, cardImg, headerImg) {
        const industry = await IndustryMapping.findByPk(id)
        if (!industry) {
            throw new Error('Индустрия не найдена в БД')
        }
        const file1 = FileService.save(cardImg)
        const file2 = FileService.save(headerImg)
        if (file1 && industry.cardImage) {
            FileService.delete(industry.cardImage)
        }
        if (file2 && industry.headerImage) {
            FileService.delete(industry.headerImage)
        }
        const {
            name = industry.name,
            title = industry.title,
            cardImage = file1 ? file1 : industry.cardImage,
            headerImage = file2 ? file2 : industry.headerImage,
        } = data
        await industry.update({name, cardImage, headerImage, title})
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
        if (industry.headerImage) {
            FileService.delete(industry.headerImage)
        }
        await industry.destroy();
        return industry
    }
}

export default new Industry()