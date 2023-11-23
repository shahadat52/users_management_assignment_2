import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInDb = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

export const userService = {
  createUserInDb,
};
