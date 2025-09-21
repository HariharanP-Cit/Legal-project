from flask import Flask
from flask_cors import CORS
from app.routes.summarize import summarize_bp
from app.routes.qa import qa_bp
from app.routes.upload import upload_bp
from app.routes.health import health_bp
import os
from app.config import UPLOAD_DIR

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(summarize_bp, url_prefix="/api")
    app.register_blueprint(qa_bp, url_prefix="/api")
    app.register_blueprint(upload_bp, url_prefix="/api")
    app.register_blueprint(health_bp, url_prefix="/api")

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
