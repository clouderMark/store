import {
  Industry as IndustryMapping,
  IndustryParagraph as IndustryParagraphMapping,
  IndustryInfo as InfoMapping,
  IndustryListItem as ListItemMapping,
  IndustryInfoParagraph as InfoParagraphMapping,
  IndustryOpinion as OpinionMapping,
  IndustryOpinionItem as OpinionItemMapping,
  IndustryOpinionParagraph as OpinionParagraphMapping,
} from '../mapping.js';
import { rows, rowsWithParagraphs } from './getRows.js';
import AppError from '../../errors/AppError.js';
import FileService from '../../services/File.js';
import createParagraphs from './createParagraphs.js';
import createListItems from './createListItems.js';
import createInfoParagraphs from './createInfoParagraphs.js';
import createOpinionListItems from './createOpinionListItems.js';
import createOpinionParagraphs from './createOpinionParagraphs.js';

class Industry {
  async getAll() {
    const industries = await IndustryMapping.findAll(rowsWithParagraphs);
    return industries;
  }

  async getOne(id) {
    const industry = await IndustryMapping.findByPk(id, rowsWithParagraphs);
    if (!industry) {
      throw new Error('Индустрия не найдена в БД');
    }
    return industry;
  }

  async create(data, cardImg, headerImg, infoImg, opinionImg, sliderImg) {
    const cardImage = FileService.save(cardImg) ?? '';
    const headerImage = FileService.save(headerImg) ?? '';
    const infoImage = FileService.save(infoImg) ?? '';
    const opinionImage = FileService.save(opinionImg) ?? '';
    const sliderImage = FileService.save(sliderImg) ?? '';
    const {
      name,
      title,
      infoTitle = '',
      infoHeader = '',
      listTitle = '',
      opinionTitle = '',
      opinionListTitle = '',
      opinionName = '',
      opinionPhone = '',
      opinionFax = '',
      opinionEmail = '',
      paragraphs,
      listItems,
      infoParagraphs,
      opinionListItems,
      opinionParagraphs,
    } = data;
    const industry = await IndustryMapping.create({
      name,
      cardImage,
      headerImage,
      title,
      sliderImage,
    });

    if (paragraphs) {
      createParagraphs(paragraphs, industry.id);
    }

    InfoMapping.create({
      image: infoImage,
      title: infoTitle,
      header: infoHeader,
      listTitle,
      infoId: industry.id,
    });

    if (listItems) {
      createListItems(listItems, industry.id);
    }

    if (infoParagraphs) {
      createInfoParagraphs(infoParagraphs, industry.id);
    }

    OpinionMapping.create({
      title: opinionTitle,
      listTitle: opinionListTitle,
      name: opinionName,
      image: opinionImage,
      phone: opinionPhone,
      fax: opinionFax,
      email: opinionEmail,
      opinionId: industry.id,
    });

    if (opinionListItems) {
      createOpinionListItems(opinionListItems, industry.id);
    }

    if (opinionParagraphs) {
      createOpinionParagraphs(opinionParagraphs, industry.id);
    }

    await industry.reload();

    const created = await IndustryMapping.findByPk(
      industry.id,
      rowsWithParagraphs
    );

    return created;
  }

