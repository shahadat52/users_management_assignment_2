import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};
export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: Order[];
};

export type TUpdateUser = {
  userId: 'number';
  username: 'string';
  fullName: {
    firstName: 'string';
    lastName: 'string';
  };
  age: 'number';
  email: 'string';
  isActive: 'boolean';
  hobbies: ['string', 'string'];
  address: {
    street: 'string';
    city: 'string';
    country: 'string';
  };
};

export interface UserModelForMethod extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}
