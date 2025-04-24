import { Types } from 'mongoose';
import { TGender, TUserStatus } from '../../interface';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ICustomer {
  user: Types.ObjectId;
  fullName: string;
  username?: string;
  email: string;
  phone?: string;
  profileImage?: string;
  occupation?: string;
  bio?: string;
  gender?: TGender;
  birthDate?: Date;
  address?: IAddress;
  status: TUserStatus;
  registrationDate?: Date;
}
