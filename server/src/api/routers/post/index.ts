import { Router } from 'express';

import { PostController } from '@controllers/post.controller';
import { authenticationV2 } from '@middlewares/authentication';

const router = Router();

router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPost);

router.use(authenticationV2);

router.put('/:id', PostController.updatePost);
router.post('/:id/views', PostController.increasePostViews);
router.post('/', PostController.createPost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
