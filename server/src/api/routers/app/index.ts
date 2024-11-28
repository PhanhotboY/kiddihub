import { Router } from 'express';
import { AppController } from '../../controllers/app.controller';
import { authenticationV2 } from '@middlewares/authentication';

const router = Router();

router.get('/settings', AppController.getAppSettings);

router.use(authenticationV2);

router.put('/settings', AppController.updateAppSettings);

module.exports = router;
