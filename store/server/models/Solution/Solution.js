import {
  Solution as SolutionMapping,
  SolutionInfoImage as SolutionInfoImageMapping,
  SolutionInfoParagraph as SolutionInfoParagraphMapping,
  SolutionInfoTitle as SolutionInfoTitleMapping,
} from '../mapping.js';
import AppError from '../../errors/AppError.js';
import FileService from '../../services/File.js';
import { include } from './include.js';

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
    const { name, infoImagesUnique, infoParagraphs, infoTitle } = data;
    const solution = await SolutionMapping.create({ name });

    if (infoImges.length) {
      for (let i = 0; i < infoImges.length; i++) {
        const el = infoImges[i];
        const unique = infoImagesUnique[i];
        const image = FileService.save(el);

        await SolutionInfoImageMapping.create({
          image,
          unique,
          infoImageId: solution.id,
        });
      }
    }

    if (infoParagraphs) {
      const paragraphs = JSON.parse(infoParagraphs);
      for (let paragraph of paragraphs) {
        await SolutionInfoParagraphMapping.create({
          value: paragraph.value,
          relatedTo: paragraph.relatedTo,
          infoParagraphId: solution.id,
        });
      }
    }

    if (infoTitle) {
      const titles = JSON.parse(infoTitle);
      for (let title of titles) {
        await SolutionInfoTitleMapping.create({
          infoTitleId: solution.id,
          relatedTo: title.relatedTo,
          value: title.value,
        });
      }
    }

    return solution;
  }

  async update(id, data) {
    const solution = await SolutionMapping.findByPk(id);
    if (!solution) {
      throw new Error('Решение не найдена в БД');
    }
    const { name = solution.name } = data;
    await solution.update({ name });
    return solution;
  }

  async delete(id) {
    const solution = await SolutionMapping.findByPk(id);
    if (!solution) {
      throw new Error('Решение не найдена в БД');
    }
    await solution.destroy();
    return solution;
  }
}

export default new Solution();
