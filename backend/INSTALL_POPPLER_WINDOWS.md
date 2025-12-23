# Installing Poppler on Windows

Poppler is required for converting PDF pages to images for OCR processing.

## Quick Installation Steps

### Method 1: Download Pre-built Binary (Recommended)

1. **Download Poppler for Windows:**
   - Go to: http://blog.alivate.com.au/poppler-windows/
   - Download the latest release (usually a ZIP file like `poppler-0.xx.x-windows.zip`)

2. **Extract the ZIP file:**
   - Extract to a location like `C:\poppler` or `C:\Program Files\poppler`
   - After extraction, you should have a folder structure like:
     ```
     C:\poppler\
       └── Library\
           └── bin\
               ├── pdftoppm.exe
               ├── pdftotext.exe
               └── ... (other poppler tools)
     ```

3. **Add to PATH (Option A - System PATH):**
   - Open System Properties → Environment Variables
   - Edit the `Path` variable
   - Add: `C:\poppler\Library\bin` (or wherever you extracted it)
   - Click OK and restart your terminal/IDE

4. **OR Configure in .env (Option B - Recommended):**
   - Open `FinSight/backend/.env`
   - Add this line:
     ```
     POPPLER_PATH=C:\poppler\Library
     ```
   - **Important**: Use the path to the folder containing `bin`, NOT the `bin` folder itself
   - Restart your FastAPI server

### Method 2: Using Chocolatey (If you have it installed)

```powershell
choco install poppler
```

Then add to `.env`:
```
POPPLER_PATH=C:\ProgramData\chocolatey\lib\poppler\tools
```

## Verify Installation

After installation, test if Poppler works:

```powershell
# If added to PATH:
pdftoppm -h

# Or check if the path is correct:
dir C:\poppler\Library\bin\pdftoppm.exe
```

## Common Issues

### Issue: "Unable to get page count"
- **Solution**: Make sure Poppler is installed and `POPPLER_PATH` in `.env` points to the folder containing `bin` (not `bin` itself)
- Restart your FastAPI server after updating `.env`

### Issue: "POPPLER_PATH not working"
- Make sure the path in `.env` is correct
- Use forward slashes or double backslashes: `C:/poppler/Library` or `C:\\poppler\\Library`
- The path should point to the folder that contains `bin`, not the `bin` folder itself

### Issue: "Still getting errors after installation"
1. Verify Poppler is installed: Check if `pdftoppm.exe` exists in the bin folder
2. Check your `.env` file has the correct path
3. **Restart your FastAPI server** (this is important!)
4. Check server logs for more detailed error messages

## Example .env Configuration

```env
OPENAI_API_KEY=sk-your-key-here
POPPLER_PATH=C:\poppler\Library
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

After updating `.env`, always restart your FastAPI server!


