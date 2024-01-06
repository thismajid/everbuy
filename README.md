# Everbuy

Welcome to Everbuy, an eCommerce platform engineered for efficiency and performance. Built on NestJS, this platform harnesses the power of MySQL and Redis, with Prisma serving as the data access layer. Everbuy offers a robust backend solution for managing complex eCommerce operations with ease.

## Features

- Product management with detailed categories, descriptions, and images.
- User authentication and authorization for secure access and operations.
- Shopping cart functionality that allows customers to manage their purchases.

## Tech Stack

- **Framework**: NestJS for creating a scalable server-side application.
- **Database**: MySQL for relational data storage.
- **ORM**: Prisma for database access and migration management.
- **Cache**: Redis to accelerate data retrieval and enhance user experience.
- **Authentication**: JWT for secure and stateless user authentication.

## Configuration

Set up your Cloudinary credentials in your environment. You can do this by creating a .env file in the root directory of the project and adding the following lines with your credentials:

```bash
DATABASE_URL=mysql://root:password@localhost:3306/everbuy
DEVELOPMENT_LOGIN_OTP=your_default_otp_code_for_development
APP_PORT=your_app_port
LOGIN_RETRIES_ALLOWED=
LOGIN_OTP_TTL=
SMS_API_KEY=your_sms_api_key
SMS_TEMPLATE=your_sms_template_key
REDIS_HOST=your_redis_server_host
REDIS_PORT=your_redis_server_port
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_EXPIRATION_MINUTES=tour_jwt_expiration
ADMIN_USERNAME=your_custom_admin_username
ADMIN_PASSWORD=your_custom_admin_password
ADMIN_EMAIL=your_custom_admin_email
ADMIN_MOBILE=your_custom_admin_mobile
```

### Installation

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/thismajid/everbuy.git
cd streamlining-image-upload-cloudinary
npm install
npx prisma migrate dev
npm start |or| npm run start:dev
```
