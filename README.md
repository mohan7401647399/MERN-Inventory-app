Deployed URL - https://inventorybillingapp-mern.netlify.app


# MERN Inventory App

An inventory management application designed to efficiently handle and track stock details. This full-stack application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and is tailored to provide seamless user experience for managing items and their details.

## Features

- **User Authentication**: Secure login and registration functionality with password encryption.
- **Inventory Management**: Add, update, delete, and view inventory items effortlessly.
- **Real-Time Data**: Instant updates with efficient state management.
- **Search and Filter**: Search for specific items and filter inventory based on categories.
- **Responsive Design**: Fully responsive application for all devices.
- **Dashboard and Analytics**: Gain insights with summarized inventory statistics.

## Live Demo

*Include the link if you have deployed the project (e.g., Heroku, Vercel, Netlify):*  
[[Live Demo]](https://inventorybillingapp-mern.netlify.app) (#)

## Technologies Used

### Frontend
- **React.js** for building dynamic user interfaces
- **Axios** for handling HTTP requests
- **React Router** for navigation
- **CSS/Styled Components** for UI design

### Backend
- **Node.js** and **Express.js** for server-side development
- **JWT (JSON Web Tokens)** for secure authentication
- **bcrypt** for hashing passwords

### Database
- **MongoDB** for NoSQL database management
- **Mongoose** for object data modeling (ODM)

## Installation

Follow these steps to set up the project locally.

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/try/download/community) locally or use a MongoDB Atlas cluster

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mohan7401647399/MERN-Inventory-app.git

2. Navigate to the project directory:
   ```bash
cd MERN-Inventory-app

3. Install dependencies:
   ```bash
   For the server:
    cd server
    npm install
   For the client:
    cd client
    npm install

4. Configure environment variables:
   ```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

5. Run the application:
    Start the backend:
        cd server
        npm run dev
    Start the frontend:
        cd client
        npm start
        
6. Open your browser and go to:
    [text](http://localhost:3000)

### Usage
   ```bash
    Registration and Login:
    Create a user account and log in with secure credentials.
    Manage Inventory:
    Add new items, modify existing ones, and delete unwanted records.
    Search and Filter:
    Quickly find items by name or category.
    Dashboard:
    View inventory analytics and insights.
