import {
  Solution as SolutionMapping,
  SolutionInfoImage as SolutionInfoImageMapping,
  SolutionInfoParagraph as SolutionInfoParagraphMapping,
  SolutionInfoTitle as SolutionInfoTitleMapping,
} from '../mapping.js';
import AppError from '../../errors/AppError.js';
import FileService from '../../services/File.js';
import { include } from './include.js';
import saveInfoImages from './saveImages.js';
import createParagraphs from './createParagraphs.js';
import createTitle from './createTitle.js';
import updateInfoImages from './updateInfoImages.js';

class Solution {
  async getAll() {
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

  async create(data, infoImges) {
    const { name, infoImagesRelatedTo, infoParagraphs, infoTitle } = data;
    const solution = await SolutionMapping.create({ name });

    saveInfoImages(infoImges, infoImagesRelatedTo, solution.id);

    if (infoParagraphs) {
      createParagraphs(infoParagraphs, solution.id);
    }

    if (infoTitle) {
      createTitle(infoTitle, solution.id);
    }

    return solution;
  }

  async update(id, data, newInfoImages) {
    const solution = await SolutionMapping.findByPk(id, include);
    if (!solution) {
      throw new Error('Решение не найдена в БД');
    }
    const {
      name = solution.name,
      infoImageUrls,
      infoImagesRelatedTo,
      infoParagraphs,
      infoTitle,
    } = data;
    await solution.update({ name });

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

    return solution;
  }

  async delete(id) {
    const solution = await SolutionMapping.findByPk(id, include);

    if (!solution) {
      throw new Error('Решение не найдена в БД');
    }

    solution.infoImages.map((el) => FileService.delete(el.image));
    await solution.destroy();

    return solution;
  }
}

export default new Solution();
