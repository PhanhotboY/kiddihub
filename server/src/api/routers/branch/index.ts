import { BranchController } from '@controllers/branch.controller';
import { authenticationV2 } from '@middlewares/authentication';
import { Router } from 'express';

const router = Router();

router.get('/', BranchController.getBranches);
router.get('/:id', BranchController.getBranchDetails);

router.use(authenticationV2);

router.post('/', BranchController.createBranch);
router.put('/:id', BranchController.updateBranch);
router.delete('/:id', BranchController.deleteBranch);

module.exports = router;
