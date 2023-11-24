import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUserInfo);
router.put('/:userId/orders', userController.storeOrder);
router.delete('/:userId', userController.userDelete);
// router.get('/:userId/orders', userController.)

export const userRouters = router;
