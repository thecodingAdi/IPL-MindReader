from pypdf import PdfReader
import sys

pdf_path = r"c:\Users\Administrator\Pictures\IPLAkinator\DOC-20260512-WA0022..pdf"
out_path = r"c:\Users\Administrator\Pictures\IPLAkinator\pdf_output.txt"
try:
    reader = PdfReader(pdf_path)
    with open(out_path, 'w', encoding='utf-8') as f:
        for page in reader.pages:
            f.write(page.extract_text() + "\n")
    print("Success")
except Exception as e:
    print("Error:", e)
