import { z } from 'zod';

const RentalValidationSchema = z.object({
  body: z.object({
    bikeId: z.string(),
    startTime: z.string(),
  }),
});

export const ValidationRantalSchema = { RentalValidationSchema };
