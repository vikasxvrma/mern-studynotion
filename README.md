# 📘 StudyNotion — MERN Stack Learning Platform

StudyNotion is a **full-stack MERN application** designed as an online learning platform with role-based access for students and instructors.  
The project is fully deployed and focuses on **real-world production readiness**, not just local development.

## 🚀 Live Demo

- **Frontend:** https://mern-studynotion-pi.vercel.app  
- **Backend API:** https://mern-studynotion-backend.onrender.com

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (file uploads)
- Cloudinary (media storage)

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

## ✨ Features

### 🔐 Authentication & Authorization
- User signup & login
- JWT-based authentication
- Protected routes
- Role-based access (Student / Instructor)

### 🎓 Student Features
- Browse courses by category
- Enroll in courses
- Track course progress
- View enrolled courses
- Rate & review courses

### 🧑‍🏫 Instructor Features
- Create & manage courses
- Upload course videos
- Edit sections & subsections
- View instructor dashboard

### 💳 Payments
- Razorpay integration for course purchases

## 🧠 Key Learnings

This project goes beyond CRUD and focuses on **production challenges**, including:
- CORS configuration between frontend & backend
- Environment variable management across platforms
- MongoDB TLS / SSL issues in production
- Case-sensitive import issues on Linux servers
- Debugging 502 & deployment-only errors
- Frontend–backend integration after deployment

## 📂 Project Structure
# 📘 StudyNotion — MERN Stack Learning Platform

StudyNotion is a **full-stack MERN application** designed as an online learning platform with role-based access for students and instructors.  
The project is fully deployed and focuses on **real-world production readiness**, not just local development.

## 🚀 Live Demo

- **Frontend:   https://mern-studynotion-pi.vercel.app  
- **Backend API: https://mern-studynotion-backend.onrender.com


## 🛠 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (file uploads)
- Cloudinary (media storage)

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**


## ✨ Features

### 🔐 Authentication & Authorization
- User signup & login
- JWT-based authentication
- Protected routes
- Role-based access (Student / Instructor)

### 🎓 Student Features
- Browse courses by category
- Enroll in courses
- Track course progress
- View enrolled courses
- Rate & review courses

### 🧑‍🏫 Instructor Features
- Create & manage courses
- Upload course videos
- Edit sections & subsections
- View instructor dashboard

### 💳 Payments
- Razorpay integration for course purchases

## 🧠 Key Learnings

This project goes beyond CRUD and focuses on **production challenges**, including:
- CORS configuration between frontend & backend
- Environment variable management across platforms
- MongoDB TLS / SSL issues in production
- Case-sensitive import issues on Linux servers
- Debugging 502 & deployment-only errors
- Frontend–backend integration after deployment

## 📂 Project Structure
studynotion/
│
├── client/ # React frontend (Vite)
│
├── server/ # Node + Express backend
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── utils/
│
└── README.md


## ⚙️ Environment Variables

### Backend (`server/.env`)
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLIENT_URL=frontend_url

### Frontend (`client/.env`)
VITE_BASE_URL=backend_api_url
VITE_RAZORPAY_KEY=your_razorpay_key

## 🏃‍♂️ Running Locally

### Clone the repo
git clone https://github.com/vikasxvrma/mern-studynotion.git
cd mern-studynotion

### Start Backend
cd server
npm install
npm run dev

### Start Frontend
cd client 
npm install 
npm run dev

📌 Future Improvements

•Add caching for frequently used APIs
•Improve Lighthouse performance scores
•Add unit & integration tests
•Implement refresh tokens
•Optimize DB queries & indexing

👨‍💻 Author

Vikas Verma
•GitHub: https://github.com/vikasxvrma
•LinkedIn: https://www.linkedin.com/in/vikasxvrma

⭐ If you found this project useful or interesting, feel free to star the repo!
