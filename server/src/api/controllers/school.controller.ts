import { NextFunction, Request, Response } from 'express';
import { OK } from '../core/success.response';
import * as SchoolService from '../services/school.service';

export class SchoolController {
  static async getSchools(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'Schools fetched successfully',
      metadata: await SchoolService.getSchools({
        address: {
          province: req.query.province as string,
          district: req.query.district as string,
        },
        name: req.query.name as string,
        age: {
          from: parseInt(req.query.from as string),
          to: parseInt(req.query.to as string),
        },
      }),
    });
  }

  static async createSchool(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'School created successfully',
      metadata: await SchoolService.createSchool(req.body),
    });
  }

  static async getSchool(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'School fetched successfully',
      metadata: await SchoolService.getSchoolById(req.params.id),
    });
  }

  static async updateSchool(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'School updated successfully',
      metadata: await SchoolService.updateSchool(req.params.id, req.body),
    });
  }

  static async deleteSchool(req: Request, res: Response, next: NextFunction) {
    return OK({
      res,
      message: 'School deleted successfully',
      metadata: await SchoolService.deleteSchool(req.params.id),
    });
  }
}
