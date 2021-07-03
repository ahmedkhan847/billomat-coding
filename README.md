# Task For Billomat

This is the task for Billomat in which one can perform the CRUD operation for a user and also get the average age of user.

## Technologies Used

- NodeJS
- TypeScript
- MySQL
- TypeOrm
- Joi
- Docker
- ExpressJS

## How To Run

In order to run the this code either first you run this command to run MySQL with docker compose

`docker-compose up --build -d`

Or you set the MySQL configuration in `ormconfig.json` file. Once you have configured MySQL run `yarn dev` to start the development server on port 3000.

## API End Points

1. POST `/users` To save users
1. GET `/users` To get all users
1. GET `/users/:id` To get single user
1. PUT `/users/:id` To update user
1. DELETE `/users/:id` To remove user
1. GET `/users/average-age` To get the average age of users
