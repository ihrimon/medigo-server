import express from 'express';
import { createPaymentZodSchema } from './payment.validation';
import isValid from '../../middlewares/isValid';
import isAuth from '../../middlewares/isAuth';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post(
  '/',
  isAuth('customer'),
  isValid(createPaymentZodSchema),
  paymentController.createPayment
);

router.get('/', isAuth('admin'), paymentController.getAllPayments);
router.get('/:id', isAuth('customer'), paymentController.getMyPaymentHistory);

export const paymentRoutes = router;
