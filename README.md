# ML Model Showcase

A full-stack web application demonstrating various Machine Learning models (Linear Regression, Logistic Regression, SVM, KNN, Decision Tree) with a React frontend and Python Flask backend.

## Features

- **Interactive UI**: Clean, responsive interface built with React.
- **Multiple Models**:
  - Linear Regression (Insurance Cost Prediction)
  - Logistic Regression (Breast Cancer Classification)
  - Support Vector Machine (Iris Classification)
  - K-Nearest Neighbors (Iris Classification)
  - Decision Tree (Iris Classification)
- **Dark Mode**: Toggle between light and dark themes.
- **Real-time Predictions**: Instant feedback from the backend API.
- **Visualizations**: Confusion matrices and accuracy scores.

## Tech Stack

- **Frontend**: React, React Router, Axios, Lucide React (Icons)
- **Backend**: Python, Flask, Scikit-learn, Pandas, Matplotlib

## Setup Instructions

### Prerequisites

- Node.js and npm
- Python 3.x

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```
3. Run the server:
   ```bash
   python app.py
   ```
   The server will start on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`.

## Project Structure

```
ml-model-showcase/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components (Header, etc.)
│       ├── pages/          # Page components for each model
│       ├── styles/         # CSS files
│       └── App.js          # Main application component
├── server/                 # Flask Backend
│   ├── models/             # ML Model implementations
│   ├── routes/             # API Route definitions
│   └── app.py              # Application entry point
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```
