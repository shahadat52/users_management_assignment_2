import { TOrder, TUser } from './user.interface';
import { UserModel } from './user.model';

// Create a user in database
const createUserInDb = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

//All users data retrieve from database
const getAllUsersDataFromDb = async () => {
  const result = await UserModel.find();
  return result;
};

//All users data retrieve from database
const getSingleUsersDataFromDb = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const storeOrderInDb = async (id: string, orderData: TOrder) => {
  // console.log(orderData);
  const result = await UserModel.updateOne(
    { userId: id },
    {
      $push: {
        orders: orderData,
      },
    },
  );
  console.log(result);
  return result;
};

const userDeleteFromDb = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId: userId });
  return result;
};

const updateUserInfoInDb = async (userId: string, newData) => {
  const result = await UserModel.findOne({ userId: userId }, { $set: newData });
  return result;
};

export const userService = {
  createUserInDb,
  getAllUsersDataFromDb,
  getSingleUsersDataFromDb,
  storeOrderInDb,
  userDeleteFromDb,
  updateUserInfoInDb,
};
