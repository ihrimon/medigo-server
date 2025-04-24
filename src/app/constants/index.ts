import {
  TGender,
  TOrderStatus,
  TUserRole,
  TUserStatus,
} from '../interface';

export const UserRole: TUserRole[] = ['admin', 'customer'];
export const UserStatus: TUserStatus[] = ['active', 'blocked'];
export const Gender: TGender[] = ['Male', 'Female', 'Other'];

export const OrderStatus: TOrderStatus[] = [
  'Pending',
  'Processing',
  'Packed',
  'Shipped',
  'Delivered',
  'Cancelled',
];

