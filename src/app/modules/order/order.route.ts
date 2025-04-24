import { Router } from 'express';
import isAuth from '../../middlewares/isAuth';
import { orderController } from './order.controller';

const router = Router();

router.get('/my-orders', isAuth('customer'), orderController.getMyOrders);

router.get('/:orderId', isAuth('customer'), orderController.getOrderDetails);

router.post('/create', isAuth('customer'), orderController.createOrder);

router.get('/', isAuth('admin'), orderController.getAllOrders);

router.post('/create-checkout-session', isAuth('customer'), orderController.createCheckoutSession);

export const orderRoutes = router;
