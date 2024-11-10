# Currency Calculator

A responsive and user-friendly currency calculator application designed to perform real-time currency conversions and manage exchange rates. Built with a modern interface, the app supports user authentication and provides intuitive options for currency management.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Technologies](#technologies)
- [Contact](#contact)

## Introduction

Welcome to the Currency Calculator! This application is designed to simplify currency conversions and
manage exchange rates with ease. With an intuitive interface, users can convert amounts between
various currencies, add and update exchange rates, and manage their accounts. Whether you’re
looking to calculate conversions quickly or efficiently manage exchange rates, the Currency Calculator
is equipped to handle it all.

## Features

- **Currency Conversion**: Convert amounts between multiple currencies with dynamically updated exchange rates.
- **Exchange Rate Management**: Add, update, and delete exchange rates (authenticated users only).
- **Multilingual Support**: Interface available in English, German, and Greek.
- **User Authentication**: Secure login, registration, and profile management.

## Installation

### Prerequisites

- **Operating System**: Windows, macOS, or Linux.
- **Node.js**: Version 21.x or higher recommended.
- **Database**: MongoDB Atlas (or local MongoDB setup).

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/StefGvxds/currency-calculator.git
   ```
2. **Backend Setup**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the backend directory and add the following configuration:
      ```plaintext
      PORT=5000
      JWT_SECRET=your_jwt_secret
      MONGO_URI=your_mongo_uri
      ```
    - Start the backend server:
      ```bash
      node app.js
      ```

3. **Frontend Setup**
    - Open a new terminal and navigate to the frontend directory:
      ```bash
      cd frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the frontend server:
      ```bash
      npm start
      ```

4. **Access the Application**
    - Once both servers are running, navigate to `http://localhost:3000` to access the app in the browser.

## Usage

### User Guide

1. **Login/Registration**: Access the menu to register or log in. Registered users have access to currency management features.
2. **Language Selection**: Choose your preferred language (English, German, Greek) at the top of the interface.
3. **Currency Conversion**: Select base and target currencies, enter the amount, and view the converted result.
4. **Exchange Rate Management** (logged-in users only):
    - Add, update, or delete exchange rates from the management menu.
    - View all rates in the exchange rate table, sorted by base currency.

### Error Messages and Troubleshooting

Common error messages include missing fields, duplicate entries, or incorrect login credentials. See [Troubleshooting](#troubleshooting) for details.

## Project Structure

```plaintext
currency-calculator/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── app.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Assets/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Screens/
│   │   ├── Services/
│   │   ├── Translations/
│   │   └── i18n.js
│   ├── package.json
│   └── README.md
└── README.md
```

- **backend**: Server-side code for API endpoints, authentication, and database models.
- **frontend**: Client-side code, including components, contexts, and translation files.

## API Documentation

### Currency Conversion Endpoints

- **POST /api/convert** - Convert currency using the base and target currencies.
- **POST /api/convert-reverse** - Reverse currency conversion.
- **GET /api/currency** - Fetch all available exchange rates.

### User Authentication Endpoints

- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Log in an existing user.
- **DELETE /api/auth/user/:id** - Delete a user.

### Exchange Rate Management Endpoints

- **POST /api/currency** - Add a new exchange rate.
- **PUT /api/currency/:id** - Update an existing exchange rate.
- **DELETE /api/currency/:id** - Delete an exchange rate.

## Configuration

### Environment Variables (.env)

| Variable     | Description                   |
|--------------|-------------------------------|
| PORT         | Backend server port (e.g., 5000) |
| JWT_SECRET   | Secret key for JWT token generation |
| MONGO_URI    | MongoDB connection string     |

## Technologies

- **Frontend**: React, Material-UI, Axios, React-i18next for internationalization.
- **Backend**: Node.js, Express.js, Mongoose for MongoDB, Bcrypt for password hashing, JWT for authentication.
- **Other**: i18next for language management, CORS for cross-origin requests, dotenv for environment configuration.

## Contact

For any inquiries, feel free to reach out:

- **Email**: stef@gvxds.com
- **Portfolio**: [https://gavouchidis.com](https://gavouchidis.com)

Thank you for exploring the Currency Calculator! Enjoy the app and feel free to contribute or reach out with feedback.
