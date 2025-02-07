import { Router } from 'express';

import { PageController } from '@controllers/page.controller';
import { authenticationV2 } from '@middlewares/authentication';

const router = Router();

router.post('/:id/views', PageController.increasePageViews);

router.get('/templates/:id', PageController.getPageTemplate);
router.get('/templates', PageController.getPageTemplates);
router.get('/categories', PageController.getPageCategories);
router.get('/all', authenticationV2, PageController.getAllPages);
router.get('/:id', PageController.getPage);
router.get('/', PageController.getPublishedPages);

router.use(authenticationV2);

router.get('/unpublished', PageController.getUnpublishedPages);

router.post('/templates', PageController.createPageTemplate);
router.put('/templates/:id', PageController.updatePageTemplate);
router.delete('/templates/:id', PageController.deletePageTemplate);

router.post('/categories', PageController.createPageCategory);
router.put('/categories/:id', PageController.updatePageCategory);
router.delete('/categories/:id', PageController.deletePageCategory);

router.put('/:id', PageController.updatePage);
router.post('/', PageController.createPage);
router.delete('/:id', PageController.deletePage);

module.exports = router;
