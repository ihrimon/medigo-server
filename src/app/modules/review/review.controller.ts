import { catchAsync } from '../../utils/catchAsync';
import { reviewServices } from './review.service';

const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewsFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'Reviews retrieved successfully!',
    data: result,
  });
});

const getSpecificReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getSpecificReviewFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Review retrieved successfully!',
    data: result,
  });
});

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'Review created successfully!',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const result = await reviewServices.updateReviewIntoDB(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: 'Review updated successfully!',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  await reviewServices.deleteReviewFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully!',
    data: null,
  });
});

const likeReview = catchAsync(async (req, res) => {
  const result = await reviewServices.likeReviewInDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Review liked successfully!',
    data: result,
  });
});

// const addReplyToReview = catchAsync(async (req, res) => {
//   const result = await reviewServices.addReplyToReviewInDB(
//     req.params.id,
//     req.body
//   );

//   res.status(200).json({
//     success: true,
//     message: 'Reply added to review successfully!',
//     data: result,
//   });
// });

export const reviewControllers = {
  getAllReviews,
  getSpecificReview,
  createReview,
  updateReview,
  deleteReview,
  likeReview,
  // addReplyToReview,
};
