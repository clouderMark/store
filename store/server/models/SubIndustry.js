import { SubIndustry as SubIndustryMapping } from './mapping.js';
import { SubIndustryParagraph as SubIndustryParagraphMapping } from './mapping.js';
import AppError from '../errors/AppError.js';
import FileService from '../services/File.js';

class SubIndustry {
  async getAll() {
    const subIndustries = await SubIndustryMapping.findAll({
      include: [{ model: SubIndustryParagraphMapping, as: 'paragraphs' }],
    });
    return subIndustries;
  }

  async getOne(id) {
    const subIndustry = await SubIndustryMapping.findByPk(id, {
      include: [{ model: SubIndustryParagraphMapping, as: 'paragraphs' }],
    });
    if (!subIndustry) {
      throw new Error('Подиндустрия не найдена в БД');
    }
    return subIndustry;
  }

  async create(data, cardImg, headerImg) {
    const cardImage = FileService.save(cardImg) ?? '';
    const headerImage = FileService.save(headerImg) ?? '';
    const { name, title, industryId = null } = data;
    const subIndustry = await SubIndustryMapping.create({
      industryId,
      name,
      cardImage,
      headerImage,
      title,
    });
    if (data.paragraphs) {
      const paragraphs = JSON.parse(data.paragraphs);
      for (let paragraph of paragraphs) {
        await SubIndustryParagraphMapping.create({
          value: paragraph.value,
          subindustryId: subIndustry.id,
        });
      }
    }
    return subIndustry;
  }

  async update(id, data, cardImg, headerImg) {
    const subIndustry = await SubIndustryMapping.findByPk(id, {
      include: [{ model: SubIndustryParagraphMapping, as: 'paragraphs' }],
    });
    if (!subIndustry) {
      throw new Error('подиндустрия не найдена в БД');
    }
    const file1 = FileService.save(cardImg);
    const file2 = FileService.save(headerImg);
    if (file1 && subIndustry.cardImage) {
      FileService.delete(subIndustry.cardImage);
    }
    if (file2 && subIndustry.headerImage) {
      FileService.delete(subIndustry.headerImage);
    }
    const {
      industryId = subIndustry.industryId,
      name = subIndustry.name,
      title = subIndustry.title,
      cardImage = file1 ? file1 : subIndustry.cardImage,
      headerImage = file2 ? file2 : subIndustry.headerImage,
    } = data;
    await subIndustry.update({
      industryId,
      name,
      cardImage,
      headerImage,
      title,
    });
    if (data.paragraphs) {
      await SubIndustryParagraphMapping.destroy({
        where: { subindustryId: id },
      });
      const paragraphs = JSON.parse(data.paragraphs);
      for (let paragraph of paragraphs) {
        await SubIndustryParagraphMapping.create({
          value: paragraph.value,
          subindustryId: subIndustry.id,
        });
      }
    }
    await subIndustry.reload();
    return subIndustry;
  }

  async delete(id) {
    const subIndustry = await SubIndustryMapping.findByPk(id);
    if (!subIndustry) {
      throw new Error('Индустрия не найдена в БД');
    }
    if (subIndustry.cardImage) {
      FileService.delete(subIndustry.cardImage);
    }
    if (subIndustry.headerImage) {
      FileService.delete(subIndustry.headerImage);
    }
    await subIndustry.destroy();
    return subIndustry;
  }
}

export default new SubIndustry();
