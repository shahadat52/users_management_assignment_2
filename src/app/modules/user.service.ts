import { TOrder, TUpdateUser, TUser } from './user.interface';
import { UserM } from './user.model';

// Create a user in database
const createUserInDb = async (userData: TUser) => {
  if (await UserM.isUserExists(userData.userId)) {
    throw new Error('Student already exists');
  }

  const result = await UserM.create(userData);
  return result;
};

//All users data retrieve from database
const getAllUsersDataFromDb = async () => {
  // const result = await UserM.find();
  const result = await UserM.aggregate([
    { $match: {} },
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

//single user data retrieve from database
const getSingleUsersDataFromDb = async (id: string) => {
  const userId = Number(id);
  if (await UserM.isUserExists(userId)) {
    const userId = Number(id);
    const result = await UserM.aggregate([
      { $match: { userId: userId } },
      { $project: { password: 0 } },
    ]);

    return result;
  }

  throw new Error('User not available');
};

//store order
const storeOrderInDb = async (id: string, orderData: TOrder) => {
  const userId = Number(id);
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.updateOne(
      { userId: id },
      {
        $push: {
          orders: orderData,
        },
      },
    );
    return result;
  }
  throw new Error('User not available');
};

//user delete
const userDeleteFromDb = async (id: string) => {
  const userId = Number(id);
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.deleteOne({ userId: userId });
    return result;
  }
  throw new Error('User not available');
};

//update user information
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserInfoInDb = async (id: string, newData: TUpdateUser) => {
  const userId = Number(id);
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.updateOne({ userId: userId }, { $set: newData });
    return result;
  }
  throw new Error('User not available');
};

const getOrdersOfUserFromDb = async (id: string) => {
  const userId = Number(id);
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.aggregate([
      { $match: { userId: userId } },
      { $project: { orders: 1 } },
    ]);
    return result;
  }
  throw new Error('User not found');
};

const calculateTotalPriceInDb = async (id: string) => {
  const userId = Number(id);
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.aggregate([
      { $match: { userId: userId } },
      { $project: { orders: 1 } },
      { $unwind: '$orders' },
      {
        $project: {
          total: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: '$total' },
        },
      },
    ]);
    return result;
  }
  throw new Error('User not found');
};

export const userService = {
  createUserInDb,
  getAllUsersDataFromDb,
  getSingleUsersDataFromDb,
  storeOrderInDb,
  userDeleteFromDb,
  updateUserInfoInDb,
  getOrdersOfUserFromDb,
  calculateTotalPriceInDb,
};
