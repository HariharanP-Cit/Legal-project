from flask import Blueprint, request, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from app.config import UPLOAD_DIR
from app.utils.file_handler import save_file

upload_bp = Blueprint("upload", __name__)

ALLOWED_EXT = {"pdf", "txt", "docx", "json"}

def allowed(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXT

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "no file part"}), 400
    f = request.files["file"]
    if f.filename == "":
        return jsonify({"error": "no selected file"}), 400
    if not allowed(f.filename):
        return jsonify({"error": "file type not allowed"}), 400
    filename = secure_filename(f.filename)
    path = save_file(f, UPLOAD_DIR, filename)
    return jsonify({"status": "ok", "path": path})
