import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser } from './user.controllers';

const router = Router();

router.get('/all', getAllUsers);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
