import { z } from 'zod';

// add category validation schema
const addCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({required_error: 'Category name is required'}),
    items: z.number().min(1),
  }),
});

// update category validation schema
const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    items: z.number().min(1),
  }),
});

export const categoryValidationSchema = {
  addCategoryValidationSchema,
  updateCategoryValidationSchema,
};
