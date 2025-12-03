import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="header">
      <div className="logo">ML Model Showcase</div>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/linear-regression">Linear</NavLink>
        <NavLink to="/logistic-regression">Logistic</NavLink>
        <NavLink to="/svm">SVM</NavLink>
        <NavLink to="/knn">KNN</NavLink>
        <NavLink to="/decision-tree">Decision Tree</NavLink>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
