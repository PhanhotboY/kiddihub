import { Router } from 'express';
import { SchoolController } from '../../controllers/school.controller';
import { authenticationV2 } from '@middlewares/authentication';

const schoolRouter = Router();

schoolRouter.get('/', SchoolController.getSchools);
schoolRouter.get('/:id', SchoolController.getSchool);

schoolRouter.use(authenticationV2);

schoolRouter.post('/', SchoolController.createSchool);
schoolRouter.put('/:id', SchoolController.updateSchool);
schoolRouter.delete('/:id', SchoolController.deleteSchool);

module.exports = schoolRouter;
