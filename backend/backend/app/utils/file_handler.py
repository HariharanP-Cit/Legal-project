import os
from werkzeug.datastructures import FileStorage

def save_file(fileobj: FileStorage, upload_dir: str, filename: str = None) -> str:
    os.makedirs(upload_dir, exist_ok=True)
    if filename is None:
        filename = fileobj.filename
    path = os.path.join(upload_dir, filename)
    fileobj.save(path)
    return path

def read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as fh:
        return fh.read()
