import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LinearRegression from './pages/LinearRegression';
import LogisticRegression from './pages/LogisticRegression';
import SVM from './pages/SVM';
import KNN from './pages/KNN';
import DecisionTree from './pages/DecisionTree';

import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app-container ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/linear-regression" element={<LinearRegression />} />
          <Route path="/logistic-regression" element={<LogisticRegression />} />
          <Route path="/svm" element={<SVM />} />
          <Route path="/knn" element={<KNN />} />
          <Route path="/decision-tree" element={<DecisionTree />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
