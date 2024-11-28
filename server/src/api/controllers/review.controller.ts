import { NextFunction, Request, Response } from 'express';

import * as ReviewService from '../services/review.service';
import { OK } from '../core/success.response';

export default class ReviewController {
  static async createReview(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Review created successfully',
      metadata: await ReviewService.createReview(req.body),
    });
  }

  static async getReviews(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Reviews fetched successfully',
      metadata: await ReviewService.getReviews(req.params.id),
    });
  }

  static async updateReview(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Review updated successfully',
      metadata: await ReviewService.updateReview(req.params.id, req.body),
    });
  }

  static async deleteReview(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Review deleted successfully',
      metadata: await ReviewService.deleteReview(req.params.id),
    });
  }
}
