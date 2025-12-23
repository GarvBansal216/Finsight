# Installing Tesseract OCR on Windows

Tesseract OCR is required for extracting text from images and PDFs.

## Quick Installation Steps

### Method 1: Download Installer (Recommended)

1. **Download Tesseract for Windows:**
   - Go to: https://github.com/UB-Mannheim/tesseract/wiki
   - Download the latest installer (e.g., `tesseract-ocr-w64-setup-5.x.x.exe`)

2. **Run the Installer:**
   - Install to default location: `C:\Program Files\Tesseract-OCR`
   - Or choose a custom location (remember the path!)

3. **Add to .env file:**
   - Open `FinSight/backend/.env`
   - Add this line (adjust path if you installed elsewhere):
     ```
     TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
     ```

4. **Restart your FastAPI server**

### Method 2: Using Chocolatey (If you have it)

```powershell
choco install tesseract
```

Then add to `.env`:
```
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

## Verify Installation

After installation, test if Tesseract works:

```powershell
# If added to PATH:
tesseract --version

# Or test the full path:
"C:\Program Files\Tesseract-OCR\tesseract.exe" --version
```

## Common Installation Paths

- Default: `C:\Program Files\Tesseract-OCR\tesseract.exe`
- 32-bit: `C:\Program Files (x86)\Tesseract-OCR\tesseract.exe`
- Custom: `C:\Your\Custom\Path\Tesseract-OCR\tesseract.exe`

## Update .env File

After installation, your `.env` file should look like:

```env
OPENAI_API_KEY=sk-your-key-here
POPPLER_PATH=C:\Users\punya mittal\newfin\FinSight\poppler-25.12.0\Library
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

**Important:** After updating `.env`, always restart your FastAPI server!

## Troubleshooting

### Issue: "tesseract is not installed or it's not in your PATH"
- **Solution**: Install Tesseract and add `TESSERACT_CMD` to `.env` with the full path to `tesseract.exe`
- Restart the server after updating `.env`

### Issue: "TESSERACT_CMD not working"
- Make sure the path points directly to `tesseract.exe` (not just the folder)
- Use forward slashes or double backslashes: `C:/Program Files/Tesseract-OCR/tesseract.exe` or `C:\\Program Files\\Tesseract-OCR\\tesseract.exe`
- Verify the file exists: `Test-Path "C:\Program Files\Tesseract-OCR\tesseract.exe"`


