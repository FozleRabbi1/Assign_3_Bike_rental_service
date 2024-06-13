import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('Invalid email address'),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    role: z.enum(['admin', 'user']),
  }),
});

const UserUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UserUpdateValidationSchema,
};
