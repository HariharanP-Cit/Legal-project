import json

def safe_json_load(s):
    try:
        return json.loads(s)
    except Exception:
        return None
