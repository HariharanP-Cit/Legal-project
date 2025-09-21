import os
import json
import sqlite3
from tqdm import tqdm
from app.config import KB_DIR, DB_DIR, KB_SQLITE, FAISS_INDEX, ID_MAP
from app.services.embeddings import encode_texts, save_faiss_index, save_id_map
import numpy as np

os.makedirs(DB_DIR, exist_ok=True)

def build():
    # remove existing DB/index if any
    if os.path.exists(KB_SQLITE):
        os.remove(KB_SQLITE)
    conn = sqlite3.connect(KB_SQLITE)
    cur = conn.cursor()
    cur.execute("CREATE TABLE clauses (id INTEGER PRIMARY KEY, country TEXT, section_path TEXT, text TEXT, metadata TEXT)")
    conn.commit()

    texts = []
    id_map = {}
    pos = 0

    for fname in os.listdir(KB_DIR):
        if not fname.endswith(".json"):
            continue
        path = os.path.join(KB_DIR, fname)
        with open(path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        # expected format: { "clauses": [ { "section": "...", "text": "...", "meta": {...} }, ... ] }
        for clause in tqdm(data.get("clauses", []), desc=fname):
            section = clause.get("section", "")
            text = clause.get("text", "")
            metadata = clause.get("meta", {})
            cur.execute("INSERT INTO clauses (country, section_path, text, metadata) VALUES (?,?,?,?)",
                        (fname.replace(".json", ""), section, text, json.dumps(metadata)))
            rowid = cur.lastrowid
            if text:
                texts.append(text)
                id_map[str(pos)] = rowid
                pos += 1
    conn.commit()
    conn.close()

    if texts:
        embs = encode_texts(texts)
        save_faiss_index(embs, path=FAISS_INDEX)
        save_id_map(id_map, path=ID_MAP)
    print("Build complete.")

if __name__ == "__main__":
    build()
