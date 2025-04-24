import mongoose from 'mongoose';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { generateTransactionId } from '../../utils/generateTransactionId';
import { Payment } from '../payment/payment.model';
import { CustomError } from '../../utils/CustomError';
import { QueryBuilder } from '../../utils/QueryBuilder';

const createOrderIntoDB = async (
  payload: Partial<IOrder>,
  authUser: any
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (payload.products) {
      for (const productItem of payload.products) {
        const product = await Product.findById(productItem.product).session(
          session
        );

        if (product) {
          if (product.stock < productItem.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
          }
          product.stock -= productItem.quantity;
          await product.save({ session });
        } else {
          throw new Error(`Product not found: ${productItem.product}`);
        }
      }
    }

    // Create the order
    const order = new Order({
      ...payload,
      user: authUser.userId,
    });

    const createdOrder = await order.save({ session });
    await createdOrder.populate('user products.product');

    const transactionId = generateTransactionId();

    const payment = new Payment({
      user: authUser.userId,
      order: createdOrder._id,
      method: payload.paymentMethod,
      transactionId,
      amount: createdOrder.finalAmount,
    });

    await payment.save({ session });

    let result;

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find().populate('user products.product'),
    query
  )
    .search(['user.name', 'user.email', 'products.product.name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  const meta = await orderQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

const getOrderDetailsFromDB = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('user products.product');
  if (!order) {
    throw new CustomError(404, 'Order not Found');
  }

  order.payment = await Payment.findOne({ order: order._id });
  return order;
};

const getMyOrdersFromDB = async (
  query: Record<string, unknown>,
  authUser: any
) => {
  const orderQuery = new QueryBuilder(
    Order.find({ user: authUser.userId })
      .populate({
        path: 'user',
        select: 'name email role status',
      })
      .populate({
        path: 'products.product',
        select: 'name price brand category images dosageForm expiryDate createdAt',
      }),
    query
  )
    .search(['user.name', 'user.email', 'products.product.name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  const meta = await orderQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

export const orderServices = {
  createOrderIntoDB,
  getOrderDetailsFromDB,
  getMyOrdersFromDB,
  getAllOrdersFromDB,
};
