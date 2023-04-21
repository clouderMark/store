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

  async create(data, cardImg, headerImg, infoImg, opinionImg) {
    const cardImage = FileService.save(cardImg) ?? '';
    const headerImage = FileService.save(headerImg) ?? '';
    const infoImage = FileService.save(infoImg) ?? '';
    const opinionImage = FileService.save(opinionImg) ?? '';
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
    } = data;
    const industry = await IndustryMapping.create({
      name,
      cardImage,
      headerImage,
      title,
    });
    if (data.paragraphs) {
      const paragraphs = JSON.parse(data.paragraphs);
      for (let paragraph of paragraphs) {
        await IndustryParagraphMapping.create({
          value: paragraph.value,
          industryId: industry.id,
        });
      }
    }
    InfoMapping.create({
      image: infoImage,
      title: infoTitle,
      header: infoHeader,
      listTitle,
      infoId: industry.id,
    });

    if (data.listItems) {
      const listItems = JSON.parse(data.listItems);
      for (let item of listItems) {
        await ListItemMapping.create({
          value: item.value,
          indInfoId: industry.id,
        });
      }
    }

    if (data.infoParagraphs) {
      const paragraphs = JSON.parse(data.infoParagraphs);
      for (let paragraph of paragraphs) {
        await InfoParagraphMapping.create({
          value: paragraph.value,
          indInfoId: industry.id,
        });
      }
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

    if (data.opinionListItems) {
      const listItems = JSON.parse(data.opinionListItems);
      for (let item of listItems) {
        await OpinionItemMapping.create({
          value: item.value,
          indOpinionId: industry.id,
        });
      }
    }

    if (data.opinionParagraphs) {
      const paragraphs = JSON.parse(data.opinionParagraphs);
      for (let paragraph of paragraphs) {
        await OpinionParagraphMapping.create({
          value: paragraph.value,
          indOpinionId: industry.id,
        });
      }
    }

    await industry.reload();

    const created = await IndustryMapping.findByPk(
      industry.id,
      rowsWithParagraphs
    );

    return created;
  }

  async update(id, data, cardImg, headerImg, infoImg, opinionImg) {
    const industry = await IndustryMapping.findByPk(id, rows);
    if (!industry) {
      throw new Error('Индустрия не найдена в БД');
    }
    const file1 = FileService.save(cardImg);
    const file2 = FileService.save(headerImg);
    const file3 = FileService.save(infoImg);
    const file4 = FileService.save(opinionImg);
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
    } = data;

    await industry.update({
      name,
      cardImage,
      headerImage,
      title,
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

    if (data.paragraphs) {
      await IndustryParagraphMapping.destroy({ where: { industryId: id } });
      const paragraphs = JSON.parse(data.paragraphs);
      for (let paragraph of paragraphs) {
        await IndustryParagraphMapping.create({
          value: paragraph.value,
          industryId: industry.id,
        });
      }
    }

    if (data.listItems) {
      await ListItemMapping.destroy({
        where: { indInfoId: id },
      });
      const listItems = JSON.parse(data.listItems);
      for (let item of listItems) {
        await ListItemMapping.create({
          value: item.value,
          indInfoId: industry.id,
        });
      }
    }

    if (data.infoParagraphs) {
      await InfoParagraphMapping.destroy({
        where: { indInfoId: id },
      });
      const paragraphs = JSON.parse(data.infoParagraphs);
      for (let paragraph of paragraphs) {
        await InfoParagraphMapping.create({
          value: paragraph.value,
          indInfoId: industry.id,
        });
      }
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

    if (data.opinionListItems) {
      await OpinionItemMapping.destroy({ where: { indOpinionId: id } });
      const listItems = JSON.parse(data.opinionListItems);
      for (let item of listItems) {
        await OpinionItemMapping.create({
          value: item.value,
          indOpinionId: industry.id,
        });
      }
    }

    if (data.opinionParagraphs) {
      await OpinionParagraphMapping.destroy({ where: { indOpinionId: id } });
      const paragraphs = JSON.parse(data.opinionParagraphs);
      for (let paragraph of paragraphs) {
        await OpinionParagraphMapping.create({
          value: paragraph.value,
          indOpinionId: industry.id,
        });
      }
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

    await industry.destroy();
    return industry;
  }
}

export default new Industry();
