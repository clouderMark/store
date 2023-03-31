import { Product as ProductMapping } from './mapping.js'
import { ProductProp as ProductPropMapping } from './mapping.js'
import AppError from '../errors/AppError.js'
import FileService from '../services/File.js'
import { Solution as SolutionMapping } from './mapping.js'
import { Industry as IndustryMapping } from './mapping.js'
import { Area as AreaMapping } from './mapping.js'
import sequelize from '../sequelize.js';

class Product {
    async getAll(options) {
        const { industryId, solutionId, areaId, limit, page } = options
        const offset = (page - 1) * limit
        const where = {}
        if (industryId) where.industryId = industryId
        if (solutionId) where.solutionId = solutionId
        if (areaId) where.areaId = areaId
        const products = await ProductMapping.findAndCountAll({
            where,
            limit,
            offset,
            //для каждого товара получаем решение и индустрии
            include: [
                {model: SolutionMapping, as: 'solution'},
                {model: IndustryMapping, as: 'industry'},
                {model: AreaMapping, as: 'area'}
            ]
        })
        return products
    }

    async getForSlider(limit) {
        const products = await ProductMapping.findAll({
            attributes: ['id', 'name', 'image'],
            order: sequelize.random(),
            limit,
        });

        return products;
    }

    async getOne(id) {
        const product = await ProductMapping.findByPk(id, {
            include: [
                { model: ProductPropMapping, as: 'props' },
                { model: SolutionMapping, as: 'solution' },
                { model: AreaMapping, as: 'area' },
                { model: IndustryMapping, as: 'industry'},
            ]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }

    async create(data, img) {
        const image = FileService.save(img) ?? ''
        const { name, price, industryId = null, solutionId = null, areaId = null, article = null, weight = null } = data
        const product = await ProductMapping.create({ name, price, image, industryId, solutionId, areaId, article, weight })
        if (data.props) {
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        return product
    }

    async update(id, data, img) {
        const product = await ProductMapping.findByPk(id, {
            include: [{model: ProductPropMapping, as: 'props'}]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        //пробуем сохранить изображение, если оно было загреженно
        const file = FileService.save(img)
        //если было загруженно - нужно удалить старое
        if (file && product.image) {
            FileService.delete(product.image)
        }
        const {
            name = product.name,
            price = product.price,
            industryId = product.industryId,
            solutionId = product.solutionId,
            areaId = product.areaId,
            image = file ? file : product.image,
            article = product.article,
            weight = product.weight,
        } = data
        await product.update({ name, price, image, industryId, solutionId, areaId, article, weight })
        if (data.props) {//удаляем старые и добавляем новые
            await ProductPropMapping.destroy({where: {productId: id}})
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        //обновляем чтобы вернуть свежие данные
        await product.reload()
        return product
    }

    async delete(id) {
        const product = await ProductMapping.findByPk(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        if (product.image) {// удаляем изображение товара
            FileService.delete(product.image)
        }
        await product.destroy()
        return product
    }

    async isExist(id) {
        const basket = await ProductMapping.findByPk(id)
        return basket
    }
}

export default new Product()