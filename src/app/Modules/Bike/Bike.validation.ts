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

export const BikeValidationSchema = {
  BikeAddedSchema,
};
