Daily Trivia Game
A daily trivia game with a 30-second timer that saves user scores to a MongoDB database. This project is built with Next.js and designed to be deployed on Vercel.
Features

Daily trivia question that changes each day
30-second timer for answering questions
Score tracking based on how quickly users answer
Leaderboard showing top scores
User gets only one chance to answer each question
MongoDB integration for persistent data storage

Prerequisites

Node.js 14+ installed
npm or yarn
MongoDB Atlas account (or other MongoDB provider)
Vercel account for deployment

Local Development

Clone the repository
Install dependencies
Copynpm install

Create a .env.local file in the root directory with the following variables:
CopyMONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name

Run the development server
Copynpm run dev

Open http://localhost:3000 in your browser

Deployment to Vercel

Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
Create a new project on Vercel and import your repository
Add the environment variables in the Vercel project settings:

MONGODB_URI: Your MongoDB connection string
MONGODB_DB: Your database name


Deploy the project

Setting up Environment Variables in Vercel

Go to your project in the Vercel dashboard
Click on "Settings" > "Environment Variables"
Add your MongoDB URI and database name
Redeploy your application if necessary

Customizing Questions
To customize the trivia questions, edit the questions array in lib/questions.js. In a production environment, you might want to:

Connect to a trivia API service
Create an admin interface to add questions
Set up a more robust question rotation system

Database Schema
The application uses a simple MongoDB schema:

Collection: scores

username: String
score: Number
date: Date



License
MIT
