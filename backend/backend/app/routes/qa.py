from flask import Blueprint, request, jsonify
from app.services.ai_pipeline import answer_query

qa_bp = Blueprint("qa", __name__)

@qa_bp.route("/qa", methods=["POST"])
def qa():
    payload = request.json or {}
    query = payload.get("query")
    if not query:
        return jsonify({"error": "query required"}), 400
    answer = answer_query(query, k=5)
    return jsonify({"query": query, "answer": answer})
