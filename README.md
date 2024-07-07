# Students App
<a id="markdown-students-app" name="students-app"></a>


This is a full-stack production-grade web app built using React, TypeScript, Node.js, Express.js, PostgreSQL and AWS.
The app allows users to view all the students in the database, and add, delete, and update student
information. Users can also register, log in, log out, and delete their accounts.

- 🍏 You can play with the application here: https://mylisty.com

  > Log in with the following credentials:
  >
  > - 🍍 Email: `testaccount@gmail.com`
  > - 🍍 Password: `testaccount`

  - Or sign up with your email and log in to view the students list. You can delete your account from
    the student's list page.

- Backend API GitHub repository: https://github.com/NadiaIdris/nodejs-postgresql-api

# Table of contents
<a id="markdown-table-of-contents" name="table-of-contents"></a>

<!-- TOC -->

- [Features](#features)
- [Client-side technologies used](#client-side-technologies-used)
- [Server-side technologies used](#server-side-technologies-used)
- [Other technologies used](#other-technologies-used)
- [Deployment](#deployment)
  - [How to deploy the app](#how-to-deploy-the-app)
- [Run the app locally](#run-the-app-locally)
  - [Steps to run the frontend app](#steps-to-run-the-frontend-app)
  - [Steps to run the backend app](#steps-to-run-the-backend-app)
- [API endpoints](#api-endpoints)
  - [Registered user routes](#registered-user-routes)
  - [Student routes](#student-routes)
- [Ports](#ports)
- [Database](#database)
- [SSL Certificate](#ssl-certificate)
- [Nginx](#nginx)
- [Run node scripts in the background without hanging up](#run-node-scripts-in-the-background-without-hanging-up)

<!-- /TOC -->
<!-- /TOC -->

## Features
<a id="markdown-features" name="features"></a>


- Users can register, login, logout and delete their account
- Users can view all the students in the database, add, delete, and update student information

## Client-side technologies used
<a id="markdown-client-side-technologies-used" name="client-side-technologies-used"></a>


- React
  - Context API (for state management), hooks
  - React Router (for client-side routing)
- TypeScript (ES6)
- styled-components (CSS in JS) for custom CSS styles and animations
- Custom reusable components are written from scratch (Button, TextInput, Modal, Dropdown, etc)
- Axios (for making HTTP requests)
- Unit tests using Jest and React Testing Library
- Responsive UI. The whole app is responsive using CSS Grid, Flexbox, and media queries
- Joi for client-side form validation

## Server-side technologies used
<a id="markdown-server-side-technologies-used" name="server-side-technologies-used"></a>


- Node.js
- Express.js
- PostgreSQL
- AWS EC2 (for deployment)
- Authentication using JWT tokens. JWT tokens are stored in the browser's local storage. The token
  is sent in the header of each request to the server.
- Bcrypt for hashing passwords
- CORS for cross-origin requests
- Joi for server-side form validation
- Unit tests using Jest

## Other technologies used
<a id="markdown-other-technologies-used" name="other-technologies-used"></a>


- Git for version control
- GitHub for remotely storing the code
- GitHub Issues for project management
- Figma for designing the app

## Deployment
<a id="markdown-deployment" name="deployment"></a>


- The app is deployed on AWS EC2.

### How to deploy the app
<a id="markdown-how-to-deploy-the-app" name="how-to-deploy-the-app"></a>


Local:

- Make the changes in the frontend code and build the app by running `npm run build` locally (read
  more about why below).
- Commit the changes and push to the GitHub repository.

EC2:

- SSH into the EC2 instance and pull the changes from the repository.
- Once you pull all the changes from GitHub, in the `ts-student-list-app` folder run the following command
  to start the server: `npm run serve`.
- The changes will be reflected on the live site.

We have included a `build` folder in our repository. This is because we use AWS EC2 to deploy our web
app and we are using a free tier. When we run `npm run build` on our EC2 instance, it freezes the
server, and the build process is never completed. So, we have to build the frontend code locally and
include the `build` folder in our repository.

## Run the app locally
<a id="markdown-run-the-app-locally" name="run-the-app-locally"></a>


### Steps to run the frontend app
<a id="markdown-steps-to-run-the-frontend-app" name="steps-to-run-the-frontend-app"></a>


1. Clone the [ts-student-list-app](https://github.com/NadiaIdris/ts-student-list-app) repository by running `git clone https://github.com/NadiaIdris/ts-student-list-app.git`
2. Run `npm install` in the root directory
3. Run `start-dev` to start the server

### Steps to run the backend app
<a id="markdown-steps-to-run-the-backend-app" name="steps-to-run-the-backend-app"></a>


1. Clone the [nodejs-postgresql-api](https://github.com/NadiaIdris/nodejs-postgresql-api) repository
   by running `git clone https://github.com/NadiaIdris/nodejs-postgresql-api.git`
2. Run `npm install` in the root directory
3. Run `npm run start-dev` to start the server

## API endpoints
<a id="markdown-api-endpoints" name="api-endpoints"></a>

### Registered user routes
<a id="markdown-registered-user-routes" name="registered-user-routes"></a>

- `POST /api/v1/user/signup` - Register a user
- `POST /api/v1/user/login` - Log in a user
- `DELETE /api/v1/:userId/delete` - Delete a user account

### Student routes
<a id="markdown-student-routes" name="student-routes"></a>

- `GET /api/v1/students` - Get all students
- `GET /api/v1/students/:uid` - Get one student
- `POST /api/v1/students/add-student` - Add a student
- `PUT /api/v1/students/:uid` - Update a student
- `DELETE /api/v1/students/:uid` - Delete a student

## Ports
<a id="markdown-ports" name="ports"></a>


Server API runs on port `4000`.
The client runs on port `3000`.

## Database
<a id="markdown-database" name="database"></a>


- We have used PostgreSQL for the database.
- We have two tables in the database: `student` and `registered_user`.
- We have used `uuid` for the primary key in both tables.
- We have used `citext` for the email column in the `registered_user` table. `citext` is
  case-insensitive text.

```sql
-- sudo -i -u postgres  <-- log in as Linux user postgres into Linux
-- psql                 <-- start psql client. Everything below is in psql (not Linux).

CREATE ROLE nadia WITH LOGIN PASSWORD '<password>';
ALTER ROLE nadia WITH SUPERUSER;
ALTER ROLE nadia WITH CREATEROLE;
ALTER ROLE nadia WITH CREATEDB;
ALTER ROLE nadia WITH REPLICATION;

-- \du   <-- View all the roles

-- Change the current user
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


-- If the registered_user table doesn't exist in the students_db, create it in my server. Write that code.
CREATE TABLE registered_user (
    registered_user_uid UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    password VARCHAR(1024) NOT NULL
);

-- Create the student table. Same. If it doesn't exist, create it in JS using this code.
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
<a id="markdown-ssl-certificate" name="ssl-certificate"></a>


- Let's Encrypt: https://certbot.eff.org/instructions?ws=other&os=ubuntufocal&tab=standard
- Certificate is issued for mylisty.com. DNS A record is set to the public IP address of the EC2 instance.

The certificate is saved at: /etc/letsencrypt/live/mylisty.com/fullchain.pem
The key is saved at: /etc/letsencrypt/live/mylisty.com/privkey.pem

## Nginx
<a id="markdown-nginx" name="nginx"></a>


- Install nginx: `sudo apt-get install nginx`
- https://www.sitepoint.com/configuring-nginx-ssl-node-js/
- Add nginx configuration: `sudo nano /etc/nginx/sites-enabled/default`

  ```nginx
  server {
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

  location /secureapi/ {
    # Rewrite URLs to remove the /secureapi prefix for the backend server
    rewrite ^/secureapi/(.*) /$1 break;

    # Forward requests to the Node.js server on port 4000
    proxy_pass http://localhost:4000;
  }

  }
  ```

- Test the nginx configuration: `sudo nginx -t`
- Restart the nginx server: `sudo systemctl restart nginx`

## Run node scripts in the background without hanging up
<a id="markdown-run-node-scripts-in-the-background-without-hanging-up" name="run-node-scripts-in-the-background-without-hanging-up"></a>


- `cd ~/github/ts-student-list-app/ && nohup npm run serve &`
- `cd ~/github/nodejs-postgresql-api/ && nohup npm run start &`
- To kill all node processes: `killall node`
