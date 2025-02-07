import { Request, Response, NextFunction } from 'express';
import { OK } from '../core/success.response';

import {
  createPage,
  getAllPages,
  getPublishedPages,
  getUnpublishedPages,
  updatePage,
  deletePage,
  increasePageViews,
  getPostDetail,
  createPageCategory,
  getPageCategories,
  createPageTemplate,
  getPageTemplates,
  updatePageTemplate,
  deletePageTemplate,
  updatePageCategory,
  deletePageCategory,
  getPageTemplate,
} from '../services/page.service';
import { authenticationV2 } from '@middlewares/authentication';

export class PageController {
  static async createPage(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Page created successfully',
      metadata: await createPage({
        ...req.body,
        thumbnail: req.file?.path || req.body.thumbnail,
      }),
    });
  }

  static async getPublishedPages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Pages fetched successfully',
      metadata: await getPublishedPages(req.query),
    });
  }

  static async getAllPages(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Pages fetched successfully',
      metadata: await getAllPages(req.query),
    });
  }

  static async getUnpublishedPages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Pages fetched successfully',
      metadata: await getUnpublishedPages(),
    });
  }

  static async getPage(req: Request, res: Response, next: NextFunction) {
    const page = await getPostDetail(req.params.id);
    if (!page.pst_isPublished) {
      await authenticationV2(req, res);
    }

    return OK({
      res,
      message: 'Page fetched successfully',
      metadata: page,
    });
  }

  static async updatePage(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Page updated successfully',
      metadata: await updatePage(req.params.id, {
        ...req.body,
        thumbnail: req.file?.path || req.body.thumbnail,
      }),
    });
  }

  static async increasePageViews(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page views increased successfully',
      metadata: await increasePageViews(req.params.id),
    });
  }

  static async deletePage(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Page deleted successfully',
      metadata: await deletePage(req.params.id),
    });
  }

  static async createPageCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page category created successfully',
      metadata: await createPageCategory(req.body),
    });
  }

  static async getPageCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page categories fetched successfully',
      metadata: await getPageCategories(),
    });
  }

  static async updatePageCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page category updated successfully',
      metadata: await updatePageCategory(req.params.id, req.body),
    });
  }

  static async deletePageCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page category deleted successfully',
      metadata: await deletePageCategory(req.params.id),
    });
  }

  static async createPageTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page template created successfully',
      metadata: await createPageTemplate(req.body),
    });
  }

  static async updatePageTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page template updated successfully',
      metadata: await updatePageTemplate(req.params.id, req.body),
    });
  }

  static async deletePageTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page template deleted successfully',
      metadata: await deletePageTemplate(req.params.id),
    });
  }

  static async getPageTemplates(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page templates fetched successfully',
      metadata: await getPageTemplates(),
    });
  }

  static async getPageTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return OK({
      res,
      message: 'Page template fetched successfully',
      metadata: await getPageTemplate(req.params.id),
    });
  }
}
