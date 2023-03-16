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

  async getAll(userId = null) {
    const options = {};
    if (userId) {
      options.where = {userId};
    }
    const messages = await MessageMapping.findAll(options);
    return messages;
  }

  async delete(id) {
    let message = await MessageMapping.findByPk(id);

    if (!message) {
      throw new Error('Сообщение не найдено');
    }
    await message.destroy();
    return message;
  }

  async getOne(id, userId = null) {
    const options = {
      where: {id},
    };
    if (userId) options.where.userId = userId;
    const message = await MessageMapping.findOne(options);

    if (!message) {
      throw new Error('Сообщение не найдено');
    }

    return message;
  }
}

export default new Message();
