import SubIndustryModel from '../models/SubIndustry/SubIndustry.js';
import AppError from '../errors/AppError.js';

class SubIndustry {
  async getAll(req, res, next) {
    try {
      const { subIindustryId = null } = req.params;
      const options = { subIindustryId };
      const subIndustries = await SubIndustryModel.getAll(options);

      res.json(subIndustries);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id подиндустрии');
      }
      const subIndustry = await SubIndustryModel.getOne(req.params.id);

      res.json(subIndustry);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error('Нет данных для создания');
      }
      const subIndustry = await SubIndustryModel.create(
        req.body,
        req.files?.cardImage,
        req.files?.headerImage,
        req.files?.infoImage,
        req.files?.opinionImage,
      );

      res.json(subIndustry);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    if (!req.params.id) {
      throw new Error('Не указан id подиндустрии');
    }
    if (Object.keys(req.body).length === 0) {
      throw new Error('Нет данных для обновления');
    }
    const subIndustry = await SubIndustryModel.update(
      req.params.id,
      req.body,
      req.files?.cardImage,
      req.files?.headerImage,
      req.files?.infoImage,
      req.files?.opinionImage,
    );

    res.json(subIndustry);
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id  подиндустрии');
      }
      const subIndustry = await SubIndustryModel.delete(req.params.id);
      res.json(subIndustry);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new SubIndustry();
