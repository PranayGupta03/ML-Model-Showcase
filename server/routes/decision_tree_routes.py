from flask import Blueprint, request, jsonify
from models.decision_tree_model import run_decision_tree_model

decision_tree_bp = Blueprint('decision_tree_bp', __name__)

@decision_tree_bp.route('/api/decision_tree', methods=['POST'])
def run_decision_tree_route():
    try:
        data = request.get_json()
        sepal_length = data.get("sepal_length")
        sepal_width = data.get("sepal_width")
        petal_length = data.get("petal_length")
        petal_width = data.get("petal_width")

        if None in [sepal_length, sepal_width, petal_length, petal_width]:
            return jsonify({"error": "All four features are required"}), 400

        result = run_decision_tree_model(sepal_length, sepal_width, petal_length, petal_width)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
