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

export const UserValidation = {
  UserValidationSchema,
};
