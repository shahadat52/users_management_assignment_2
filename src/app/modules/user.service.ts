import { TOrder, TUser } from './user.interface';
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
    { $project: { userName: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

//single user data retrieve from database
const getSingleUsersDataFromDb = async (id: string) => {
  if (await UserM.isUserExists(id)) {
    const userId = Number(id);
    const result = await UserM.aggregate([
      { $match: { userId: userId } },
      { $project: { password: 0 } },
    ]);
    console.log('hmmmm', result);
    return result;
  } else {
    return null;
  }
};

//store order
const storeOrderInDb = async (id: string, orderData: TOrder) => {
  console.log(typeof id);
  if (await UserM.isUserExists(id)) {
    const result = await UserM.updateOne(
      { userId: id },
      {
        $push: {
          orders: orderData,
        },
      },
    );
    console.log(result);
    return result;
  }
};

//user delete
const userDeleteFromDb = async (id: string) => {
  const uId = Number(id);
  if (await UserM.isUserExists(uId)) {
    const result = await UserM.deleteOne({ userId: uId });
    return result;
  }
};

//update user information
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserInfoInDb = async (id: number, newData: any) => {
  const userId = Number(id);
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.updateOne({ userId: userId }, { $set: newData });
    return result;
  }
};

const getOrdersOfUserFromDb = async (id: string) => {
  const userId = Number(id);
  console.log(userId);
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.aggregate([
      { $match: { userId: userId } },
      { $project: { orders: 1 } },
    ]);
    return result;
  }
};

const calculateTotalPriceInDb = async (id: string) => {
  const userId = Number(id);

  const result = await UserM.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1 } },
    { $unwind: '$orders' },
    {
      $project: { total: { $multiply: ['$orders.price', '$orders.quantity'] } },
    },
    {
      $group: {
        _id: null,
        totalSalary: { $sum: '$total' },
      },
    },
  ]);
  return result;
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
