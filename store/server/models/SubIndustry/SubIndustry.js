import {
  SubIndustry as SubIndustryMapping,
  SubIndustryParagraph as SubIndustryParagraphMapping,
  SubInfo as InfoMapping,
  SubListItem as ListItemMapping,
  SubInfoParagraph as InfoParagraphMapping,
} from '../mapping.js';
import AppError from '../../errors/AppError.js';
import FileService from '../../services/File.js';
import { rows, rowsWithParagraphs } from './getRows.js';

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

  async create(data, cardImg, headerImg, infoImg) {
    const cardImage = FileService.save(cardImg) ?? '';
    const headerImage = FileService.save(headerImg) ?? '';
    const infoImage = FileService.save(infoImg) ?? '';
    const {
      name,
      title,
      industryId = null,
      infoTitle = '',
      infoHeader = '',
      listTitle = '',
    } = data;

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
    InfoMapping.create({
      image: infoImage,
      title: infoTitle,
      header: infoHeader,
      listTitle,
      infoId: subIndustry.id,
    });

    if (data.listItems) {
      const listItems = JSON.parse(data.listItems);
      for (let item of listItems) {
        await ListItemMapping.create({
          value: item.value,
          subInfoId: subIndustry.id,
        });
      }
    }

    if (data.infoParagraphs) {
      const paragraphs = JSON.parse(data.infoParagraphs);
      for (let paragraph of paragraphs) {
        await InfoParagraphMapping.create({
          value: paragraph.value,
          subInfoId: subIndustry.id,
        });
      }
    }
    await subIndustry.reload();

    const created = await SubIndustryMapping.findByPk(
      subIndustry.id,
      rowsWithParagraphs
    );

    return created;
  }

  async update(id, data, cardImg, headerImg, infoImg) {
    const subIndustry = await SubIndustryMapping.findByPk(id, rows);
    if (!subIndustry) {
      throw new Error('подиндустрия не найдена в БД');
    }

    const file1 = FileService.save(cardImg);
    const file2 = FileService.save(headerImg);
    const file3 = FileService.save(infoImg);
    if (file1 && subIndustry.cardImage) {
      FileService.delete(subIndustry.cardImage);
    }
    if (file2 && subIndustry.headerImage) {
      FileService.delete(subIndustry.headerImage);
    }
    if (file3 && subIndustry.info.image) {
      FileService.delete(subIndustry.info.image);
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
    } = data;

    console.log(data);

    await subIndustry.update({
      industryId,
      name,
      cardImage,
      headerImage,
      title,
    });

    const info = await InfoMapping.findOne({ where: { infoId: id } });
    await info.update({
      image: infoImage,
      title: infoTitle,
      header: infoHeader,
      listTitle,
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

    if (data.listItems) {
      await ListItemMapping.destroy({
        where: { subInfoId: id },
      });
      const listItems = JSON.parse(data.listItems);
      for (let item of listItems) {
        await ListItemMapping.create({
          value: item.value,
          subInfoId: subIndustry.id,
        });
      }
    }

    if (data.infoParagraphs) {
      await InfoParagraphMapping({
        where: { subInfoId: id },
      });
      const paragraphs = JSON.parse(data.infoParagraphs);
      for (let paragraph of paragraphs) {
        await InfoParagraphMapping.create({
          value: paragraph.value,
          subInfoId: subIndustry.id,
        });
      }
    }
    await subIndustry.reload();

    const created = await SubIndustryMapping.findByPk(
      subIndustry.id,
      rowsWithParagraphs
    );

    return created;
  }

  async delete(id) {
    const subIndustry = await SubIndustryMapping.findByPk(id);
    if (!subIndustry) {
      throw new Error('Подиндустрия не найдена в БД');
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
