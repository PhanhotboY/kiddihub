import { Schema, Types, model } from 'mongoose';
import { IReview, IReviewModel } from '../interfaces/review.interface';
import { formatAttributeName } from '../utils';
import { REVIEW, SCHOOL } from '../constants';

const ReviewSchema = new Schema<IReview, IReviewModel>(
  {
    rvw_school: {
      type: Types.ObjectId,
      ref: SCHOOL.DOCUMENT_NAME,
      required: true,
    },
    rvw_user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rvw_rating: { type: Number, required: true, unique: true, min: 0, max: 5 },
    rvw_content: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: REVIEW.COLLECTION_NAME,
  }
);

ReviewSchema.statics.build = (attrs: IReview) => {
  return ReviewModel.create(formatAttributeName(attrs, REVIEW.PREFIX));
};

export const ReviewModel = model<IReview, IReviewModel>(
  REVIEW.DOCUMENT_NAME,
  ReviewSchema
);
