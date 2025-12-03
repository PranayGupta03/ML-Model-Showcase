import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LinearRegression.css';

const KNN = () => {
  const [formData, setFormData] = useState({
    sepal_length: '',
    sepal_width: '',
    petal_length: '',
    petal_width: ''
  });

  const [output, setOutput] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOutput(null);

    try {
      const response = await axios.post('http://localhost:5000/api/knn', {
        sepal_length: parseFloat(formData.sepal_length),
        sepal_width: parseFloat(formData.sepal_width),
        petal_length: parseFloat(formData.petal_length),
        petal_width: parseFloat(formData.petal_width)
      });

      setOutput(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="lr-container">
      <h1 className="page-title">K-Nearest Neighbors (KNN) – Iris Classification</h1>

      <div className="section">
        <h2>Run the Model</h2>
        <form onSubmit={handleSubmit} className="input-form">
          <div>
            <label>Sepal Length (cm)</label>
            <input
              type="number"
              step="any"
              name="sepal_length"
              value={formData.sepal_length}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Sepal Width (cm)</label>
            <input
              type="number"
              step="any"
              name="sepal_width"
              value={formData.sepal_width}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Petal Length (cm)</label>
            <input
              type="number"
              step="any"
              name="petal_length"
              value={formData.petal_length}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Petal Width (cm)</label>
            <input
              type="number"
              step="any"
              name="petal_width"
              value={formData.petal_width}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Run Model</button>
        </form>
        <p className="sample">Sample Input → Sepal Length: 5.1, Sepal Width: 3.5, Petal Length: 1.4, Petal Width: 0.2</p>
      </div>

      {error && <div className="error">⚠ {error}</div>}

      {output && (
        <div className="section output">
          <h2>Prediction Output</h2>
          <p><strong>Predicted Species:</strong> {output.prediction}</p>
          <p><strong>Accuracy:</strong> {output.accuracy}%</p>
          <div className="plots">
            <img src={`data:image/png;base64,${output.confusion_matrix}`} alt="Confusion Matrix" />
          </div>
        </div>
      )}

      <div className="section">
        <h2>About the Dataset</h2>
        <p>This model uses the classic <strong>Iris dataset</strong>, which contains data about three species of iris flowers:</p>
        <ul>
          <li>Iris-setosa</li>
          <li>Iris-versicolor</li>
          <li>Iris-virginica</li>
        </ul>
        <p>Features used for classification:</p>
        <ul>
          <li>Sepal Length (cm)</li>
          <li>Sepal Width (cm)</li>
          <li>Petal Length (cm)</li>
          <li>Petal Width (cm)</li>
        </ul>
      </div>

      <div className="section">
        <h2>About the Model</h2>
        <p><strong>K-Nearest Neighbors (KNN)</strong> is a simple, instance-based learning algorithm.</p>
        <p>How it works:</p>
        <ul>
          <li>It stores all available cases and classifies new cases based on a similarity measure (e.g., distance functions).</li>
          <li>A case is classified by a majority vote of its neighbors, with the case being assigned to the class most common among its K nearest neighbors measured by a distance function.</li>
        </ul>
        <p>Evaluation metric:</p>
        <ul>
          <li><strong>Accuracy Score</strong></li>
        </ul>
      </div>

      <div className="section">
        <h2>Model Code (Python)</h2>
        <pre className="code-block terminal">
          {`
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load and split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model (K=3)
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
`}
        </pre>
      </div>
    </div>
  );
};

export default KNN;
