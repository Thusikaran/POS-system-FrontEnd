# POS System Frontend
## Overview
This is the frontend application for the POS System, developed using React. It provides user interfaces for managing products, categories, and processing orders through a simple Point of Sale (POS) system.

## Getting Started
### Prerequisites
Ensure you have the following software installed:

- Node.js (v14 or higher) - Download Node.js
- npm (Node Package Manager) - Comes with Node.js
## Setup
- Clone the Repository:
```
git clone https://github.com/Thusikaran/POS-System-FrontEnd.git
```
```
cd POS-System-FrontEnd
```
- Install Dependencies:
```
npm install
```
## Running the Application
- Start the Development Server:

```
npm start
```
This will start the development server and open the application in your default web browser. By default, it runs on http://localhost:3000.

- Build the Application for Production:
```
npm run build
```
This creates a build directory with a production build of your app.

## Directory Structure
src/: Contains the source code of the application.
-  components/: Reusable UI components.
-  pages/: Page components for different routes.
- services/: Functions to interact with backend APIs.
- App.js: The root component of the application.
- index.js: Entry point for the React application.
## Available Scripts
- npm start: Starts the development server.
- npm run build: Builds the app for production.
- npm test: Runs the test suite.
- npm run eject: Removes the single build dependency from your project.
## API Integration
The frontend communicates with the backend API for operations like fetching products, categories, and processing orders. Ensure the backend server is running and accessible.

- Backend API URL: Update the API URL in src/services/api.js if necessary.


## Troubleshooting
- Bootstrap CSS not found: Make sure Bootstrap is installed and correctly imported in src/index.js.
```
npm install bootstrap
```
- React icon import
```
  npm install react-icons
```


## Acknowledgements
- React
- Bootstrap
