import express from 'express';
import { productControllers } from './product.controller';
import isValid from '../../middlewares/isValid';
import { productValidationSchema } from './product.validation';
import isAuth from '../../middlewares/isAuth';
import { multerUpload } from '../../config';
import { parseBody } from '../../middlewares';

const router = express.Router();

router.post(
  '/add',
  multerUpload.array('images', 5),
  parseBody,
  isAuth('admin'),
  isValid(productValidationSchema.addProductValidationSchema),
  productControllers.addProduct
);
router.get('/', productControllers.getAllProducts);
router.get('/:id', productControllers.getSpecificProduct);
router.patch(
  '/update/:id',
  multerUpload.array('images', 5), 
  parseBody, 
  isAuth('admin'),
  isValid(productValidationSchema.updateProductValidationSchema),
  productControllers.updateProduct
);

router.delete('/:id', productControllers.deleteProduct);

export const productRoutes = router;
