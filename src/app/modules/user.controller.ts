import { Request, Response } from 'express';
import { userService } from './user.service';
import userValidationSchema from './validation/user.validation';

const createUser = async (req: Request, res: Response) => {
  // try {
  //   const userData = req.body;
  //   const validUserData = userValidationSchema.parse(userData);
  //   const result = await userService.createUserInDb(validUserData);
  //   console.log('ahare',result);
  //   res.status(500).json({
  //     success: true,
  //     message: 'User Create Successfully',
  //     data: result,
  //   });
  // } catch (error: unknown) {
  //   console.log("boooooooo",error);
  //   res.status(404).json({
  //     success: false,
  //     message: 'User Create Unsuccessful',
  //     error: error.message
  //   });
  // }

  try {
    const userData = req.body;
    const validUserData = userValidationSchema.parse(userData);
    // console.log( validUserData);
    const result = await userService.createUserInDb(validUserData);
    console.log('validData', result);
    res.status(200).json({
      success: true,
      message: 'User Create Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User Create Unsuccessful',
      data: error.message,
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
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const storeOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { userId } = req.params;

    console.log(userId, orderData);
    const result = await userService.storeOrderInDb(userId, orderData);
    res.status(500).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
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
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const newData = req.body;
    const result = await userService.updateUserInfoInDb(userId, newData);
    res.status(500).json({
      success: true,
      message: 'User data update Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
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
