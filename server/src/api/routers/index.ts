import express from 'express';
import { checkApiKey, checkPermission } from '../auth/checkApiKey';
import { pushLog2Discord } from '../middlewares/logger.middleware';
import { MailController } from '../controllers/email.controller';

const router = express.Router();

router.use(pushLog2Discord);
//check api key

router.get('/check-status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Connect established successfully!',
  });
});

router.get('/auth/verify-email', MailController.verifyEmail);

router.use(checkApiKey);
//check api key's permission
router.use(checkPermission('0000'));

router.use('/categories', require('./category'));
router.use('/profiles', require('./profile'));
router.use('/branches', require('./branch'));
router.use('/schools', require('./school'));
router.use('/reviews', require('./review'));
router.use('/images', require('./image'));
router.use('/email', require('./email'));
router.use('/users', require('./user'));
router.use('/pages', require('./page'));
router.use('/rbac', require('./rbac'));
router.use('/auth', require('./auth'));
router.use('/app', require('./app'));

module.exports = router;
