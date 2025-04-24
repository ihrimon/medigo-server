import { Schema,  model } from 'mongoose';
import { IOrder } from './order.interface';
import { Product } from '../product/product.model';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        }
      },
    ],
    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Online'],
      default: 'Online',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate total, discount, delivery charge, and final price
orderSchema.pre('validate', async function (next) {
  const order = this;

  // Step 1: Initialize total amount
  let totalAmount = 0;
  let finalDiscount = 0;

  // Step 2: Calculate total amount for products
  for (let item of order.products) {
    const product = await Product.findById(item.product);

    if (!product) {
      return next(new Error(`Product not found!.`));
    }

    let productPrice = product.price;

    const price = productPrice * item.quantity;
    totalAmount += price;
  }

    const isDhaka = order?.shippingAddress?.toLowerCase()?.includes('dhaka');
  const deliveryCharge = isDhaka ? 60 : 120;

  order.subTotal = totalAmount;
  order.deliveryCharge = deliveryCharge;
  order.finalAmount = totalAmount - finalDiscount + deliveryCharge;

  next();
});

export const Order = model<IOrder>('Order', orderSchema);
