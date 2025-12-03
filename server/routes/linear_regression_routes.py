from flask import Blueprint, request, jsonify
from models.linear_regression_model import run_linear_regression

linear_bp = Blueprint('linear_bp', __name__)

@linear_bp.route('/predict/linear_regression', methods=['POST'])
def predict_linear_regression():
    try:
        data = request.json
        input_features = data.get("input_features")
        if not input_features:
            return jsonify({"error": "No input features provided"}), 400
        result = run_linear_regression(input_features)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
