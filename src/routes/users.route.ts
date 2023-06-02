import { Router } from 'express';
import usersController from '../controllers/users.controller';

export const router = Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.saveUser);
router.delete('/:id', usersController.removeUser);
router.put('/', usersController.updateUser);
router.post('/signing', usersController.signing);

export default router;
