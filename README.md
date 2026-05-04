# Mini SaaS Template Store

This is a full-stack web application built as part of the Full Stack Web Developer Intern technical task. It allows users to browse a list of templates, register and log in to an account, and mark their favorite templates.

## Tech Stack

- **Frontend:** React.js (Create React App), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **ORM:** Knex.js
- **Authentication:** JWT (JSON Web Tokens) with Bcrypt for password hashing

## Implemented Features

- User Registration & Login (JWT Auth)
- View a list of available templates
- Search and Filter templates by Category
- Mark templates as "Favorite"
- View favorited templates in a protected "My Favorites" section
- Clean and responsive UI using Tailwind CSS

## Setup Instructions

### Prerequisites
- Node.js installed on your machine

### 1. Backend Setup

1. Open a terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Initialize the database and seed it with sample templates:
   ```bash
   node initDb.js
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will run on `http://localhost:3000`.*


