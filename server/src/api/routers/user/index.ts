import { Router } from 'express';
import { UserController } from '../../controllers/user.controller';
import { authenticationV2 } from '@middlewares/authentication';
import { AuthController } from '../../controllers/auth.controller';

const userRouter = Router();

// Require authentication routers
userRouter.use(authenticationV2);

userRouter.get('/me', UserController.getCurrentUser);

userRouter.post('/change-password', UserController.changePassword);
userRouter.put('/:userId', UserController.updateUser);

module.exports = userRouter;
