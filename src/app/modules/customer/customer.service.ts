import { CustomError } from '../../utils/CustomError';
import { ICustomer } from './customer.interface';
import { Customer } from './customer.model';

// create a new customer
const createCustomerIntoDB = async (payload: ICustomer) => {
  const customer = await Customer.findOne({ email: payload.email });
  if (customer)
    throw new CustomError(409, 'Customer with this email already exists!');

  return await Customer.create(payload);
};

// get all customers
const getAllCustomersFromDB = async () => {
  return await Customer.find().populate('user');
};

// get a single customer by ID
const getCustomerByIdFromDB = async (userId: string) => {
  return await Customer.findOne({ user: userId }).populate(
    'user',
    'name role status'
  );
};

// Update a customer by ID
const updateCustomerIntoDB = async (
  id: string,
  updateData: Partial<ICustomer>
) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedCustomer;
};

// Delete a customer by ID
const deleteCustomerFromDB = async (customerId: string) => {
  return await Customer.findByIdAndDelete(customerId);
};

export const customerServices = {
  createCustomerIntoDB,
  getAllCustomersFromDB,
  getCustomerByIdFromDB,
  updateCustomerIntoDB,
  deleteCustomerFromDB,
};
