import os
import textract

# lightweight wrapper for extracting text from different file types
# person 1 can extend/replace with pdfplumber, python-docx, pytesseract for OCR

def extract_text_from_file(path: str) -> str:
    text = ""
    try:
        text = textract.process(path).decode("utf-8", errors="ignore")
    except Exception:
        with open(path, "r", encoding="utf-8", errors="ignore") as fh:
            text = fh.read()
    # normalize whitespace
    return " ".join(text.split())
