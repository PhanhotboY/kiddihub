import { Request, Response } from 'express';

import * as CategoryService from '../services/category.service';
import { OK } from '../core/success.response';

export class CategoryController {
  static async getCategories(req: Request, res: Response) {
    return OK({
      res,
      metadata: await CategoryService.getCategories(),
      message: 'Categories fetched successfully',
    });
  }

  static async getCategory(req: Request, res: Response) {
    return OK({
      res,
      metadata: await CategoryService.getCategory(req.params.id),
      message: 'Category fetched successfully',
    });
  }

  static async createCategory(req: Request, res: Response) {
    return OK({
      res,
      metadata: await CategoryService.createCategory(req.body),
      message: 'Category created successfully',
    });
  }

  static async updateCategory(req: Request, res: Response) {
    return OK({
      res,
      metadata: await CategoryService.updateCategory(req.params.id, req.body),
      message: 'Category updated successfully',
    });
  }

  static async deleteCategory(req: Request, res: Response) {
    return OK({
      res,
      metadata: await CategoryService.deleteCategory(req.params.id),
      message: 'Category deleted successfully',
    });
  }
}
