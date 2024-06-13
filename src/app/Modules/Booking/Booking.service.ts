/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppErrors';
import { Bike } from '../Bike/Bike.model';
import { TRental } from './Booking .interface';
import { Rental } from './Booking.module';
import mongoose, { Types } from 'mongoose';

const createRentalIntoDB = async (id: string, payload: TRental) => {
  payload.userId = new Types.ObjectId(id);

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

const returnBikeCalculationIntoDB = async (id: string) => {
  const rentalsData = await Rental.findById(id);
  if (!rentalsData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rental not found');
  }
  const { startTime } = rentalsData;
  const newData: Record<string, unknown> = {};
  const newDate = new Date();
  const startDateTime = new Date(startTime);

  const timeDiffMilliseconds = newDate.getTime() - startDateTime.getTime();
  const timeDiffHours = Math.floor(timeDiffMilliseconds / (1000 * 60 * 60));
  const timeDiffMinutes = Math.floor(
    (timeDiffMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  const pricePerHour = 15;
  const totalAmount =
    timeDiffHours * pricePerHour + (timeDiffMinutes / 60) * pricePerHour;

  newData.totalCost = totalAmount;
  newData.returnTime = newDate;
  newData.isReturned = false;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const result = await Rental.findByIdAndUpdate(
      id,
      {
        totalCost: totalAmount,
        returnTime: newDate,
        isReturned: true,
      },
      { new: true, session },
    );
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to calculate');
    }

    const bikeResult = await Bike.findByIdAndUpdate(
      rentalsData.bikeId,
      { isAvailable: true },
      { new: true, session },
    );
    if (!bikeResult) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to calculate');
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
  returnBikeCalculationIntoDB,
};
