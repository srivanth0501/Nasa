# NASA Space Explorer
A web application that utilizes NASA's Open APIs to showcase space-related data using React frontend that communicates with a Node.js backend running Express. This application allows users to explore and interact with NASA's vast array of space data.


## Live Demo

Frontend: [NASA Space Explorer](https://nasafrontend.vercel.app/)

Backend: [NASA API Server](https://nasa-backend-h1me.onrender.com)

GitHub Repository: [NASA Project](https://github.com/srivanth0501/Nasa.git)

## Tech Stack

### Frontend:

React.js (with Hooks & Context API)

Tailwind CSS for styling

React Router for navigation

React Three Fiber (for 3D visuals)

Axios (for API requests)

### Backend:

Node.js & Express

NASA Open APIs

JWT Authentication

CORS & Body-parser

Jest (for testing)

### Deployment:

Frontend: Vercel

Backend: Render

 Installation & Setup

1️⃣ Clone the Repository

 git clone https://github.com/srivanth0501/Nasa.git
 cd Nasa

2️⃣ Backend Setup

 cd Backend  
 npm install  

Create a .env file in the Backend directory:

PORT=5000
NASA_API_KEY=DEMO_KEY  
JWT_SECRET=your_secret_key

Start the backend server:

 npm start

3️⃣ Frontend Setup

 cd ../Frontend  
 npm install  

Start the frontend:

 npm start

### Features

User Authentication (JWT)
Astronomy Picture of the Day (APOD)
Mars Rover Photos (Sol & Earth Date Search) 
AI Chatbot for Space Queries
Responsive UI & Dark Mode
Loading States & Error Handling 
Unit & Integration Testing 
Deployed on Vercel & Render

### API Endpoints

🔹 APOD (Astronomy Picture of the Day)

GET /api/apod → Fetch latest APOD

GET /api/apod?date=YYYY-MM-DD → Fetch APOD for a specific date

🔹 Mars Rover Photos

GET /api/mars-photos?rover=curiosity&sol=1000

GET /api/mars-photos?earth_date=2023-05-10

🔹 AI Chatbot

POST /api/chatbot → Ask space-related questions

### Testing

Run Frontend Tests

 cd Frontend
 npm test

Run Backend Tests

 cd Backend
 npm test

### Deployment

1️⃣ Deploy Backend to Render

Go to Render

Create a new Web Service

Connect to GitHub Repo → Select Backend

Set Environment Variables (NASA_API_KEY, JWT_SECRET)

Click Deploy

2️⃣ Deploy Frontend to Vercel

Go to Vercel

Create a new project

Connect to GitHub Repo → Select Frontend

Click Deploy

### AI Chatbot Sample Questions

You can ask the chatbot questions like:

"What is today's astronomy picture?"

"Show me a Mars rover image."

### Test Credentials

Use the following credentials to log in:

Email: user1@nasa.com
Password: user1

