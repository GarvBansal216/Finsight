# Fix: Elevation Error (WinError 740)

## Problem
You're getting: `[WinError 740] The requested operation requires elevation`

This error means Windows is blocking an operation that requires administrator privileges.

## Solutions (Try in order)

### Solution 1: Run Server as Administrator (Quick Fix)

1. **Close your current server** (Ctrl+C)

2. **Open PowerShell or Command Prompt as Administrator:**
   - Right-click on PowerShell/CMD
   - Select "Run as Administrator"

3. **Navigate to your backend directory:**
   ```powershell
   cd "C:\Users\punya mittal\newfin\FinSight\backend"
   ```

4. **Activate virtual environment** (if using one):
   ```powershell
   venv\Scripts\activate
   ```

5. **Start the server:**
   ```powershell
   python run.py
   ```

### Solution 2: Check Windows Defender / Antivirus

Sometimes antivirus software blocks executables:

1. **Add exceptions in Windows Defender:**
   - Go to Windows Security → Virus & threat protection
   - Add exclusions for:
     - `C:\Program Files\Tesseract-OCR\`
     - `C:\Users\punya mittal\newfin\FinSight\poppler-25.12.0\`
     - Your Python installation folder

2. **Temporarily disable real-time protection** to test if that's the issue

### Solution 3: Check File Permissions

Ensure you have write permissions to the temp directory:

```powershell
# Test if you can write to temp directory
$tempDir = [System.IO.Path]::GetTempPath()
Test-Path $tempDir
New-Item -Path "$tempDir\test.txt" -ItemType File -Force
Remove-Item "$tempDir\test.txt"
```

### Solution 4: Use Different Temp Directory

If the default temp directory has issues, you can set a custom one:

1. Create a folder: `C:\Users\punya mittal\newfin\FinSight\temp`

2. Add to `.env`:
   ```
   TEMP_DIR=C:\Users\punya mittal\newfin\FinSight\temp
   ```

## Most Likely Solution

**Run the FastAPI server as Administrator** - This is usually the quickest fix for elevation errors on Windows.

## After Fixing

1. Restart your FastAPI server
2. Try uploading a PDF again
3. The error should be resolved


