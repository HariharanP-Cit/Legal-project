from flask import Blueprint, request, jsonify
from app.services.ai_pipeline import summarize_text, extract_clauses

summarize_bp = Blueprint("summarize", __name__)

@summarize_bp.route("/summarize", methods=["POST"])
def summarize():
    payload = request.json or {}
    text = payload.get("document_text") or payload.get("text")
    if not text:
        return jsonify({"error": "document_text required"}), 400
    summary = summarize_text(text)
    clauses = extract_clauses(text)
    return jsonify({"summary": summary, "clauses": clauses})
