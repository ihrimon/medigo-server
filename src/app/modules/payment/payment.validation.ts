import { z } from 'zod';

export const createPaymentZodSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User is required' }),
    order: z.string({ required_error: 'Order is required' }),
    method: z.enum(['COD', 'Online'], {
      required_error: 'Payment method is required',
    }),
    status: z.enum(['Pending', 'Paid', 'Failed']).optional(),
    transactionId: z.string().optional(),
    amount: z.number({ required_error: 'Amount is required' }).min(0),
  }),
});
