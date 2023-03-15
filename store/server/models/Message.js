import { Message as MessageMapping } from '../models/mapping.js'
import AppError from '../errors/AppError.js'

class Message {
  async create(data) {
    const { company, name, email, phone, question, type } = data
    const order = await MessageMapping.create({
      company, name, email, phone, question, type
    })

    return true
  }
}

export default new Message();
