#!/bin/bash
echo "Setting up Python FastAPI Backend for FinSight..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed or not in PATH"
    echo "Please install Python 3.8+ from https://www.python.org/"
    exit 1
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to create virtual environment"
    exit 1
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a .env file with your OPENAI_API_KEY"
echo "2. Install Tesseract OCR:"
echo "   macOS: brew install tesseract"
echo "   Linux: sudo apt-get install tesseract-ocr"
echo "3. Install Poppler:"
echo "   macOS: brew install poppler"
echo "   Linux: sudo apt-get install poppler-utils"
echo "4. If Tesseract/Poppler are not in PATH, add to .env:"
echo "   TESSERACT_CMD=/opt/homebrew/bin/tesseract  # or wherever it's installed"
echo "   POPPLER_PATH=/opt/homebrew  # or wherever it's installed"
echo "5. Run: python run.py"
echo ""

