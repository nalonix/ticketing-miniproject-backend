
# Ticketing System Backend

A **Role-Based Ticketing System** where users can create support tickets, and admins can manage them. Built with **Node.js**, **Express**, **MongoDB**, and **React**.

---

## Features

- **User Authentication**:
  - Signup and login with JWT-based authentication.
  - Role-based access control (User and Admin roles).

- **Ticket Management**:
  - Users can create tickets.
  - Admins can view all tickets, update ticket status, and delete tickets.
  - Users can only view their own tickets.

- **API Endpoints**:
  - Authentication: Signup, Login, Get User Profile.
  - Tickets: Create, Read, Update, Delete.

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT for authentication
  - Bcrypt for password hashing

- **Frontend**:
  - React.js
  - React Router for routing
  - React Hook Form for form handling
  - Tailwind CSS for styling

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git (optional)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ticketing-system.git
   cd ticketing-system
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory:
     ```env
     MONGODB_URI=mongodb://localhost:27017/ticketing-system
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

4. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend development server**:
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

---

## API Documentation

### Authentication

#### Signup
- **URL**: `/api/v1/auth/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Login
- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123",
      "name": "John Doe",
      "role": "user"
    }
  }
  ```

#### Get User Profile
- **URL**: `/api/v1/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
  ```

### Tickets

#### Create Ticket
- **URL**: `/api/v1/tickets`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "Issue with login",
    "description": "Unable to log in to the system."
  }
  ```
- **Response**:
  ```json
  {
    "message": "Ticket created successfully",
    "ticket": {
      "id": "456",
      "title": "Issue with login",
      "description": "Unable to log in to the system.",
      "status": "Open",
      "user": "123",
      "createdAt": "2023-10-05T14:48:00.000Z"
    }
  }
  ```

#### Get Tickets
- **URL**: `/api/v1/tickets`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  [
    {
      "id": "456",
      "title": "Issue with login",
      "description": "Unable to log in to the system.",
      "status": "Open",
      "user": {
        "id": "123",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2023-10-05T14:48:00.000Z"
    }
  ]
  ```

#### Update Ticket Status
- **URL**: `/api/v1/tickets/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "status": "In Progress"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Ticket status updated",
    "ticket": {
      "id": "456",
      "title": "Issue with login",
      "description": "Unable to log in to the system.",
      "status": "In Progress",
      "user": "123",
      "createdAt": "2023-10-05T14:48:00.000Z"
    }
  }
  ```

#### Delete Ticket
- **URL**: `/api/v1/tickets/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "message": "Ticket deleted successfully"
  }
  ```

---

## Frontend Routes

- **Login**: `/login`
- **Signup**: `/signup`
- **User Dashboard**: `/user`
- **Admin Dashboard**: `/admin`

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---
