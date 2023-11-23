import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TOrderArr,
  TUser,
} from './user.interface';

const userFullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name must be required'],
  },
  lastName: {
    type: String,
    required: [true, 'First Name must be required'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street must be required'],
  },
  city: {
    type: String,
    required: [true, 'City must be required'],
  },
  country: {
    type: String,
    required: [true, 'Country must be required'],
  },
});

const orderSchema = new Schema<TOrder>({
  product: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
});
const orderArrSchema = new Schema<TOrderArr>([orderSchema]);

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User Id must be required'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'User name must be required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password must be required'],
  },
  fullName: userFullNameSchema,
  age: {
    type: Number,
    required: [true, 'Number must be required'],
  },
  email: {
    type: String,
    required: [true, 'Email must be required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies must be required'],
  },
  address: addressSchema,
  orders: orderArrSchema,
});

export const UserModel = model<TUser>('User', userSchema);
