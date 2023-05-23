import {
  Solution as SolutionMapping,
  SolutionInfoParagraph as SolutionInfoParagraphMapping,
  SolutionInfoTitle as SolutionInfoTitleMapping,
  SolutionOpinion as OpinionMapping,
  SolutionOpinionItem as OpinionItemMapping,
  SolutionOpinionParagraph as OpinionParagraphMapping,
} from '../mapping.js';
import AppError from '../../errors/AppError.js';
import FileService from '../../services/File.js';
import { include } from './include.js';
import saveInfoImages from './saveImages.js';
import createParagraphs from './createParagraphs.js';
import createTitle from './createTitle.js';
import updateInfoImages from './updateInfoImages.js';
import createOpinionListItems from './createOpinionListItems.js';
import createOpinionParagraphs from './createOpinionParagraphs.js';

class Solution {
  async getAll() {
    const solutions = await SolutionMapping.findAll({attributes: ['name', 'id']});
    return solutions;
  }

  async getAllWithImages() {
    const solutions = await SolutionMapping.findAll();
    return solutions;
  }

  async getOne(id) {
    const solution = await SolutionMapping.findByPk(id, include);
    if (!solution) {
      throw new Error('Решение не найдена в БД');
    }
    return solution;
  }

  async create(data, infoImges, opinionImg, cardImg) {
    const opinionImage = FileService.save(opinionImg) ?? '';
    const cardImage = FileService.save(cardImg) ?? '';
    const {
      name,
      infoImagesRelatedTo,
      infoParagraphs,
      infoTitle,
      opinionTitle = '',
      opinionListTitle = '',
      opinionName = '',
      opinionPhone = '',
      opinionFax = '',
      opinionEmail = '',
    } = data;
    const solution = await SolutionMapping.create({ name, cardImage });

    saveInfoImages(infoImges, infoImagesRelatedTo, solution.id);

    if (infoParagraphs) {
      createParagraphs(infoParagraphs, solution.id);
    }

    if (infoTitle) {
      createTitle(infoTitle, solution.id);
    }

    OpinionMapping.create({
      title: opinionTitle,
      listTitle: opinionListTitle,
      name: opinionName,
      image: opinionImage,
      phone: opinionPhone,
      fax: opinionFax,
      email: opinionEmail,
      opinionId: solution.id,
    });

    if (data.opinionListItems) {
      createOpinionListItems(data.opinionListItems, solution.id);
    }

    if (data.opinionParagraphs) {
      createOpinionParagraphs(data.opinionParagraphs, solution.id);
    }

    await solution.reload();
    const created = await SolutionMapping.findByPk(solution.id);

    return created;
  }

  async update(id, data, newInfoImages, opinionImg, cardImg) {
    const solution = await SolutionMapping.findByPk(id, include);
    if (!solution) {
      throw new Error('Решение не найдена в БД');
    }
    const file1 = FileService.save(opinionImg);
    const file2 = FileService.save(cardImg);

    if (file1 && solution.opinion.image) {
      FileService.delete(solution.opinion.image);
    }

    if (file2 && solution.cardImage) {
      FileService.delete(solution.cardImage);
    }

    const {
      name = solution.name,
      cardImage = file2 ? file2 : solution.cardImage,
      infoImageUrls,
      infoImagesRelatedTo,
      infoParagraphs,
      infoTitle,
      opinionImage = file1 ? file1 : solution.opinion.image,
      opinionTitle = solution.opinion.title,
      opinionListTitle = solution.opinion.listTitle,
      opinionName = solution.opinion.name,
      opinionPhone = solution.opinion.phone,
      opinionFax = solution.opinion.fax,
      opinionEmail = solution.opinion.email,
    } = data;
    await solution.update({ name, cardImage });

    updateInfoImages(
      newInfoImages,
      infoImageUrls,
      solution.infoImages,
      infoImagesRelatedTo,
      solution.id
    );

    await SolutionInfoParagraphMapping.destroy({
      where: { solutionId: solution.id },
    });

    if (infoParagraphs) {
      createParagraphs(infoParagraphs, solution.id);
    }

    await SolutionInfoTitleMapping.destroy({
      where: { solutionId: solution.id },
    });

    if (infoTitle) {
      createTitle(infoTitle, solution.id);
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
      await OpinionItemMapping.destroy({ where: { solutionOpinionId: id } });
      createOpinionListItems(data.opinionListItems, id);
    }

    if (data.opinionParagraphs) {
      await OpinionParagraphMapping.destroy({
        where: { solutionOpinionId: id },
      });
      createOpinionParagraphs(data.opinionParagraphs, id);
    }

    await solution.reload();
    const created = await SolutionMapping.findByPk(solution.id);

    return created;
  }

  async delete(id) {
    const solution = await SolutionMapping.findByPk(id, include);

    if (!solution) {
      throw new Error('Решение не найдена в БД');
    }

    solution.infoImages.map((el) => FileService.delete(el.image));
    if (solution.opinion.image) {
      FileService.delete(solution.opinion.image);
    }

    if (solution.cardImage) {
      FileService.delete(solution.cardImage);
    }

    await solution.destroy();

    return solution;
  }
}

export default new Solution();
