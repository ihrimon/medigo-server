import { Types, Document } from 'mongoose';
import { IPayment } from '../payment/payment.interface';

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: IOrderProduct[];
  subTotal: number;
  deliveryCharge: number;
  finalAmount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  shippingAddress: string;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  payment?: IPayment | null;
}
