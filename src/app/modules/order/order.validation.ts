import { z } from 'zod';
import { OrderStatus, PaymentMethod } from '../../constants';

// billing info schema
const billingInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  streetAddress: z.string().min(1, 'Street Address is required'),
  city: z.string().min(1, 'City is required'),
  postcode: z.string().min(1, 'Postcode is required'),
});

// shipping info schema
const shippingInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  streetAddress: z.string().min(1, 'Street Address is required'),
  city: z.string().min(1, 'City is required'),
  postcode: z.string().min(1, 'Postcode is required'),
});

// order schema
export const createOrderSchema = z.object({
  body: z.object({
    billingInfo: billingInfoSchema,
    shippingInfo: shippingInfoSchema.optional(),
    transactionId: z.string().min(1, 'Transaction ID is required'),
    paymentMethod: z.enum([...PaymentMethod] as [string, ...string[]]),
    status: z
      .enum([...OrderStatus] as [string, ...string[]])
      .default('Processing'),
    orderTotal: z.number().positive(),
    taxAmount: z.number().positive(),
    shippingFee: z.number().positive(),
    discountAmount: z.number().positive().optional(),
    grandTotal: z.number().positive(),
    orderedAt: z.date().default(() => new Date()),
    deliveredAt: z.date().optional(),
  }),
});

export const orderValidationSchema = {
  createOrderSchema,
};
