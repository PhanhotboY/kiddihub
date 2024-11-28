import { Router } from 'express';

import ReviewController from '../../controllers/review.controller';

const reviewRouter = Router();

reviewRouter.post('/', ReviewController.createReview);
reviewRouter.get('/:id', ReviewController.getReviews);
reviewRouter.put('/:id', ReviewController.updateReview);
reviewRouter.delete('/:id', ReviewController.deleteReview);

module.exports = reviewRouter;
