# FinSight Python FastAPI Backend

This is the Python FastAPI implementation for the FinSight document processing service.

## Prerequisites

1. **Python 3.8+** installed
2. **Tesseract OCR** installed:
   - Windows: Download from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)
   - macOS: `brew install tesseract`
   - Linux: `sudo apt-get install tesseract-ocr`
3. **Poppler** (for PDF to image conversion):
   - **Windows**: 
     1. Download from [Poppler for Windows](http://blog.alivate.com.au/poppler-windows/)
     2. Extract the ZIP file to a location like `C:\poppler` or `C:\Program Files\poppler`
     3. Add `C:\poppler\Library\bin` (or wherever you extracted it) to your system PATH, OR
     4. Set `POPPLER_PATH` in your `.env` file (see below)
   - **macOS**: `brew install poppler`
   - **Linux**: `sudo apt-get install poppler-utils`
4. **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/)

## Installation

1. Navigate to the backend directory:
```bash
cd FinSight/backend
```

2. **Quick Setup (macOS/Linux):**
   ```bash
   ./setup_python.sh
   ```
   This script will create the virtual environment, activate it, and install all dependencies.

   **Or manually:**
   
   Create a virtual environment (recommended):
   ```bash
   python3 -m venv venv
   ```

   Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

   Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   - Create a `.env` file in the `backend/` directory
   - Add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
   
   **For Windows users** - If Poppler or Tesseract are not in PATH, add these to `.env`:
   ```
   POPPLER_PATH=C:\poppler\Library
   TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
   ```
   
   **For macOS users** - If Poppler or Tesseract are not in PATH, add these to `.env`:
   ```
   # Apple Silicon Macs:
   POPPLER_PATH=/opt/homebrew
   TESSERACT_CMD=/opt/homebrew/bin/tesseract
   
   # Intel Macs:
   POPPLER_PATH=/usr/local
   TESSERACT_CMD=/usr/local/bin/tesseract
   ```
   
   **Note**: For Poppler, use the path to the folder containing the `bin` directory (not the `bin` directory itself).

## Running the Server

### Development Mode
```bash
python app.py
```

Or using uvicorn directly:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /` - Root endpoint
- `GET /health` - Health check

### Document Processing
- `POST /process` - Upload and process a document
  - Accepts: PDF, JPG, JPEG, PNG files
  - Returns: Processed data with validation results

## Example Usage

### Using curl:
```bash
curl -X POST "http://localhost:8000/process" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@bank_statement.pdf"
```

### Using Python requests:
```python
import requests

url = "http://localhost:8000/process"
files = {"file": open("bank_statement.pdf", "rb")}
response = requests.post(url, files=files)
print(response.json())
```

## Features

- ✅ OCR text extraction from PDFs and images
- ✅ Document type classification (Bank Statement, Invoice, etc.)
- ✅ Bank statement data extraction
- ✅ Transaction validation and reconciliation
- ✅ Anomaly detection
- ✅ PDF report generation

## Troubleshooting

1. **Tesseract not found**: 
   - Make sure Tesseract is installed and in your PATH, or set `TESSERACT_CMD` in `.env`
   - Windows: Download from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)

2. **Poppler not found / "Unable to get page count"**:
   - **Windows**: 
     - Download Poppler from [here](http://blog.alivate.com.au/poppler-windows/)
     - Extract to `C:\poppler` (or any location)
     - Option 1: Add `C:\poppler\Library\bin` to your system PATH
     - Option 2: Add to `.env`: `POPPLER_PATH=C:\poppler\Library` (use the folder containing `bin`, not `bin` itself)
   - **macOS**: `brew install poppler`
   - **Linux**: `sudo apt-get install poppler-utils`
   - After installation, **restart your FastAPI server**

3. **OpenAI API errors**: Check your API key and ensure you have credits

4. **Memory issues with large PDFs**: Consider processing pages in batches

## Notes

- The current implementation uses `eval()` for JSON parsing from OpenAI responses. In production, consider using more robust JSON parsing.
- File cleanup is handled automatically, but ensure proper error handling in production.
- CORS is currently set to allow all origins - configure properly for production.

