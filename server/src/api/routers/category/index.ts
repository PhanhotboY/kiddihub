import { CategoryController } from '@controllers/category.controller';
import { authenticationV2 } from '@middlewares/authentication';
import { Router } from 'express';

const router = Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategory);

router.use(authenticationV2);

router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
