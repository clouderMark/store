import express from 'express';
import SubscriptionController from '../controlers/Subscription.js'

const router = new express.Router();

router.post(
  '/user/create',
  SubscriptionController.create
)

export default router;