 EcoTrack API (Backend)

This is the server-side application for EcoTrack. It handles database connections, user authentication, and API routes for managing eco-activities.

 Technologies

Node.js

Express.js

MongoDB (Mongoose)

bcryptjs (Password Hashing)

jsonwebtoken (Auth)

cors (Cross-Origin Resource Sharing)

 Environment Variables

Create a .env file in this directory with the following:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecotrack
JWT_SECRET=mysecretkey123


 API Endpoints

Authentication

POST /api/auth/register - Register a new user.

POST /api/auth/login - Login and receive a token.

GET /api/auth - Get logged-in user data (Protected).

Activities (Protected Routes)

GET /api/activities - Get all activities for the logged-in user.

POST /api/activities - Create a new activity.

PUT /api/activities/:id - Update an activity.

DELETE /api/activities/:id - Delete an activity.

 Run the Server

# Install dependencies
npm install

# Start the server
npm start
