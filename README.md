# Students App

This is a full stack web app built using React, TypeScript, Node.js, Express.js, PostgreSQL and AWS.
The app allows users to view all the students in the database, add, delete and update a student
information. Users can also register, login, logout and delete their account.

You can access it here: http://3.21.228.224:3000/login

## Table of contents

## Features

- Users can register, login, logout and delete their account
- Users can view all the students in the database, add, delete and update a student information

## Client side technologies used

- React
  - Context API (for state management), hooks
  - React Router (for client side routing)
- TypeScript (ES6)
- styled-components (CSS in JS) for custom CSS styles and animations
- Custom reusable components written from scratch (Buttons, Inputs, Modals, etc)
- Axios (for making HTTP requests)
- Unit tests using Jest and React Testing Library
- Responsive UI. The whole app is responsive using CSS Grid, Flexbox and media queries
- Prettier for formatting
- Joi for client side form validation

## Server side technologies used

- Node.js
- Express.js
- PostgreSQL
- AWS EC2 (for deployment)
- Authentication using JWT tokens. Passwords are hashed using bcrypt and salted before storing in
  the PostgreSQL database.
- Joi for server side form validation
- Unit tests using Jest

## Other technologies used

- Git for version control
- Github for remotely storing the code
- Github Issues for project management
- Figma for designing the app

# Deployment

- The app is deployed on AWS EC2.

## How to deploy the app

Local:

- Make the changes in the frontend code and build the app by running `npm run build` locally.
- Commit the changes and push to the GitHub repository.

EC2:

- SSH into the EC2 instance and pull the changes from the repository.
- Once you pull all the changes from GitHub, in the `ts-student-list-app` folder run the following command
  to start the server: `npm run serve`.
- The changes will be reflected on the live site.

We have included `build` folder in our repository. This is because we use AWS EC2 to deploy our web
app and we are using a free tier. When we run `npm run build` on our EC2 instance, it freezes the
server and the build process is never completed. So, we have to build the frontend code locally and
include the `build` folder in our repository.

# Run the app locally

## Steps to run the frontend app

1. Clone the [ts-student-list-app](https://github.com/NadiaIdris/ts-student-list-app) repository by running `git clone https://github.com/NadiaIdris/ts-student-list-app.git`
2. Run `npm install` in the root directory
3. Run `start-dev` to start the server

## Steps to run the backend app

1. Clone the [nodejs-postgresql-api](https://github.com/NadiaIdris/nodejs-postgresql-api) repository
   by running `git clone https://github.com/NadiaIdris/nodejs-postgresql-api.git`
2. Run `npm install` in the root directory
3. Run `npm run start-dev` to start the server

## Ports

Server API runs on port `4000`.
Client runs on port `3000`.

