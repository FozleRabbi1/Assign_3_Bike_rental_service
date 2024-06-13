/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppErrors';
import { Bike } from '../Bike/Bike.model';
import { TRental } from './Booking .interface';
import { Rental } from './Booking.module';
import mongoose from 'mongoose';

const createRentalIntoDB = async (id: string, payload: TRental) => {
  payload.userId = id;

  const bikeData = await Bike.findById(payload.bikeId);
  if (!bikeData?.isAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This bike is not available');
  }

  if (!bikeData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This bike is not available');
  }

  const isAxists = await Rental.findOne({ bikeId: payload.bikeId });
  if (isAxists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This bike is already booked');
  }

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const result = await Rental.create([payload], { session });
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Booking Failed!');
    }

    const isAvailable = await Bike.findByIdAndUpdate(
      payload.bikeId,
      { isAvailable: false },
      { session, new: true, runValidators: true },
    );
    if (!isAvailable) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Booking Failed!!');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const RentalService = {
  createRentalIntoDB,
};
