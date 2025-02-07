import { Request, Response } from 'express';

import * as ImageService from '../services/image.service';

import { OK } from '../core/success.response';

export class ImageController {
  static async getImages(req: Request, res: Response) {
    return OK({
      res,
      metadata: await ImageService.getImages(),
    });
  }

  static async getImage(req: Request, res: Response) {
    return OK({
      res,
      metadata: await ImageService.getImage(req.params.imgName),
    });
  }

  static async createImage(req: Request, res: Response) {
    return OK({
      res,
      message: 'Image created successfully',
      metadata: await ImageService.createImage(
        req.files as Express.Multer.File[]
      ),
    });
  }

  static async updateImage(req: Request, res: Response) {
    return OK({
      res,
      message: 'Image updated successfully',
      metadata: await ImageService.updateImage(req.params.imgName, req.body),
    });
  }

  static async deleteImage(req: Request, res: Response) {
    return OK({
      res,
      message: 'Image deleted successfully',
      metadata: await ImageService.deleteImage(req.params.imgName),
    });
  }
}
