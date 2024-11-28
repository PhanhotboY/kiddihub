import { getReturnData } from '@utils/index';
import { NotFoundError } from '../core/errors';
import { IReviewAttrs } from '../interfaces/review.interface';
import { ReviewModel } from '../models/review.model';

const createReview = async (review: IReviewAttrs) => {
  const newReview = await ReviewModel.build({
    content: review.content,
    rating: review.rating,
    school: review.school,
    user: review.user,
  });
  return getReturnData(newReview);
};

const getReviews = async (schoolId: string) => {
  const reviews = await ReviewModel.find({ rvw_school: schoolId });
  return getReturnData(reviews);
};

const updateReview = async (reviewId: string, review: IReviewAttrs) => {
  const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, review, {
    new: true,
  });
  if (!updatedReview) {
    throw new NotFoundError('Review not found');
  }

  return getReturnData(updatedReview);
};

const deleteReview = async (reviewId: string) => {
  const res = await ReviewModel.findByIdAndDelete(reviewId);
  if (!res) {
    throw new NotFoundError('Review not found');
  }

  return getReturnData(res);
};

export { createReview, getReviews, updateReview, deleteReview };
