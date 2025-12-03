import React, { useState } from 'react';
import '../styles/LogisticRegression.css';

const LogisticRegression = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleRunModel = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:5000/run/logistic_regression', {
        method: 'GET'
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="lr-container">
      <h1>Logistic Regression - Breast Cancer Detection</h1>

      <div className="section">
        <button onClick={handleRunModel}>Run Model</button>
        {error && <div className="error">⚠ {error}</div>}
      </div>

      {result && (
        <div className="section output">
          <h2>📈 Model Output</h2>
          <p><strong>Accuracy:</strong> {result.accuracy}%</p>
          <h3>Classification Report</h3>
          <pre className="code-block">{JSON.stringify(result.report, null, 2)}</pre>
          <h3>Confusion Matrix</h3>
          <img src={`data:image/png;base64,${result.confusion_matrix}`} alt="Confusion Matrix" />
        </div>
      )}

      <div className="section">
        <h2>📁 Dataset Information</h2>
        <p>This model uses the <strong>Breast Cancer Wisconsin Diagnostic Dataset</strong>.</p>
        <ul>
          <li>569 samples of cell nuclei</li>
          <li>30 numeric features (mean, standard error, worst values of cell size, texture, radius, etc.)</li>
          <li>Diagnosis: <strong>1 = Malignant</strong>, <strong>0 = Benign</strong></li>
        </ul>
      </div>

      <div className="section">
        <h2>🧠 How Logistic Regression Works</h2>
        <p>Logistic Regression is used for binary classification. It predicts the probability that an input belongs to a certain class.</p>
        <p>It uses the sigmoid function:</p>
        <pre className="code-block">σ(z) = 1 / (1 + e<sup>-z</sup>)</pre>
        <p>Where <code>z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b</code></p>
        <p>If σ(z) ≥ 0.5 → class 1 (Malignant), else → class 0 (Benign)</p>
        <p>The model is trained using Maximum Likelihood Estimation to minimize classification error.</p>
      </div>

      <div className="section">
        <h2>👨‍💻 Logistic Regression Python Code</h2>
        <pre className="code-block">
{`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, accuracy_score

df = pd.read_csv("data.csv")
df.drop(['Unnamed: 32', 'id'], axis=1, inplace=True)
df['diagnosis'] = df['diagnosis'].map({'M': 1, 'B': 0})

X = df.drop('diagnosis', axis=1)
y = df['diagnosis']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
print(accuracy_score(y_test, y_pred))`}
        </pre>
      </div>
    </div>
  );
};

export default LogisticRegression;
