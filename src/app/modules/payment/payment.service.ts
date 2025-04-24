import { Payment } from './payment.model';
import { IPayment } from './payment.interface';

const createPaymentInDB = async (payload: IPayment): Promise<IPayment> => {
  const payment = await Payment.create(payload);
  return payment;
};

const getAllPaymentsFromDB = async (): Promise<IPayment[]> => {
  return await Payment.find().populate('user').populate('order');
};

const getMyPaymentHistoryFromDB = async (
  userId: string
): Promise<IPayment[]> => {
  return await Payment.find({ user: userId })
    .populate('user')
    .populate('order');
};

export const paymentService = {
  createPaymentInDB,
  getAllPaymentsFromDB,
  getMyPaymentHistoryFromDB,
};
