import SubscriptionModel from '../models/Subscription.js';
import AppError from '../errors/AppError.js'

class SubscriptionController {
  async create(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) throw new Error('Не указан email для подписки')
      const subscription = await SubscriptionModel.create({email});
      res.json(subscription);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new SubscriptionController();