import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64

def plot_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight')
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

def run_logistic_regression():
    try:
        # Load and preprocess dataset
        df = pd.read_csv("data/data.csv")
        df.drop(['Unnamed: 32', 'id'], axis=1, inplace=True)
        df['diagnosis'] = df['diagnosis'].map({'M': 1, 'B': 0})

        X = df.drop('diagnosis', axis=1)
        y = df['diagnosis']

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42
        )

        # Train model
        model = LogisticRegression(max_iter=1000)
        model.fit(X_train, y_train)

        # Predict and evaluate
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred, output_dict=True)

        # Confusion matrix plot
        cm = confusion_matrix(y_test, y_pred)
        fig, ax = plt.subplots()
        ax.matshow(cm, cmap='Blues', alpha=0.7)
        for i in range(cm.shape[0]):
            for j in range(cm.shape[1]):
                ax.text(x=j, y=i, s=cm[i, j], va='center', ha='center')
        plt.xlabel('Predicted')
        plt.ylabel('Actual')
        plt.title('Confusion Matrix')
        plot_cm = plot_to_base64(fig)
        plt.close(fig)

        return {
            "accuracy": round(accuracy * 100, 2),
            "report": report,
            "confusion_matrix": plot_cm
        }

    except Exception as e:
        return {"error": str(e)}
