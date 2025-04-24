import { Types } from 'mongoose';

export interface IProduct {
  name: string;
  slug: string;
  description?: string;
  images: string[];
  brand: string;
  category: string;
  price: number;
  discount?: number;
  discountPrice?: number;
  stock: number;
  dosageForm: string; 
  strength?: string[];
  prescriptionRequired?: boolean;
  expiryDate: string;
  isActive?: boolean;
  averageReview?: number;
  totalReviews?: number;
}
