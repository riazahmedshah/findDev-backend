# `findDev` Backend: Auth Module 🔐

The secure gateway for user identity, authentication, and authorization within the `findDev` platform.

---

## ✨ Key Features

- **📝 User Registration**: Secure user onboarding with password hashing and Zod validation.
- **🔑 User Login**: Robust authentication process issuing JWT-based access and refresh tokens.
- **🔄 Token Management**: Handles JWT generation, refresh token rotation, and invalidation.
- **🛡️ Authentication Middleware**: Protects API endpoints by verifying access tokens.
- **🚪 Logout**: Allows users to securely end their sessions.

---

## 🏗️ High-Level Architecture

```
The auth module follows a layered architectural pattern for separation of concerns:
src/modules/auth/
├── controllers/ # Route handlers
├── services/ # Business logic
├── repositories/ # Database operations
├── entities/ # Data models
├── middlewares/ # Auth guards
├── validators/ # Request validation
├── utils/ # Helpers (JWT, crypto)
└── index.ts # Module exports
```
## 🔗 API Endpoints

All endpoints are prefixed with `/api/auth`.

* **`POST /api/auth/register`**
    * **Description**: Registers a new user account.
    * **Request Body**: `{ email: string, password: string, name?: string }`
    * **Response**: `{ message: "User registered successfully", userId: string }` (or initial tokens).
    * **Errors**: `400 Bad Request` (validation), `409 Conflict` (email already exists).

* **`POST /api/auth/login`**
    * **Description**: Authenticates a user and issues tokens.
    * **Request Body**: `{ email: string, password: string }`
    * **Response**: `{ accessToken: string, refreshToken: string }`
    * **Errors**: `400 Bad Request` (validation), `401 Unauthorized` (invalid credentials).

* **`POST /api/auth/refresh-token`**
    * **Description**: Obtains a new pair of access and refresh tokens.
    * **Request Body**: `{ refreshToken: string }`
    * **Response**: `{ accessToken: string, refreshToken: string }`
    * **Errors**: `400 Bad Request` (validation), `401 Unauthorized` (invalid/expired refresh token).

* **`POST /api/auth/logout`**
    * **Description**: Invalidates the provided refresh token, logging the user out.
    * **Request Body**: `{ refreshToken: string }`
    * **Response**: `{ message: "Logged out successfully" }`
    * **Errors**: `400 Bad Request` (validation), `401 Unauthorized` (invalid refresh token).

---

## 🧪 Testing

Tests for the `auth` module are colocated within `__tests__/` subfolders.

To run tests for this module:

```bash
# From the project root
npx vitest src/modules/auth/__tests__/
or run all tests:
npx vitest
```