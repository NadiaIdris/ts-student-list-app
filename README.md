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

# Dadabase admin

```sql
-- sudo -i -u postgres  <-- log in as Linux user postgres into linux
-- psql                 <-- start psql client. Everything below is in psql (not linux).

CREATE ROLE nadia WITH LOGIN PASSWORD '<password>';
ALTER ROLE nadia WITH SUPERUSER;
ALTER ROLE nadia WITH CREATEROLE;
ALTER ROLE nadia WITH CREATEDB;
ALTER ROLE nadia WITH REPLICATION;

-- \du   <-- View all the roles

-- Change current user
SET ROLE nadia;

CREATE DATABASE students_db;
-- \l    <-- show all dbs
-- \c    <-- connect to another db
\c students_db

-- Add CITEXT type extension.
CREATE EXTENSION IF NOT EXISTS "citext";
-- Add UUID type extension.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- View current user
SELECT CURRENT_USER;


-- It registered_user table doesn't exist in the students_db, then create it in my server. Write that code.
CREATE TABLE registered_user (
    registered_user_uid UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    password VARCHAR(1024) NOT NULL
);

-- Create students table. Same. If it doesn't exist, then create it in JS using this code.
CREATE TABLE student (
    student_uid UUID PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(30),
    email VARCHAR(100) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- View all the tables
\dt

-- If records are too long that they wrap, run '\x' to print records vertically.
\x

-- View all the student records
SELECT * FROM student;

-- View all the registered_user records
SELECT * FROM registered_user;
```

## SSL Certificate

- Let's Encrypt: https://certbot.eff.org/instructions?ws=other&os=ubuntufocal&tab=standard
- Certificate is issued for mylisty.com. DNS A record is set to the public IP address of the EC2 instance.

Certificate is saved at: /etc/letsencrypt/live/mylisty.com/fullchain.pem
Key is saved at: /etc/letsencrypt/live/mylisty.com/privkey.pem

## Nginx

- Install nginx: `sudo apt-get install nginx`
- https://www.sitepoint.com/configuring-nginx-ssl-node-js/
- Add nginx configuration: `sudo nano /etc/nginx/sites-enabled/default`
  ```yaml
  #The Nginx server instance
  server{
    listen       80;
    listen       443 ssl;
    server_name  mylisty.com;

    ssl_certificate /etc/letsencrypt/live/mylisty.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mylisty.com/privkey.pem;

    location / {
      proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
  ```
- Test the nginx configuration: `sudo nginx -t`
- Restart the nginx server: `sudo systemctl restart nginx`

## Run node scripts in the background withouth hanging up

- `cd ~/github/ts-student-list-app/ && nohup npm run serve &`
- `cd ~/github/nodejs-postgresql-api/ && nohup npm run start &`
- To kill all node processes: `killall node`