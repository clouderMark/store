import sequelize from '../sequelize.js'
import { Subscription as SubscriptionMapping } from './mapping.js'

class Subscription {
  async create(data) {
    const {email} = data;
    const subscription = await SubscriptionMapping.create({email});

    return subscription;
  }
}

export default new Subscription();