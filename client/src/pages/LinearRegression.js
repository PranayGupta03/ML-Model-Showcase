import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LinearRegression.css';

const LinearRegression = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    children: '',
    sex: 'male',
    smoker: 'no',
    region: 'northwest'
  });

  const [output, setOutput] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { age, bmi, children, sex, smoker, region } = formData;

      const input_features = [
        parseFloat(age),
        parseFloat(bmi),
        parseInt(children),
        sex === 'male' ? 1 : 0,
        smoker === 'yes' ? 1 : 0,
        region === 'northwest' ? 1 : 0,
        region === 'southeast' ? 1 : 0,
        region === 'southwest' ? 1 : 0
      ];

      const response = await axios.post('http://localhost:5000/predict/linear_regression', {
        input_features
      });

      setOutput(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="lr-container">
      <h1 className="page-title">Linear Regression – Insurance Cost Prediction</h1>

      <div className="section">
        <h2>Run the Model</h2>
        <form onSubmit={handleSubmit} className="input-form">
          <div>
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div>
            <label>BMI</label>
            <input type="number" step="any" name="bmi" value={formData.bmi} onChange={handleChange} required />
          </div>
          <div>
            <label>Children</label>
            <input type="number" name="children" value={formData.children} onChange={handleChange} required />
          </div>
          <div>
            <label>Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label>Smoker</label>
            <select name="smoker" value={formData.smoker} onChange={handleChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label>Region</label>
            <select name="region" value={formData.region} onChange={handleChange}>
              <option value="northwest">Northwest</option>
              <option value="southeast">Southeast</option>
              <option value="southwest">Southwest</option>
            </select>
          </div>
          <button type="submit">Run Model</button>
        </form>
        <p className="sample">Sample Input → Age: 29, BMI: 27.9, Children: 0, Sex: Male, Smoker: No, Region: Southeast</p>
      </div>

      {error && <div className="error">⚠ {error}</div>}

      {output && (
        <div className="section output">
          <h2>Prediction Output</h2>
          <p><strong>Predicted Charges:</strong> ${output.prediction}</p>
          <p><strong>MSE:</strong> {output.mse}</p>
          <p><strong>RMSE:</strong> {output.rmse}</p>
          <p><strong>R² Score:</strong> {output.r2}</p>
          <div className="plots">
            <img src={`data:image/png;base64,${output.plot_actual_vs_predicted}`} alt="Actual vs Predicted" />
            <img src={`data:image/png;base64,${output.plot_residuals}`} alt="Residuals" />
          </div>
        </div>
      )}

      <div className="section">
        <h2>About the Dataset</h2>
        <p>The dataset used is a medical insurance dataset, where the goal is to predict medical insurance charges based on:</p>
        <ul>
          <li>Age</li>
          <li>BMI (Body Mass Index)</li>
          <li>Number of children</li>
          <li>Sex</li>
          <li>Smoker status</li>
          <li>Region</li>
        </ul>
        <p>Target variable: <strong>charges</strong> (insurance cost in USD).</p>
      </div>

      <div className="section">
        <h2>About the Model</h2>
        <p>This model uses <strong>Linear Regression</strong> to predict charges using the features above.</p>
        <p>Steps involved:</p>
        <ul>
          <li>One-hot encoding categorical features</li>
          <li>Standardizing the features using <code>StandardScaler</code></li>
          <li>Training with <code>LinearRegression</code> from scikit-learn</li>
        </ul>
        <p><strong>Formula:</strong></p>
        <code className="math-formula">y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ</code>
        <p>Evaluation metrics:</p>
        <ul>
          <li><strong>MSE</strong> – Mean Squared Error</li>
          <li><strong>RMSE</strong> – Root Mean Squared Error</li>
          <li><strong>R² Score</strong> – Coefficient of Determination</li>
        </ul>
      </div>

      <div className="section">
        <h2>Model Code (Python)</h2>
        <pre className="code-block terminal">
{`
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import io
import base64

def run_linear_regression(input_features=None):
    df = pd.read_csv('data/insurance.csv')
    df = pd.get_dummies(df, drop_first=True)
    X = df.drop('charges', axis=1)
    y = df['charges']

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    model = LinearRegression()
    model.fit(X_scaled, y)

    if input_features:
        input_scaled = scaler.transform([input_features])
        prediction = model.predict(input_scaled)
        return float(prediction[0])

    return None
`}
        </pre>
      </div>
    </div>
  );
};

export default LinearRegression;
