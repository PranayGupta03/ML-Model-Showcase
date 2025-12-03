import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Icon components using SVG
const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
    <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
    <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
    <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const GitBranchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"></line>
    <circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="m18 9a9 9 0 0 1-9 9"></path>
  </svg>
);

const models = [
  { 
    name: "Linear Regression", 
    path: "/linear-regression", 
    color: "#6a11cb", 
    icon: <TrendingUpIcon />,
    description: "Best for predicting continuous values with linear relationships"
  },
  { 
    name: "Logistic Regression", 
    path: "/logistic-regression", 
    color: "#11998e", 
    icon: <BrainIcon />,
    description: "Ideal for binary classification and probability estimation"
  },
  { 
    name: "SVM", 
    path: "/svm", 
    color: "#ff416c", 
    icon: <ZapIcon />,
    description: "Powerful for high-dimensional data and complex boundaries"
  },
  { 
    name: "K-Nearest Neighbors", 
    path: "/knn", 
    color: "#fc4a1a", 
    icon: <UsersIcon />,
    description: "Simple yet effective for pattern recognition and recommendation"
  },
  { 
    name: "Decision Tree", 
    path: "/decision-tree", 
    color: "#00c9ff", 
    icon: <GitBranchIcon />,
    description: "Easy to interpret with clear decision-making rules"
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to ML Model Showcase</h1>
      <p className="home-subtitle">Explore and interact with different Machine Learning models!</p>
      
      <div className="model-grid">
        {models.map((model, index) => (
          <div
            key={index}
            className="model-card"
            style={{
              background: `linear-gradient(to bottom right, ${model.color}, #ffffff)`
            }}
            onClick={() => navigate(model.path)}
          >
            <div className="model-icon" style={{ background: model.color }}>
              {model.icon}
            </div>
            <div className="model-name">{model.name}</div>
            <div className="tooltip">{model.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;