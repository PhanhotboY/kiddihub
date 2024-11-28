import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { Review } from '../constants';

interface IRawReview {
  _id: string;
  rvw_user: ObjectId;
  rvw_school: ObjectId;
  rvw_rating: number;
  rvw_content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IReview = HydratedDocument<IRawReview>;

export interface IReviewAttrs {
  user: string;
  school: string;
  rating: number;
  content: string;
}

export interface IReviewResponseData {
  id: string;
  user: string;
  school: string;
  rating: number;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IReviewModel extends Model<IReview> {
  build(attrs: IReviewAttrs): Promise<IReview>;
}
