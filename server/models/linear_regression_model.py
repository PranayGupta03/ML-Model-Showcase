import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from math import sqrt
import matplotlib.pyplot as plt
import io
import base64

def plot_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight')
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

def run_linear_regression(input_features=None):
    try:
        df = pd.read_csv('data/insurance.csv')
        df = pd.get_dummies(df, drop_first=True)

        X = df.drop('charges', axis=1)
        y = df['charges']

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

        model = LinearRegression()
        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        rmse = sqrt(mse)

        result = {
            "mse": round(mse, 2),
            "r2": round(r2, 4),
            "rmse": round(rmse, 2)
        }

        if input_features:
            if len(input_features) != X.shape[1]:
                raise ValueError(f"Expected {X.shape[1]} features, got {len(input_features)}")
            # Convert input_features into a DataFrame with same columns as X to avoid warning
            input_df = pd.DataFrame([input_features], columns=X.columns)
            input_scaled = scaler.transform(input_df)
            prediction = model.predict(input_scaled)[0]
            result["prediction"] = round(prediction, 2)

        fig1, ax1 = plt.subplots()
        ax1.scatter(y_test, y_pred, color='blue')
        ax1.plot([y.min(), y.max()], [y.min(), y.max()], 'k--', lw=2)
        ax1.set_xlabel('Actual')
        ax1.set_ylabel('Predicted')
        ax1.set_title('Actual vs Predicted')

        fig2, ax2 = plt.subplots()
        residuals = y_test - y_pred
        ax2.scatter(y_pred, residuals, color='green')
        ax2.axhline(y=0, color='red', linestyle='--')
        ax2.set_xlabel('Predicted')
        ax2.set_ylabel('Residuals')
        ax2.set_title('Residuals Plot')

        result["plot_actual_vs_predicted"] = plot_to_base64(fig1)
        result["plot_residuals"] = plot_to_base64(fig2)

        plt.close(fig1)
        plt.close(fig2)

        return result

    except Exception as e:
        return {"error": str(e)}
