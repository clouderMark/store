import {
  SubIndustry as SubIndustryMapping,
  SubIndustryParagraph as SubIndustryParagraphMapping,
  SubInfo as InfoMapping,
  SubListItem as ListItemMapping,
  SubInfoParagraph as InfoParagraphMapping,
  SubOpinion as OpinionMapping,
  SubOpinionItem as OpinionItemMapping,
  SubOpinionParagraph as OpinionParagraphMapping,
} from '../mapping.js';
import AppError from '../../errors/AppError.js';
import FileService from '../../services/File.js';
import { rows, rowsWithParagraphs } from './getRows.js';
import createParagraphs from './createParagraphs.js';
import createListItems from './createListItems.js';
import createInfoParagraphs from './createInfoParagraphs.js';
import createOpinionListItems from './createOpinionListItems.js';
import createOpinionParagraphs from './createOpinionParagraphs.js';

class SubIndustry {
  async getAll() {
    const subIndustries = await SubIndustryMapping.findAll(rowsWithParagraphs);
    return subIndustries;
  }

  async getOne(id) {
    const subIndustry = await SubIndustryMapping.findByPk(
      id,
      rowsWithParagraphs
    );
    if (!subIndustry) {
      throw new Error('Подиндустрия не найдена в БД');
    }
    return subIndustry;
  }

  async create(data, cardImg, headerImg, infoImg, opinionImg) {
    const cardImage = FileService.save(cardImg) ?? '';
    const headerImage = FileService.save(headerImg) ?? '';
    const infoImage = FileService.save(infoImg) ?? '';
    const opinionImage = FileService.save(opinionImg) ?? '';
    const {
      name,
      title,
      industryId = null,
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

    const subIndustry = await SubIndustryMapping.create({
      industryId,
      name,
      cardImage,
      headerImage,
      title,
    });

    if (paragraphs) {
      createParagraphs(paragraphs, subIndustry.id);
    }

    InfoMapping.create({
      image: infoImage,
      title: infoTitle,
      header: infoHeader,
      listTitle,
      infoId: subIndustry.id,
    });

    if (listItems) {
      createListItems(listItems, subIndustry.id);
    }

    if (infoParagraphs) {
      createInfoParagraphs(infoParagraphs, subIndustry.id);
    }

    OpinionMapping.create({
      title: opinionTitle,
      listTitle: opinionListTitle,
      name: opinionName,
      image: opinionImage,
      phone: opinionPhone,
      fax: opinionFax,
      email: opinionEmail,
      opinionId: subIndustry.id,
    });

    if (opinionListItems) {
      createOpinionListItems(opinionListItems, subIndustry.id);
    }

    if (opinionParagraphs) {
      createOpinionParagraphs(opinionParagraphs, subIndustry.id);
    }

    await subIndustry.reload();

    const created = await SubIndustryMapping.findByPk(
      subIndustry.id,
      rowsWithParagraphs
    );

    return created;
  }

  async update(id, data, cardImg, headerImg, infoImg, opinionImg) {
    const subIndustry = await SubIndustryMapping.findByPk(id, rowsWithParagraphs);
    if (!subIndustry) {
      throw new Error('подиндустрия не найдена в БД');
    }

    const file1 = FileService.save(cardImg);
    const file2 = FileService.save(headerImg);
    const file3 = FileService.save(infoImg);
    const file4 = FileService.save(opinionImg);
    if (file1 && subIndustry.cardImage) {
      FileService.delete(subIndustry.cardImage);
    }
    if (file2 && subIndustry.headerImage) {
      FileService.delete(subIndustry.headerImage);
    }
    if (file3 && subIndustry.info.image) {
      FileService.delete(subIndustry.info.image);
    }
    if (file4 && subIndustry.opinion.image) {
      FileService.delete(subIndustry.opinion.image);
    }

    const {
      industryId = subIndustry.industryId,
      name = subIndustry.name,
      title = subIndustry.title,
      cardImage = file1 ? file1 : subIndustry.cardImage,
      headerImage = file2 ? file2 : subIndustry.headerImage,
      infoImage = file3 ? file3 : subIndustry.info.image,
      infoTitle = subIndustry.info.title,
      infoHeader = subIndustry.info.header,
      listTitle = subIndustry.info.listHeader,
      opinionTitle = subIndustry.opinion.title,
      opinionListTitle = subIndustry.opinion.listTitle,
      opinionName = subIndustry.opinion.name,
      opinionImage = file4 ? file4 : subIndustry.opinion.image,
      opinionPhone = subIndustry.opinion.phone,
      opinionFax = subIndustry.opinion.fax,
      opinionEmail = subIndustry.opinion.email,
      paragraphs,
      listItems,
      infoParagraphs,
      opinionListItems,
      opinionParagraphs,
    } = data;

    await subIndustry.update({
      industryId,
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

    if (subIndustry.paragraphs) {
      await SubIndustryParagraphMapping.destroy({
        where: { subindustryId: id },
      });
    }
    if (paragraphs) {
      createParagraphs(paragraphs, subIndustry.id);
    }


    if (subIndustry.info.listItems) {
      await ListItemMapping.destroy({
        where: { subInfoId: id },
      });
    }
    if (listItems) {
      createListItems(listItems, subIndustry.id);
    }

    if (subIndustry.info.paragraphs) {
      await InfoParagraphMapping.destroy({
        where: { subInfoId: id },
      });
    }
    if (infoParagraphs) {
      createInfoParagraphs(infoParagraphs, subIndustry.id);
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

    if (subIndustry.opinion.listItems) {
      await OpinionItemMapping.destroy({ where: { subOpinionId: id } });
    }
    if (opinionListItems) {
      createOpinionListItems(opinionListItems, subIndustry.id);
    }

    if (subIndustry.opinion.paragraphs) {
      await OpinionParagraphMapping.destroy({ where: { subOpinionId: id } });
    }
    if (opinionParagraphs) {
      createOpinionParagraphs(opinionParagraphs, subIndustry.id);
    }

    await subIndustry.reload();

    const created = await SubIndustryMapping.findByPk(
      subIndustry.id,
      rowsWithParagraphs
    );

    return created;
  }

  async delete(id) {
    const subIndustry = await SubIndustryMapping.findByPk(id, {
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
    if (!subIndustry) {
      throw new Error('Подиндустрия не найдена в БД');
    }
    if (subIndustry.cardImage) {
      FileService.delete(subIndustry.cardImage);
    }
    if (subIndustry.headerImage) {
      FileService.delete(subIndustry.headerImage);
    }
    if (subIndustry.info.image) {
      FileService.delete(subIndustry.info.image);
    }
    if (subIndustry.opinion.image) {
      FileService.delete(subIndustry.opinion.image);
    }

    await subIndustry.destroy();
    return subIndustry;
  }
}

export default new SubIndustry();