  async update(id, data, cardImg, headerImg, infoImg, opinionImg, sliderImg) {
    const industry = await IndustryMapping.findByPk(id, rowsWithParagraphs);
    if (!industry) {
      throw new Error('Индустрия не найдена в БД');
    }
    const file1 = FileService.save(cardImg);
    const file2 = FileService.save(headerImg);
    const file3 = FileService.save(infoImg);
    const file4 = FileService.save(opinionImg);
    const file5 = FileService.save(sliderImg);
    if (file1 && industry.cardImage) {
      FileService.delete(industry.cardImage);
    }
    if (file2 && industry.headerImage) {
      FileService.delete(industry.headerImage);
    }
    if (file3 && industry.info.image) {
      FileService.delete(industry.info.image);
    }
    if (file4 && industry.opinion.image) {
      FileService.delete(industry.opinion.image);
    }
    if (file5 && industry.sliderImage) {
      FileService.delete(industry.sliderImage);
    }

    const {
      name = industry.name,
      title = industry.title,
      cardImage = file1 ? file1 : industry.cardImage,
      headerImage = file2 ? file2 : industry.headerImage,
      infoImage = file3 ? file3 : industry.info.image,
      infoTitle = industry.info.title,
      infoHeader = industry.info.header,
      listTitle = industry.info.listHeader,
      opinionTitle = industry.opinion.title,
      opinionListTitle = industry.opinion.listTitle,
      opinionName = industry.opinion.name,
      opinionImage = file4 ? file4 : industry.opinion.image,
      opinionPhone = industry.opinion.phone,
      opinionFax = industry.opinion.fax,
      opinionEmail = industry.opinion.email,
      sliderImage = file5 ? file5 : industry.sliderImage,
      paragraphs,
      listItems,
      infoParagraphs,
      opinionListItems,
      opinionParagraphs,
    } = data;

    await industry.update({
      name,
      cardImage,
      headerImage,
      title,
      sliderImage,
    });

    await InfoMapping.update(
      {
        image: infoImage,
        title: infoTitle,
        header: infoHeader,
        listTitle,
      },
      { where: { infoId: id } }
    );

    if (industry.paragraphs) {
      await IndustryParagraphMapping.destroy({ where: { industryId: id } });
    }
    if (paragraphs) {
      createParagraphs(paragraphs, industry.id);
    }

    if (industry.info.listItems) {
      await ListItemMapping.destroy({
        where: { indInfoId: id },
      });
    }
    if (listItems) {
      createListItems(listItems, industry.id);
    }

    if (industry.info.paragraphs) {
      await InfoParagraphMapping.destroy({
        where: { indInfoId: id },
      });
    }
    if (infoParagraphs) {
      createInfoParagraphs(infoParagraphs, industry.id);
    }

    await OpinionMapping.update(
      {
        title: opinionTitle,
        listTitle: opinionListTitle,
        name: opinionName,
        image: opinionImage,
        phone: opinionPhone,
        fax: opinionFax,
        email: opinionEmail,
      },
      { where: { opinionId: id } }
    );

    if (industry.opinion.listItems) {
      await OpinionItemMapping.destroy({ where: { indOpinionId: id } });
    }
    if (opinionListItems) {
      createOpinionListItems(opinionListItems, industry.id);
    }

    if (industry.opinion.paragraphs) {
      await OpinionParagraphMapping.destroy({ where: { indOpinionId: id } });
    }
    if (opinionParagraphs) {
      createOpinionParagraphs(opinionParagraphs, industry.id);
    }

    await industry.reload();
    const created = await IndustryMapping.findByPk(
      industry.id,
      rowsWithParagraphs
    );

    return created;
  }

  async delete(id) {
    const industry = await IndustryMapping.findByPk(id, {
      include: [
        {
          model: InfoMapping,
          as: 'info',
          attributes: ['image'],
        },
        {
          model: OpinionMapping,
          as: 'opinion',
          attributes: ['image'],
        },
      ],
    });
    if (!industry) {
      throw new Error('Индустрия не найдена в БД');
    }
    if (industry.cardImage) {
      FileService.delete(industry.cardImage);
    }
    if (industry.headerImage) {
      FileService.delete(industry.headerImage);
    }
    if (industry.info.image) {
      FileService.delete(industry.info.image);
    }
    if (industry.opinion.image) {
      FileService.delete(industry.opinion.image);
    }
    if (industry.sliderImage) {
      FileService.delete(industry.sliderImage);
    }

    await industry.destroy();
    return industry;
  }
}

export default new Industry();
