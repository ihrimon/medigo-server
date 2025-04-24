export type TUserRole = 'admin' | 'customer';
export type TUserStatus = 'active' | 'blocked';

export type TCustomerStatus = 'in-progress' | 'blocked';
export type TGender = 'Male' | 'Female' | 'Other';

export type TPaymentMethod = 'Stripe';

export type TOrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface IImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}

