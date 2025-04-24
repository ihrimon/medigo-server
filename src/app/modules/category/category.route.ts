import express from 'express';
import { categoryControllers } from './category.controller';
import isValid from '../../middlewares/isValid';
import { categoryValidationSchema } from './category.validation';
import isAuth from '../../middlewares/isAuth';
import { multerUpload } from '../../config';
import { parseBody } from '../../middlewares';

const router = express.Router();

router.post(
  '/add',
  isAuth('admin'),
  multerUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
  parseBody,
  isValid(categoryValidationSchema.addCategoryValidationSchema),
  categoryControllers.addCategory
);
router.get('/', categoryControllers.getAllCategories);
router.patch(
  '/update/:id',
  isAuth('admin'),
  isValid(categoryValidationSchema.updateCategoryValidationSchema),
  categoryControllers.updateCategory
);
router.delete('/:id', categoryControllers.deleteCategory);

export const categoryRoutes = router;
