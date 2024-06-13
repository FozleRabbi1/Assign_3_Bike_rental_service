import httpStatus from 'http-status';
import { AppError } from '../../errors/AppErrors';
import { TBike } from './Bike.inteface';
import { Bike } from './Bike.model';

const AddedBikeDataIntoDB = async (payload: TBike) => {
  const isBikeExists = await Bike.findOne({
    year: payload.year,
    model: payload.model,
  });
  if (isBikeExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'this bike is already exists');
  }
  const result = await Bike.create(payload);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};

export const BikeServices = {
  AddedBikeDataIntoDB,
  getAllBikeFromDB,
};
