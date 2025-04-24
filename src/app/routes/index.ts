import express from 'express';
import { authRoutes } from '../modules/user/user.route';
import { categoryRoutes } from '../modules/category/category.route';
import { productRoutes } from '../modules/product/product.route';
import { brandRoutes } from '../modules/brand/brand.route';
import { orderRoutes } from '../modules/order/order.route';
import { customerRoutes } from '../modules/customer/customer.route';
import { paymentRoutes } from '../modules/payment/payment.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/customers',
    route: customerRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/brands',
    route: brandRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
