import { z } from 'zod';

// create product validation schema
const addProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Product name is required' }),
    slug: z.string(),
    brand: z.string({ required_error: 'Brand name is required' }),
    category: z.string({ required_error: 'Category name is required' }),
    price: z.number({ required_error: 'Product Price is required' }).min(0),
    discount: z.number().min(0).max(100).default(0).optional(),
    stock: z.number().min(0),
    dosageForm: z.string().min(1),
    strength: z.array(z.string()).min(1).optional(), 
    prescriptionRequired: z.boolean().optional(),
    expiryDate: z.string({required_error: 'Expiry date is required'}),
  }),
});

// update product validation schema
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Product name is required' }).optional(),
    slug: z.string().optional(),
    images: z.array(z.string().url()).optional(),
    brand: z.string({ required_error: 'Brand name is required' }).optional(),
    category: z
      .string({ required_error: 'Category name is required' })
      .optional(),
    price: z
      .number({ required_error: 'Product Price is required' })
      .min(0)
      .optional(),
    discount: z.number().min(0).max(100).default(0).optional(),    
    stock: z.number().min(0).optional(),
    dosageForm: z.string().min(1).optional(),
    strength: z.array(z.string()).min(1).optional(),
    prescriptionRequired: z.boolean().optional(),
    expiryDate: z.string().optional(),
  }),
});

export const productValidationSchema = {
  addProductValidationSchema,
  updateProductValidationSchema,
};
