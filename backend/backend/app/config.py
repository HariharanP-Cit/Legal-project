import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-jhARxoIHL8ll6-ECjbrzCnZw5vDoaN58My9Z3umXbtT3BlbkFJwGk8kEMwfJdTYgHf0ZjejSyB-NnuT9EluEj85AJQ4A")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4o-mini")  # change if needed

DB_DIR = os.path.join(BASE_DIR, "db")
KB_DIR = os.path.join(BASE_DIR, "knowledge_base")
DATA_DIR = os.path.join(BASE_DIR, "..", "data")
UPLOAD_DIR = os.path.join(DATA_DIR, "uploads")
PROCESSED_DIR = os.path.join(DATA_DIR, "processed")

KB_SQLITE = os.path.join(DB_DIR, "kb.sqlite")
FAISS_INDEX = os.path.join(DB_DIR, "vectors.index")
ID_MAP = os.path.join(DB_DIR, "id_map.json")
