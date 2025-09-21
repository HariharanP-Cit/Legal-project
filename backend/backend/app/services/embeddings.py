import os
import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from app.config import FAISS_INDEX, ID_MAP, KB_SQLITE

MODEL_NAME = "all-MiniLM-L6-v2"

_model = None

def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)
    return _model

def encode_texts(texts):
    model = get_model()
    embs = model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
    embs = embs.astype("float32")
    return embs

def save_faiss_index(embeddings, path=FAISS_INDEX):
    if embeddings is None or len(embeddings) == 0:
        return
    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)
    faiss.normalize_L2(embeddings)
    index.add(embeddings)
    faiss.write_index(index, path)

def load_faiss_index(path=FAISS_INDEX):
    if not os.path.exists(path):
        raise RuntimeError("FAISS index missing")
    return faiss.read_index(path)

def save_id_map(id_map, path=ID_MAP):
    with open(path, "w") as fh:
        json.dump(id_map, fh)

def load_id_map(path=ID_MAP):
    if not os.path.exists(path):
        return {}
    with open(path, "r") as fh:
        return json.load(fh)
