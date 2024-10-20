# Social Media Backend

This is the backend of a social media application built using **NestJS**, **TypeORM**, **PostgreSQL**, and deployed on **Heroku**. The backend provides functionalities for user authentication, CRUD operations for posts, real-time chat via WebSocket, and image storage using **Firebase Storage**.
## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)

## Features

- **User Authentication**: Secure authentication system using JWT tokens.
- **CRUD Operations for Posts**: Users can create, read, update, and delete posts.
- **Real-Time Chat**: WebSocket-powered chat with support for multiple conversations.
- **Image Storage**: Firebase Storage is used to store and manage images uploaded by users.
- **Role-Based Access Control**: Guards to protect routes and restrict access based on user roles.

## Technologies Used

- **NestJS**: Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: Object-Relational Mapper (ORM) for interacting with PostgreSQL.
- **PostgreSQL**: The database used to store all app data.
- **Heroku**: Cloud platform for deploying the backend and database.
- **Firebase Storage**: Used for storing and retrieving user-uploaded images.
- **WebSocket**: Real-time communication for chat features.
- **JWT**: Token-based authentication for secure access to APIs.

## Environment Variables
FIREBASE_ADMIN_SDK: This variable stores the Firebase Admin SDK credentials, typically in JSON format, which allows your backend to securely interact with Firebase services (like Firebase Storage, Firestore, etc.). This is required for administrative tasks like image storage.
DATABASE_URL - This is the connection URL for your PostgreSQL database. It contains all the necessary credentials and host information to allow the backend to connect to the database. The URL format usually follows:  postgres://<username>:<password>@<host>:<port>/<database>
TOKEN_SECRET - : This is the secret key used for signing and verifying JWT (JSON Web Tokens). It ensures that tokens used for authentication are secure and valid. This should be a strong, random string to keep your authentication secure.

## Installation

### Prerequisites

Before you start, make sure you have the following installed:

- Node.js (v16+)
- PostgreSQL
- Firebase project with Storage enabled
- Heroku CLI (optional, for deployment)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Yaroslav1918/socialMedia-back.git
   cd social-media-backend
   Install the dependencies using pnpm:
   pnpm install

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
## Deployment
Frontend
The frontend of the LinkedIn clone is built with Ionic and deployed on Vercel.

Live Frontend URL: [LinkedIn Clone FrontEnd](https://social-media-front-tmlm.vercel.app/home)
Backend
The backend is built with NestJS and PostgreSQL (via TypeORM), deployed on Heroku.

Live Backend URL: [LinkedIn Clone Backend](https://social-media-web-345f246ea60b.herokuapp.com/api)

```
social-media
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ docker-compose.yml
├─ images
├─ nest-cli.json
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ src
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ auth.controller.ts
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.ts
│  │  ├─ decorators
│  │  │  └─ roles.decorator.ts
│  │  ├─ dto
│  │  │  ├─ auth-user.dto.ts
│  │  │  └─ index.ts
│  │  └─ guards
│  │     ├─ auth.guard.ts
│  │     ├─ jwt.strategy.ts
│  │     └─ roles.guard.ts
│  ├─ chat
│  │  ├─ chat.module.ts
│  │  ├─ chat.service.ts
│  │  ├─ dto
│  │  │  ├─ active-conversation.dto.ts
│  │  │  ├─ conversation.dto.ts
│  │  │  └─ message.dto.ts
│  │  ├─ entities
│  │  │  ├─ active-conversation.ts
│  │  │  ├─ conversation.entity.ts
│  │  │  └─ message.entity.ts
│  │  └─ gateway
│  │     └─ chat.gateway.ts
│  ├─ main.ts
│  ├─ posts
│  │  ├─ dto
│  │  │  └─ post.dto.ts
│  │  ├─ entities
│  │  │  └─ post.entity.ts
│  │  ├─ guards
│  │  │  └─ is-creator.guard.ts
│  │  ├─ posts.controller.ts
│  │  ├─ posts.module.ts
│  │  └─ posts.service.ts
│  ├─ shared
│  │  └─ interceptors
│  │     ├─ createUser.interceptor.ts
│  │     └─ index.ts
│  └─ users
│     ├─ dto
│     │  ├─ create-user.dto.ts
│     │  ├─ friend-request.dto.ts
│     │  └─ role.dto.ts
│     ├─ entities
│     │  ├─ friend-request.entity.ts
│     │  └─ user.entity.ts
│     ├─ users.controller.ts
│     ├─ users.module.ts
│     └─ users.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```