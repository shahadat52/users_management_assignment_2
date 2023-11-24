import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModelForMethod,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

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

const OrderSchema = new Schema<TOrder>({
  product: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModelForMethod>({
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

  orders: [OrderSchema],
});

//make hashing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.post('findOne', function (doc, next) {
  console.log(doc);
  doc.password = '';
  next();
});

//create static method for check is user exists
userSchema.statics.isUserExists = async function (userId: number) {
  const exists = await UserM.findOne({ userId });
  return exists;
};

export const UserM = model<TUser, UserModelForMethod>('User', userSchema);
