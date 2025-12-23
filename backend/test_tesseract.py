"""Test Tesseract OCR configuration"""
import os
import shutil
from dotenv import load_dotenv
import pytesseract

load_dotenv()

tesseract_cmd = os.getenv("TESSERACT_CMD")
print(f"TESSERACT_CMD from .env: {tesseract_cmd}")

# Try to find Tesseract in PATH if not set in .env
if not tesseract_cmd:
    tesseract_path = shutil.which("tesseract")
    if tesseract_path:
        print(f"Found Tesseract in PATH: {tesseract_path}")
        tesseract_cmd = tesseract_path
        pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
    else:
        print("❌ TESSERACT_CMD not set in .env and tesseract not found in PATH")
        print("\nTo fix this:")
        print("1. Install Tesseract:")
        print("   macOS: brew install tesseract")
        print("   Linux: sudo apt-get install tesseract-ocr")
        print("2. If it's installed but not in PATH, add to .env:")
        print("   macOS (Apple Silicon): TESSERACT_CMD=/opt/homebrew/bin/tesseract")
        print("   macOS (Intel): TESSERACT_CMD=/usr/local/bin/tesseract")
        exit(1)

if tesseract_cmd:
    if os.path.exists(tesseract_cmd):
        pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
        print(f"✅ Tesseract executable found at: {tesseract_cmd}")
        try:
            version = pytesseract.get_tesseract_version()
            print(f"✅ Tesseract version: {version}")
        except Exception as e:
            print(f"❌ Error getting Tesseract version: {e}")
    else:
        print(f"❌ Tesseract executable NOT found at: {tesseract_cmd}")
        print("\nTo find Tesseract, run:")
        print("  which tesseract")
        print("Then add that path to .env as TESSERACT_CMD")


