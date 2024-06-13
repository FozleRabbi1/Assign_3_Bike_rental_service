import { Schema, model } from 'mongoose';
import { TRental } from './Booking .interface';

const RentalSchema = new Schema<TRental>({
  userId: { type: String, ref: 'User' },
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  startTime: { type: Date },
  returnTime: { type: Date, default: null },
  totalCost: { type: Number, default: 0 },
  isReturned: { type: Boolean, default: false },
});

export const Rental = model<TRental>('Rental', RentalSchema);
