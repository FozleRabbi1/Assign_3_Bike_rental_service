import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './Bike.service';

const addedBike = catchAsync(async (req, res) => {
  const result = await BikeServices.AddedBikeDataIntoDB(req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikeFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

export const BikeController = {
  addedBike,
  getAllBike,
};
