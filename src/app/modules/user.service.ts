import { TOrder, TUser } from './user.interface';
import { UserM } from './user.model';

// Create a user in database
// const createUserInDb = async (userData: TUser) => {
//   const { userId } = userData;
//   console.log(userId);
//   if (await UserM.isUserExists(userId)) {
//     throw new Error('Student already exists');
//   }

//   const result = await UserM.create(userData);
//   return result;
//  };
const createUserInDb = async (userData: TUser) => {
  console.log('userId', userData.userId);
  // if (await UserM.isUserExists(userData.userId)) {
  //   throw new Error('User already exists');
  // }
  // const {userId} = userData
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
const getSingleUsersDataFromDb = async (id: number) => {
  if (await UserM.isUserExists(id)) {
    const userId = Number(id);
    const result = await UserM.aggregate([
      { $match: { userId: userId } },
      { $project: { password: 0 } },
    ]);
    return result;
  }
};

//store order
const storeOrderInDb = async (id: number, orderData: TOrder) => {
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
const userDeleteFromDb = async (id) => {
  const uId = Number(id);
  if (await UserM.isUserExists(uId)) {
    const result = await UserM.deleteOne({ userId: uId });
    return result;
  }
};

//update user information
const updateUserInfoInDb = async (userId: number, newData) => {
  if (await UserM.isUserExists(userId)) {
    const result = await UserM.updateOne({ userId: userId }, { $set: newData });
    return result;
  }
};

export const userService = {
  createUserInDb,
  getAllUsersDataFromDb,
  getSingleUsersDataFromDb,
  storeOrderInDb,
  userDeleteFromDb,
  updateUserInfoInDb,
};
