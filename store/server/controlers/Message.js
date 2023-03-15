import AppError from "../errors/AppError.js"
import MessageModel from '../models/Message.js'

class Message {
  guestCreate = async(req, res, next) => {
    await this.create(req, res, next)
  }

  async create(req, res, next) {
    try {
      const { company, name, email, phone, question, type } = req.body
      if (!company) throw new Error('Не указано название компании')
      if (!name) throw new Error('Не указано имя пользователя')
      if (!email) throw new Error('Не указан email пользователя')
      if (!phone) throw new Error('Не указан телефон пользователя')
      if (!question) throw new Error('Не указан текст сообщения')
      if (!type) throw new Error('Не указан тип организации')

      const message = await MessageModel.create({company, name, email, phone, question, type});
      res.json(message)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }
}

export default new Message();