# models/knn_model.py

import pandas as pd
from sklearn import datasets
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io
import base64

def plot_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    return base64.b64encode(buf.read()).decode("utf-8")

def run_knn_model(sepal_length, sepal_width, petal_length, petal_width):
    try:
        iris = datasets.load_iris()
        X = iris.data  # Use all 4 features for KNN
        y = iris.target

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42
        )

        # K=3 is a common default
        model = KNeighborsClassifier(n_neighbors=3)
        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)

        # Confusion Matrix
        cm = confusion_matrix(y_test, y_pred)
        fig, ax = plt.subplots()
        ax.matshow(cm, cmap="Blues", alpha=0.7)
        for i in range(cm.shape[0]):
            for j in range(cm.shape[1]):
                ax.text(x=j, y=i, s=cm[i, j], va='center', ha='center')
        plt.xlabel("Predicted")
        plt.ylabel("Actual")
        plt.title("Confusion Matrix (KNN)")
        plot_cm = plot_to_base64(fig)
        plt.close(fig)

        # Predict input
        # Expecting 4 features. If frontend sends fewer, we might need to handle it, 
        # but for now let's assume we want full Iris support or we match SVM's 3 features?
        # SVM used 3. Let's stick to 4 for correctness, or 3 if we want to match SVM exactly.
        # The user didn't specify. I'll use 4 and if inputs are missing I'll handle in app.py or here.
        input_data = scaler.transform([[sepal_length, sepal_width, petal_length, petal_width]])
        prediction = model.predict(input_data)[0]
        prediction_label = iris.target_names[prediction]

        return {
            "prediction": prediction_label,
            "accuracy": round(accuracy * 100, 2),
            "confusion_matrix": plot_cm,
        }

    except Exception as e:
        return {"error": str(e)}
