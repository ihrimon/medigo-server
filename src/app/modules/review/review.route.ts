import express from 'express';
import { reviewControllers } from './review.controller';
import isAuth from '../../middlewares/isAuth';

const router = express.Router();

router.post('/', isAuth('customer'), reviewControllers.createReview);
router.get('/', reviewControllers.getAllReviews);
router.get('/:id', reviewControllers.getSpecificReview);
router.put('/:id', isAuth('admin', 'customer'), reviewControllers.updateReview);
router.delete(
  '/:id',
  isAuth('admin', 'customer'),
  reviewControllers.deleteReview
);
router.post('/:id/like', isAuth('customer'), reviewControllers.likeReview);
// router.post(
//   '/:id/reply',
//   isAuth('customer'),
//   reviewControllers.addReplyToReview
// );

export const reviewRoutes = router;
