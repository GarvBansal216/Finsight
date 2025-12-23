"""Test script to verify Poppler installation"""
import os
import platform
from dotenv import load_dotenv
from pdf2image import convert_from_path

# Detect operating system
IS_WINDOWS = platform.system() == "Windows"
EXE_EXT = ".exe" if IS_WINDOWS else ""

# Load environment variables
load_dotenv()

poppler_path = os.getenv("POPPLER_PATH")
print(f"POPPLER_PATH from .env: {poppler_path}")

if poppler_path:
    poppler_bin = os.path.join(poppler_path, "bin")
    print(f"Poppler bin directory: {poppler_bin}")
    print(f"Bin directory exists: {os.path.exists(poppler_bin)}")
    
    # Check for pdftoppm (with appropriate extension for OS)
    pdftoppm = os.path.join(poppler_bin, f"pdftoppm{EXE_EXT}")
    print(f"pdftoppm{EXE_EXT} exists: {os.path.exists(pdftoppm)}")
    
    if os.path.exists(pdftoppm):
        print("\n✅ Poppler is correctly configured!")
        print(f"Path: {poppler_path}")
        print("\nTo test with a PDF, use:")
        print(f"  pages = convert_from_path('test.pdf', poppler_path=r'{poppler_path}')")
    else:
        print(f"\n❌ pdftoppm{EXE_EXT} not found at: {pdftoppm}")
else:
    print("❌ POPPLER_PATH not set in .env file")
    print("\nOn macOS, you can install Poppler with:")
    print("  brew install poppler")
    print("\nThen either:")
    print("  1. Add it to your PATH, or")
    print("  2. Set POPPLER_PATH in .env (usually /opt/homebrew/bin or /usr/local/bin)")


