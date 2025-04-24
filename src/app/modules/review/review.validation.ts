import { z } from 'zod';

const AddReviewValidationSchema = z.object({
  body: z.object({
    reviewText: z.string(),
    rating: z.number().min(1).max(5),
    likes: z.number().default(0),
    replies: z.object({
      reviewText: z.string(),
      likes: z.number().default(0),
    }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    reviewText: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    likes: z.number().default(0).optional(),
    replies: z.object({
      reviewText: z.string().optional(),
      likes: z.number().default(0).optional(),
    }),
  }),
});

export const userValidation = {
  AddReviewValidationSchema,
  updateReviewValidationSchema,
};
