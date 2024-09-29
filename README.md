# Money Mundo

![image](https://github.com/user-attachments/assets/0274f446-b547-4c47-8510-d9209164bdcb)

[The Notion](https://www.notion.so/Shell-Hacks-2024-Research-10fd606c4d308024b0abefded5102e8a?pvs=4)

## Problem statement: 

Immigrants don’t have financial guidance when arriving in the U.S.

Many immigrants arriving in the U.S. from the American continent face significant challenges when it comes to navigating the complex financial system. They often lack access to reliable financial guidance, making it difficult to build credit, manage money, or establish a solid financial foundation. This lack of knowledge and support can lead to poor financial decisions, increased debt, and difficulty achieving long-term financial stability. Without proper guidance, immigrants are left to navigate these challenges alone, making it harder to adapt and thrive in their new environment.

## Solution

Our web app is designed to provide immigrants with the financial guidance they need to succeed in the U.S. By creating a personalized financial profile through a comprehensive registration form, we can assess where each individual stands and offer tailored recommendations. From building credit scores and managing debt to providing financial literacy education, budgeting advice, and retirement planning, our app serves as a one-stop solution to help users improve their financial health. We aim to empower immigrants with the knowledge and tools needed to build a strong financial foundation and achieve their goals.


# Financial Guidance App API Documentation

## Overview

This API provides functionality for managing user profiles and authentication within the financial guidance app. The API is divided into two main sets of routes: Profile Routes and User Routes. Profile Routes handle the user profile, financial recommendations, and updating user information. User Routes handle user registration and authentication.

### Authentication

The API uses JWT (JSON Web Token) for secure user authentication.

---

## Profile Routes

### Update User Profile

**Endpoint:** `/api/profile/update`  
**Method:** `POST`

**Description:**  
This endpoint allows the user to update their profile information.

**Request Body:**
- JSON object containing fields that need to be updated.

**Response:**
- **Success (200):** `{ "message": "Profile updated successfully" }`
- **Error (400):** `{ "error": "Error message" }`

---

### Get User Profile

**Endpoint:** `/api/profile/get`  
**Method:** `GET`

**Description:**  
This endpoint retrieves the profile information for a specific user.

**Query Parameters:**
- `user_id` (string) - ID of the user whose profile is to be retrieved.

**Response:**
- **Success (200):** `{ "profile": "profile-data-here" }`
- **Error (400):** `{ "error": "User ID is required" }`
- **Error (404):** `{ "error": "User not found" }`

---

### Get Financial Recommendation

**Endpoint:** `/api/profile/recommendation`  
**Method:** `GET`  
**Authentication Required:** Yes

**Description:**  
This endpoint provides financial recommendations for a specific user based on their profile information. The recommendations are generated using a fine-tuned model from OpenAI.

**Response:**
- **Success (200):** `{ "recommendations": "Recommendations data in JSON" }`
- **Error (400):** `{ "error": "User ID is required" }`
- **Error (404):** `{ "error": "User not found" }`
- **Error (500):** `{ "error": "Failed to generate recommendations: error message" }`

**Logic Description:**
- The `get_jwt_identity()` function is used to extract the authenticated user's ID from the JWT.
- The `formulate_prompt` function takes the `UserProfile` object and generates a prompt based on the user's financial data (e.g., bank account status, credit score range, financial goal).
- The OpenAI model is then queried with this prompt to generate detailed, actionable recommendations.

**JWT Usage:**
Ensure the JWT is passed in the `Authorization` header in the format `Bearer <JWT>`.

---

## User Routes

### User Registration

**Endpoint:** `/auth/user/register`  
**Method:** `POST`

**Description:**  
This endpoint allows a new user to register. It takes information such as email, password, and financial data to create a new user and corresponding profile.

**Request Body:**
- `email` (string) - User's email address.
- `password` (string) - Password for the account.
- `employmentStatus` (string) - Employment status of the user.
- `financialGoal` (string) - User's financial goal.
- `hasBankAccount` (boolean) - Whether the user has a bank account.
- `hasCreditCards` (boolean) - Whether the user has credit cards.

**Response:**
- **Success (201):** `{ "message": "User registered successfully" }`
- **Error (400):** `{ "message": "Username, email, and password are required" }`
- **Error (400):** `{ "message": "User with this email or username already exists" }`

---

### User Login

**Endpoint:** `/auth/user/login`  
**Method:** `POST`

**Description:**  
This endpoint allows a registered user to log in and receive a JWT token for authentication.

**Request Body:**
- `email` (string) - User's email address.
- `password` (string) - User's password.

**Response:**
- **Success (200):** `{ "access_token": "JWT token" }`
- **Error (400):** `{ "message": "Email and password are required" }`
- **Error (401):** `{ "message": "Invalid credentials" }`

---


