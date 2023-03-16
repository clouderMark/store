import sequelize from '../sequelize.js'
import { Subscription as SubscriptionMapping } from './mapping.js'

class Subscription {
  async create(data) {
    const {email} = data;
    const subscription = await SubscriptionMapping.create({email});

    return subscription;
  }

  async getAll(userId = null) {
    const options = {};
    if (userId) {
      options.where = {userId};
    }
    const emails = await SubscriptionMapping.findAll(options);
    return emails;
  }
}

export default new Subscription();