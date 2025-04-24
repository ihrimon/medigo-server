import express from 'express';
import { brandControllers } from './brand.controller';
import isValid from '../../middlewares/isValid';
import { brandValidationSchema } from './brand.validation';
import isAuth from '../../middlewares/isAuth';
import { multerUpload } from '../../config';
import { parseBody } from '../../middlewares';

const router = express.Router();

router.post(
  '/add',
  isAuth('admin'),
  multerUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  parseBody,
  isValid(brandValidationSchema.addBrandValidationSchema),
  brandControllers.addCategory
);
router.get('/', brandControllers.getAllBrands);
router.patch(
  '/update/:id',
  isAuth('admin'),
  isValid(brandValidationSchema.updateBrandValidationSchema),
  brandControllers.updateBrand
);
router.delete('/:id', brandControllers.deleteBrand);

export const brandRoutes = router;
