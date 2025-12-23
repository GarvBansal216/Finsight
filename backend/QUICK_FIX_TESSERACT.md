# Quick Fix: Install Tesseract OCR

## ✅ Good News: Poppler is Working!

The error has changed from Poppler to Tesseract, which means Poppler is now correctly configured!

## 🔧 Install Tesseract OCR

### Step 1: Download and Install

1. **Download Tesseract:**
   - Go to: **https://github.com/UB-Mannheim/tesseract/wiki**
   - Download the latest Windows installer (e.g., `tesseract-ocr-w64-setup-5.x.x.exe`)

2. **Install:**
   - Run the installer
   - **Default location:** `C:\Program Files\Tesseract-OCR`
   - Or choose a custom location (remember it!)

### Step 2: Update .env File

After installation, update your `.env` file:

1. Open `FinSight/backend/.env`
2. Add this line (adjust path if you installed elsewhere):
   ```
   TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
   ```

3. Your complete `.env` should look like:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   POPPLER_PATH=C:\Users\punya mittal\newfin\FinSight\poppler-25.12.0\Library
   TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
   ```

### Step 3: Restart Server

**IMPORTANT:** After updating `.env`, restart your FastAPI server:
```bash
# Stop server (Ctrl+C)
# Then restart:
python run.py
```

## Verify Installation

After installing, test:
```powershell
"C:\Program Files\Tesseract-OCR\tesseract.exe" --version
```

If this works, Tesseract is installed correctly!

## Alternative: If Tesseract is Already Installed

If Tesseract is installed but in a different location, find it:
```powershell
where.exe tesseract
```

Then update `TESSERACT_CMD` in `.env` with the correct path.


