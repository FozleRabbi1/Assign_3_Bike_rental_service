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
  const result = await Bike.find({ isAvailable: { $ne: false } });
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBikeIntoDB = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { isAvailable: false },
    { new: true, runValidators: true },
  );
  return result;
};

export const BikeServices = {
  AddedBikeDataIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeIntoDB,
};
