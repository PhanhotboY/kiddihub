import { Request, Response } from 'express';

import * as UserService from '../services/user.service';

import { OK } from '../core/success.response';

export class UserController {
  static async getCurrentUser(req: Request, res: Response) {
    return OK({
      res,
      metadata: await UserService.getCurrentUser(req.user.userId),
    });
  }

  static async changePassword(req: Request, res: Response) {
    const { userId } = req.params;
    return OK({
      res,
      message: 'Password changed successfully',
      metadata: await UserService.changePassword(userId, req.body),
    });
  }

  static async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    return OK({
      res,
      message: 'User updated successfully',
      metadata: await UserService.updateUser(userId, req.body),
    });
  }
}
