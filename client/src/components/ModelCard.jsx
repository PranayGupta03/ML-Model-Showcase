// src/components/ModelCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModelCard.css';

const ModelCard = ({ title, path, level, features, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="model-card">
      <div className="card-header">
        <span className="model-icon">{icon}</span>
        <h3>{title}</h3>
        <span className={`level-badge ${level.toLowerCase()}`}>{level}</span>
      </div>
      <ul className="features">
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <button onClick={() => navigate(path)}>Explore & Implement →</button>
    </div>
  );
};

export default ModelCard;
