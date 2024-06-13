import { Types } from 'mongoose';

export type TRental = {
  userId: string;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
};
