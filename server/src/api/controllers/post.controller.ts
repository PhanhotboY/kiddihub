import { Request, Response, NextFunction } from 'express';
import { OK } from '../core/success.response';

import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  increasePostViews,
  getPostDetail,
} from '../services/post.service';

export class PostController {
  static async createPost(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Post created successfully',
      metadata: await createPost(req.body),
    });
  }

  static async getPosts(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Posts fetched successfully',
      metadata: await getPosts(),
    });
  }

  static async getPost(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Post fetched successfully',
      metadata: await getPostDetail(req.params.id),
    });
  }

  static async updatePost(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Post updated successfully',
      metadata: await updatePost(req.params.id, req.body),
    });
  }

  static async increasePostViews(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Post views increased successfully',
      metadata: await increasePostViews(req.params.id),
    });
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Post deleted successfully',
      metadata: await deletePost(req.params.id),
    });
  }
}
