import { Request, Response } from 'express';

import * as branchService from '../services/branch.service';
import { OK } from '../core/success.response';

export class BranchController {
  static async getBranches(req: Request, res: Response) {
    return OK({
      res,
      message: 'App settings fetched successfully',
      metadata: await branchService.getBranches(),
    });
  }

  static async getBranchDetails(req: Request, res: Response) {
    return OK({
      res,
      message: 'App settings fetched successfully',
      metadata: await branchService.getBranchDetails(req.params.id),
    });
  }

  static async updateBranch(req: Request, res: Response) {
    return OK({
      res,
      message: 'App settings updated successfully',
      metadata: await branchService.updateBranch(req.params.id, req.body),
    });
  }

  static async createBranch(req: Request, res: Response) {
    return OK({
      res,
      message: 'App settings created successfully',
      metadata: await branchService.createBranch(req.body),
    });
  }

  static async deleteBranch(req: Request, res: Response) {
    return OK({
      res,
      message: 'App settings deleted successfully',
      metadata: await branchService.deleteBranch(req.params.id),
    });
  }
}
