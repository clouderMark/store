import express from 'express';
import MessageConroller from '../controlers/Message.js'

const router = new express.Router();

// создать новое сообщение
router.post(
  '/user/create',
  MessageConroller.guestCreate
)

export default router;
