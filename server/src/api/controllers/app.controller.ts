import { Request, Response } from 'express';

import * as appService from '../services/app.service';
import { OK } from '../core/success.response';

export class AppController {
  static async getAppSettings(req: Request, res: Response) {
    return OK({
      res,
      message: 'App settings fetched successfully',
      metadata: await appService.getAppSettings(),
    });
  }

  static async updateAppSettings(req: Request, res: Response) {
    return OK({
      res,
      message: 'App settings updated successfully',
      metadata: await appService.updateAppSettings(req.body),
    });
  }
}
