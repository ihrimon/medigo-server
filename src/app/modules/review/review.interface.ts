import { Types } from 'mongoose';

export interface IReview {
  productId: Types.ObjectId;
  reviewer: Types.ObjectId;
  reviewText: string;
  rating: number;
  verifiedPurchase?: boolean;
  likes?: number;
  replies?: {
    replyUser: Types.ObjectId;
    replyText: string;
    likes?: number;
  }[];
}
