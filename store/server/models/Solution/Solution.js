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

    saveInfoImages(infoImges, infoImagesUnique, solution.id);

    if (infoParagraphs) {
      const paragraphs = JSON.parse(infoParagraphs);
      for (let paragraph of paragraphs) {
        await SolutionInfoParagraphMapping.create({
          value: paragraph.value,
          relatedTo: paragraph.relatedTo,
          solutionId: solution.id,
        });
      }
    }

    if (infoTitle) {
      const titles = JSON.parse(infoTitle);
      for (let title of titles) {
        await SolutionInfoTitleMapping.create({
          solutionId: solution.id,
          relatedTo: title.relatedTo,
          value: title.value,
        });
      }
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
      infoImagesUnique,
      infoParagraphs,
      infoTitle,
    } = data;
    await solution.update({ name });

    if (newInfoImages && !infoImageUrls) {
      solution.infoImages.map((el) => FileService.delete(el.image));
      await SolutionInfoImageMapping.destroy({
        where: { solutionId: solution.id },
      });
    } else {
      let themNeedDelete;
      if (Array.isArray(infoImageUrls)) {
        themNeedDelete = solution.infoImages.filter(
          (el) => -1 == infoImageUrls.indexOf(el.image)
        );
      } else {
        themNeedDelete = solution.infoImages.filter(
          (el) => infoImageUrls !== el.image
        );
      }
      themNeedDelete.map(async (el) => {
        FileService.delete(el.image);
        await SolutionInfoImageMapping.destroy({ where: { image: el.image } });
      });
    }

    if (infoParagraphs) {
      await SolutionInfoParagraphMapping.destroy({
        where: { solutionId: solution.id },
      });
      const paragraphs = JSON.parse(infoParagraphs);
      for (let paragraph of paragraphs) {
        await SolutionInfoParagraphMapping.create({
          value: paragraph.value,
          relatedTo: paragraph.relatedTo,
          solutionId: solution.id,
        });
      }
    }

    if (infoTitle) {
      await SolutionInfoTitleMapping.destroy({
        where: { solutionId: solution.id },
      });
      const titles = JSON.parse(infoTitle);
      for (let title of titles) {
        await SolutionInfoTitleMapping.create({
          solutionId: solution.id,
          relatedTo: title.relatedTo,
          value: title.value,
        });
      }
    }

    saveInfoImages(newInfoImages, infoImagesUnique, solution.id);

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
