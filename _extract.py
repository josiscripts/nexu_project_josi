from pypdf import PdfReader
import sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
r = PdfReader(r'C:\Users\josia\Desktop\nexu_proyecto\onboardings_nexu.pdf')
out = []
for i, p in enumerate(r.pages):
    out.append(f"\n========== PAGE {i+1} ==========\n")
    out.append(p.extract_text())
text = "\n".join(out)
with open(r'C:\Users\josia\Desktop\nexu_proyecto\_pdf_extracted.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print(f"Wrote {len(text)} chars across {len(r.pages)} pages")
