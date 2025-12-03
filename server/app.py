from flask import Flask
from flask_cors import CORS
from routes.linear_regression_routes import linear_bp
from routes.logistic_regression_routes import logistic_bp
from routes.svm_routes import svm_bp
from routes.knn_routes import knn_bp
from routes.decision_tree_routes import decision_tree_bp

app = Flask(__name__)
CORS(app)  # Allow all CORS for dev

@app.route('/')
def index():
    return "ML Model Showcase Backend is Running!"

# Register Blueprints
app.register_blueprint(linear_bp)
app.register_blueprint(logistic_bp)
app.register_blueprint(svm_bp)
app.register_blueprint(knn_bp)
app.register_blueprint(decision_tree_bp)

if __name__ == '__main__':
    app.run(debug=True)
