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
  product: string;
  price: number;
  quantity: number;
};
export type TOrderArr = TOrder[];

export type TUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrderArr;
};