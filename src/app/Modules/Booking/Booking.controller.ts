import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalService } from './Booking.service';

const createRental = catchAsync(async (req, res) => {
  const id = req?.user?.id;
  const result = await RentalService.createRentalIntoDB(id, req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});

export const RentalController = { createRental };
