import { z } from 'zod';

const BikeAddedSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    isAvailable: z.boolean().default(true),
    cc: z.number(),
    year: z.number(),
    model: z.string(),
    brand: z.string(),
  }),
});
const BikeUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().optional(),
    cc: z.number().optional(),
    year: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const BikeValidationSchema = {
  BikeAddedSchema,
  BikeUpdateSchema,
};
