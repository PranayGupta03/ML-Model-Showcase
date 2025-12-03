from flask import Blueprint, jsonify
from models.logistic_regression_model import run_logistic_regression

logistic_bp = Blueprint('logistic_bp', __name__)

@logistic_bp.route('/run/logistic_regression', methods=['GET'])
def run_logistic_regression_route():
    try:
        result = run_logistic_regression()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
