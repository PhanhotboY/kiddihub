import { Router } from 'express';

import { ImageController } from '@controllers/image.controller';
import { authenticationV2 } from '@middlewares/authentication';
import { diskStorage } from '@configs/config.multer';

const imageRouter = Router();

imageRouter.get('/', ImageController.getImages);
imageRouter.get('/:imgName', ImageController.getImage);

imageRouter.use(authenticationV2);

imageRouter.post('/', diskStorage.array('image'), ImageController.createImage);

imageRouter.put('/:imgName', ImageController.updateImage);

imageRouter.delete('/:imgName', ImageController.deleteImage);

module.exports = imageRouter;
