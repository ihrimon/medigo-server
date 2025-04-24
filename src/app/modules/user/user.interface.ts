import { TUserRole, TUserStatus } from '../../interface';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  status: TUserStatus;
  acceptTerms: boolean;
}
