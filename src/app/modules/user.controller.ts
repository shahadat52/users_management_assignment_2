import { Request, Response } from 'express';
import { userService } from './user.service';
import userValidationSchema from './validation/user.validation';
import { TOrder, TUpdateUser } from './user.interface';
import userInfoUpdateValidationSchema, {
  OrderValidationSchema,
} from './validation/userInfoUpdate.validation';

// Create User in database
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validUserData = userValidationSchema.parse(userData);
    const result = await userService.createUserInDb(validUserData);
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
const storeOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validProduct: TOrder = OrderValidationSchema.parse(orderData);
    const { userId } = req.params;
    const result = await userService.storeOrderInDb(userId, validProduct);
    res.status(500).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const userDelete = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.userDeleteFromDb(userId);
    res.status(500).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
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
    const validInfo = userInfoUpdateValidationSchema.parse(newData);
    const result = await userService.updateUserInfoInDb(userId, validInfo);
    res.status(500).json({
      success: true,
      message: 'User data update Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// Get all orders of specific user
const getAllOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getOrdersOfUserFromDb(userId);
    res.status(500).json({
      success: true,
      message: 'User orders retrieve Successfully',
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

// calculate total price of user
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.calculateTotalPriceInDb(userId);
    if (result.length === 0) {
      return res.status(500).json({
        success: true,
        message: 'User have no order',
        data: result,
      });
    }
    res.status(500).json({
      success: true,
      message: 'User total price of orders calculate successfully',
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
  getAllOrdersOfUser,
  calculateTotalPrice,
};
