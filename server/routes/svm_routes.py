from flask import Blueprint, request, jsonify
from models.svm_model import run_svm_model

svm_bp = Blueprint('svm_bp', __name__)

@svm_bp.route('/api/svm', methods=['POST'])
def run_svm_route():
    try:
        data = request.get_json()
        sepal_length = data.get("sepal_length")
        sepal_width = data.get("sepal_width")
        petal_length = data.get("petal_length")
        petal_width = data.get("petal_width")

        if None in [sepal_length, sepal_width, petal_length, petal_width]:
            return jsonify({"error": "All four features are required"}), 400

        result = run_svm_model(sepal_length, sepal_width, petal_length, petal_width)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
