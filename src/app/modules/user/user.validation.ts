import { z } from 'zod';

// register user validation schema
const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password should be at least 8 characters long')
      .max(20, 'Password should not exceed 20 characters'),
  }),
});

// login user validation schema
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' }),
  }),
});

// refresh token validation schema
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});


export const userValidation = {
  registerValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
