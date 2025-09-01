# Notes App

A full-stack notes application with email/OTP and Google authentication.

## Features
- User signup/login via:
  - Email + OTP
  - Google account
- Proper input & OTP validation with error messages
- JWT-based authentication for notes
- Create and delete personal notes
- Responsive, mobile-friendly UI
- Welcome page showing user info after login/signup

## Tech Stack
- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB, JWT  
- **Auth**: Google OAuth, OTP verification  

## Run Locally
### Backend
```bash
cd backend
npm install
npx tsc
npm start

cd frontend
npm install
npm run dev
