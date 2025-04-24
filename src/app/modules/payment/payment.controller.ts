import { IPayment } from './payment.interface';
import { catchAsync } from '../../utils/catchAsync';
import { paymentService } from './payment.service';

const createPayment = catchAsync(async (req, res) => {
  const result = await paymentService.createPaymentInDB(req.body);

  res.status(201).json({
    success: true,
    message: 'Payment created successfully!',
    data: result,
  });
});

const getAllPayments = catchAsync(async (req, res) => {
  const result = await paymentService.getAllPaymentsFromDB();

  res.status(200).json({
    success: true,
    message: 'Payments retrieved successfully!',
    data: result,
  });
});

const getMyPaymentHistory = catchAsync(async (req, res) => {
  const result = await paymentService.getMyPaymentHistoryFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Payment retrieved successfully!',
    data: result,
  });
});

export const paymentController = {
  createPayment,
  getAllPayments,
  getMyPaymentHistory,
};
