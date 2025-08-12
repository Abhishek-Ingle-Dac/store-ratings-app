# Store Ratings Platform

A full-stack web application for managing stores and user ratings, built with **React**, **Express**, **MySQL**, and **Sequelize**.  
Supports **cookie-based session authentication**, **admin user management**, and **store/rating CRUD operations**.

---

## 🚀 Features

- **User Authentication**
  - Signup and login with session-based authentication
  - Secure password hashing using bcrypt
  - Role-based access control (User/Admin)

- **Admin Dashboard**
  - Add, update, and delete users
  - Manage stores and ratings
  - View all platform data

- **Store Management**
  - Add, edit, delete stores
  - View all stores with details

- **Ratings System**
  - Users can rate stores (1–5 stars)
  - Add comments along with ratings
  - View store ratings and comments

- **Frontend**
  - Built with React + Vite
  - Axios API integration with `withCredentials` enabled
  - Plain CSS styling for a clean and responsive UI

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Axios
- Plain CSS

### **Backend**
- Node.js + Express
- Sequelize ORM
- MySQL Database
- express-session for authentication
- bcrypt for password hashing

---

## 📂 Project Structure
backend/
├── controllers/ # Request handlers
├── middlewares/ # Authentication middleware
├── models/ # Sequelize models
├── routes/ # API routes
├── server.js # Backend entry point
└── .env # Environment variables

frontend/
├── src/
│ ├── api/ # Axios API services
│ ├── components/ # Reusable UI components
│ ├── pages/ # Application pages
│ └── App.jsx # App entry
└── vite.config.js # Vite config

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Abhishek-Ingle-Dac/store-ratings-app.git
cd ratings-app
cd backend
npm install
cd backend
npm install
Run frontend
npm run dev

API Endpoints
Authentication
POST	/api/auth/signup	Register a user
POST	/api/auth/login	  Login a user
POST	/api/auth/logout	Logout user

Stores
GET	   /api/stores	         Get all stores
POST	 /api/stores	       Add a store (Admin)
PUT	  /api/stores/:id	     Update a store (Admin)
DELETE  /api/stores/:id	 Delete a store (Admin)

Ratings
GET	/api/ratings	Get all ratings
POST	/api/ratings	Add a rating (User)

User
POST	/api/admin/users	Add a new user

