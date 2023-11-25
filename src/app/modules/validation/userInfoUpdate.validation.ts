import { z } from 'zod';

const userFullNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'firstName is required',
      invalid_type_error: 'firstName must be a string',
    })
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First name must start with a capital letter',
    }),
  lastName: z
    .string({
      required_error: 'lastName is required',
      invalid_type_error: 'lastName must be a string',
    })
    .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name allows only letters',
    }),
});

const addressValidationSchema = z.object({
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Street must be a string',
  }),

  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string',
  }),
});

export const OrderValidationSchema = z.object({
  productName: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
  price: z.number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  }),
  quantity: z.number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  }),
});

const userInfoUpdateValidationSchema = z.object({
  userId: z.number({
    required_error: 'userId is required',
    invalid_type_error: 'userId must be a Number',
  }),
  userName: z.string({
    required_error: 'userName is required',
    invalid_type_error: 'userName must be a string',
  }),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});

export default userInfoUpdateValidationSchema;
