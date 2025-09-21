from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io

def generate_summary_pdf(summary_text: str, qa_pairs=None, output_path=None):
    if qa_pairs is None:
        qa_pairs = []

    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    y = height - 40
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "Document Summary")
    y -= 30
    c.setFont("Helvetica", 11)
    for line in summary_text.split("\n"):
        c.drawString(40, y, line[:1000])
        y -= 14
        if y < 80:
            c.showPage()
            y = height - 40
    if qa_pairs:
        c.showPage()
        y = height - 40
        c.setFont("Helvetica-Bold", 14)
        c.drawString(40, y, "Q&A")
        y -= 30
        c.setFont("Helvetica", 11)
        for q, a in qa_pairs:
            c.drawString(40, y, f"Q: {q}")
            y -= 14
            c.drawString(40, y, f"A: {a}")
            y -= 20
            if y < 80:
                c.showPage()
                y = height - 40
    c.save()
    buffer.seek(0)
    if output_path:
        with open(output_path, "wb") as fh:
            fh.write(buffer.read())
        return output_path
    else:
        return buffer.getvalue()
