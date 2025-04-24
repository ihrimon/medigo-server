import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    discountPrice: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    dosageForm: { type: String, required: true },
    strength: { type: [String], required: true, default: ['200mg', '300mg', '500mg'] },
    prescriptionRequired: { type: Boolean, default: false },
    expiryDate: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    averageReview: { type: Number, default: 4.7 },
    totalReviews: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', productSchema);
