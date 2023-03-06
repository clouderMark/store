import AreaModel from '../models/Area.js'
import AppError from '../errors/AppError.js'

class Area {
  async getAll(req, res, next) {
      try {
          const areas = await AreaModel.getAll()
          res.json(areas)
      } catch(e) {
          next(AppError.badRequest(e.message))
      }
  }

  async getOne(req, res, next) {
      try {
          if (!req.params.id) {
              throw new Error('Не указан id области')
          }
          const area = await AreaModel.getOne(req.params.id)
          res.json(area)
      } catch(e) {
          next(AppError.badRequest(e.message))
      }
  }

  async create(req, res, next) {
      try {
          const area = await AreaModel.create(req.body)
          res.json(area)
      } catch(e) {
          next(AppError.badRequest(e.message))
      }
  }

  async update(req, res, next) {
      try {
          if(!req.params.id) {
              throw new Error('Не указан id области')
          }
          const area = await AreaModel.update(req.params.id, req.body)
          res.json(area)
      } catch(e) {
          next(AppError.badRequest(e.message))
      }
  }

  async delete(req, res, next) {
      try {   
          if (!req.params.id) {
              throw new Error('Не указан id области')
          }
          const area = await AreaModel.delete(req.params.id)
          res.json(area)
      } catch(e)  {
          next(AppError.badRequest(e.message))
      }
  }
}

export default new Area()