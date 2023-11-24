import { Request, Response } from 'express';
import { userService } from './user.service';
import userValidationSchema from './validation/user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validUserData = userValidationSchema.parse(userData);
    const result = await userService.createUserInDb(validUserData);
    res.status(500).json({
      success: true,
      message: 'User Create Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User Create Unsuccessful',
      data: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersDataFromDb();
    res.status(500).json({
      success: true,
      message: 'User Retrieve Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User Retrieve Unsuccessful',
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingleUsersDataFromDb(userId);
    res.status(500).json({
      success: true,
      message: ' Single User Retrieve Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Single User Retrieve Unsuccessful',
      data: error,
    });
  }
};
const storeOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { userId } = req.params;
    // console.log(userId, orderData);
    const result = await userService.storeOrderInDb(userId, orderData);
    res.status(500).json({
      success: true,
      message: ' Order update Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Order Update Unsuccessful',
      data: error,
    });
  }
};

const userDelete = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const result = await userService.userDeleteFromDb(userId);
    res.status(500).json({
      success: true,
      message: 'User delete Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User delete Unsuccessful',
      data: error,
    });
  }
};
const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    console.log(userId);
    const result = await userService.userDeleteFromDb(userId);
    res.status(500).json({
      success: true,
      message: 'User delete Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User delete Unsuccessful',
      data: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  storeOrder,
  userDelete,
  updateUserInfo,
};
