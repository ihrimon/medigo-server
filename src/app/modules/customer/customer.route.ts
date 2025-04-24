import express from 'express';
import isValid from '../../middlewares/isValid';
import isAuth from '../../middlewares/isAuth';
import { customerValidation } from './customer.validation';
import { customerControllers } from './customer.controller';

const router = express.Router();

router.post(
  '/create',
  isAuth('customer'),
  isValid(customerValidation.createCustomerSchema),
  customerControllers.createCustomer
);
router.get('/', isAuth('admin'), customerControllers.getAllCustomers);
router.get('/:userId', isAuth('admin', 'customer'), customerControllers.getCustomerById);
router.patch(
  'update/:id',
  isAuth('customer'),
  customerControllers.updateCustomer
);
router.delete('/:id', isAuth('customer'), customerControllers.deleteCustomer);

export const customerRoutes = router;
