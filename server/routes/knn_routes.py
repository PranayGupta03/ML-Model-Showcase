from flask import Blueprint, request, jsonify
from models.knn_model import run_knn_model

knn_bp = Blueprint('knn_bp', __name__)

@knn_bp.route('/api/knn', methods=['POST'])
def run_knn_route():
    try:
        data = request.get_json()
        sepal_length = data.get("sepal_length")
        sepal_width = data.get("sepal_width")
        petal_length = data.get("petal_length")
        petal_width = data.get("petal_width")

        if None in [sepal_length, sepal_width, petal_length, petal_width]:
            return jsonify({"error": "All four features are required"}), 400

        result = run_knn_model(sepal_length, sepal_width, petal_length, petal_width)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
