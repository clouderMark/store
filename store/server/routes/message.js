import express from 'express';
import MessageConroller from '../controlers/Message.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router();

// создать новое сообщение
router.post(
  '/user/create',
  MessageConroller.guestCreate
)

// администратор
router.get(
  '/admin/getall',
  authMiddleware,
  adminMiddleware,
  MessageConroller.adminGetAll
);

router.delete(
  '/admin/delete/:id([0-9]+)',
  authMiddleware,
  adminMiddleware,
  MessageConroller.adminDelete
)

router.get(
  '/admin/getone/:id([0-9]+)',
  authMiddleware,
  adminMiddleware,
  MessageConroller.adminGetOne
)

export default router;
