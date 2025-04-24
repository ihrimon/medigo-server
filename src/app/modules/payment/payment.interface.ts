import { Types } from 'mongoose';

export interface IPayment {
  user: Types.ObjectId;
  order: Types.ObjectId;
  method: 'COD' | 'Online';
  status: 'Pending' | 'Paid' | 'Failed';
  transactionId?: string;
  amount: number;
}
