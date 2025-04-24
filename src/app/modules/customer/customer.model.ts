import { model, Schema } from 'mongoose';
import { IAddress, ICustomer } from './customer.interface';
import { Gender, UserStatus } from '../../constants';

// address schema
const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true, default: 'N/A' },
  city: { type: String, required: true, default: 'N/A' },
  state: { type: String, required: true, default: 'N/A' },
  zipCode: { type: String, required: true, default: 'N/A' },
  country: { type: String, required: true, default: 'N/A' },
});

// customer schema
const customerSchema = new Schema<ICustomer>(
  {
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
    },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true, default: 'N/A' },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: 'N/A' },
    profileImage: { type: String },
    occupation: { type: String },
    bio: { type: String, default: 'No bio Provided' },
    gender: { type: String, enum: Gender },
    birthDate: { type: Date },
    status: {
      type: String,
      enum: UserStatus,
      default: 'active',
    },
    address: { type: addressSchema},
    registrationDate: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export const Customer = model<ICustomer>('Customer', customerSchema);
