import express from 'express';
import SubscriptionController from '../controlers/Subscription.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router();

router.post(
  '/user/create',
  SubscriptionController.create
)

router.get(
  '/admin/getall',
  authMiddleware,
  adminMiddleware,
  SubscriptionController.adminGetAll
)

router.delete(
  '/admin/delete/:id([0-9]+)',
  authMiddleware,
  adminMiddleware,
  SubscriptionController.adminDelete
)

export default router;