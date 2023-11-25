# User-management application

live link:- https://user-management-assignment-2-mmnnlo4ak-shahadat52.vercel.app/

This is a user management backend application.It was build with node(Express), Mongoose, Typescript. In this app we can store users data, and user order in mongodb database etc, It was secure by bcrypt password hashing system. Every data was properly validate. For validation purpose we use here zod validation system

## If you want to contribute in this project so you have to do some steps

First of all you have to ensure that node, npm, mongodb are install in your pc
👉🏻 clone the repository link(https://github.com/shahadat52/users_management_assignment_2.git) and run in your local pc
👉🏻 install dependency npm install
👉🏻 create .env file in root of the project and set environment variable
👉🏻 project will run http://localhost:5000.
👉🏻 Then run "npm run build" and then "npm run start-dev" ok your project is ready


API endpoint structure
1.  Create a new user:- POST /api/users
2.  Retrieve a list of all users:- GET /api/users
3.  Retrieve a specific user by ID:- GET /api/users/:userId
4.  Update user information:- PUT /api/users/:userId
5.  Delete a user:- DELETE /api/users/:userId
6.  Add New Product in Order:- PUT /api/users/:userId/orders
7.  Retrieve all orders for a specific user:- GET /api/users/:userId/orders
8.  Calculate Total Price of Orders for a Specific User:- GET /api/users/:userId/orders/total-price


