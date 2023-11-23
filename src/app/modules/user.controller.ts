import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    console.log(userData);
    const result = await userService.createUserInDb(userData);
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

export const userController = {
  createUser,
};
