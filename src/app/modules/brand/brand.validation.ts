import { z } from 'zod';

// add brand validation schema
const addBrandValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Brand name is required' }),
    established: z.number(),
    tagline: z.string(),
    stores: z.number(),
    products: z.number(),
    country: z.string(),
  }),
});

// update brand validation schema
const updateBrandValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    established: z.number().optional(),
    tagline: z.string().optional(),
    stores: z.number().optional(),
    products: z.number().optional(),
    country: z.string().optional(),
  }),
});

export const brandValidationSchema = {
  addBrandValidationSchema,
  updateBrandValidationSchema,
};
