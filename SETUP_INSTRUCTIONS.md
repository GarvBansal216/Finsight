# FinSight - Complete Setup Instructions

## ✅ All Errors Fixed

All errors in `app.py` (lines 883-1012 and throughout) have been fixed:
- ✅ Added `client` None checks to all extraction functions
- ✅ Fixed `extract_bank_statement_structured` (line 813)
- ✅ Fixed `extract_gst_return` (line 945)
- ✅ Fixed `extract_trial_balance` (line 1032)
- ✅ Fixed `extract_profit_loss` (line 1160)
- ✅ Fixed `extract_invoice` (line 1312)
- ✅ Fixed `extract_purchase_order` (line 1445)
- ✅ Fixed `extract_salary_slip` (line 1600)
- ✅ Fixed `extract_balance_sheet` (line 1751)
- ✅ Fixed `extract_audit_papers` (line 1873)
- ✅ Fixed `extract_agreement_contract` (line 1930)
- ✅ Fixed `validate_statement` (line 550)

## 🚀 Backend Setup (Python FastAPI)

### Step 1: Navigate to Backend Directory
```powershell
cd "C:\Users\LOQ\Downloads\FinSight-main\FinSight-main\backend"
```

### Step 2: Activate Virtual Environment
```powershell
.\venv\Scripts\Activate.ps1
```

If you get an execution policy error, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 3: Install/Update Dependencies
```powershell
pip install -r requirements.txt
```

**Important:** If you encounter an error about `httpx` and `proxies`, run:
```powershell
pip install --upgrade "openai>=1.3.5,<2.0.0"
```
This ensures compatible versions are installed.

### Step 4: Create .env File
Create a file named `.env` in the `backend/` directory with the following content:

```env
# OpenAI API Key (REQUIRED)
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# Server Configuration (Optional - defaults shown)
PORT=8000
HOST=0.0.0.0

# Poppler Path (Windows - if not in PATH)
# Uncomment and update if Poppler is not in your system PATH
# POPPLER_PATH=C:\Users\LOQ\Downloads\FinSight-main\FinSight-main\poppler-25.12.0\Library

# Tesseract Path (Windows - if not in PATH)
# Uncomment and update if Tesseract is not in your system PATH
# TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

**Important Notes:**
- Replace `sk-your-actual-openai-api-key-here` with your actual OpenAI API key
- Get your API key from: https://platform.openai.com/api-keys
- No quotes around the API key value
- No spaces around the `=` sign

### Step 5: Verify Poppler Installation
Poppler is already in your project at:
```
FinSight-main\poppler-25.12.0\Library\bin
```

If you haven't added it to PATH, uncomment and set `POPPLER_PATH` in `.env`:
```
POPPLER_PATH=C:\Users\LOQ\Downloads\FinSight-main\FinSight-main\poppler-25.12.0\Library
```

### Step 6: Verify Tesseract Installation
If you have the Tesseract installer (`tesseract-ocr-w64-setup-5.5.0.20241111.exe`), install it:
1. Run the installer
2. Note the installation path (usually `C:\Program Files\Tesseract-OCR`)
3. Add to `.env` if not in PATH:
```
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

### Step 7: Start the Backend Server

**Option 1: Using run.py (Recommended)**
```powershell
python run.py
```

**Option 2: Using uvicorn directly**
```powershell
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The server should start and show:
```
============================================================
Starting FinSight Backend Server
Host: 0.0.0.0
Port: 8000
============================================================
```

### Step 8: Verify Backend is Running
Open your browser and go to:
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

You should see `{"status": "healthy"}` for the health check.

## 🎨 Frontend Setup (React + Vite)

### Step 1: Navigate to Root Directory
```powershell
cd "C:\Users\LOQ\Downloads\FinSight-main\FinSight-main"
```

### Step 2: Install Dependencies (if not already installed)
```powershell
npm install
```

### Step 3: Create .env File for Frontend
Create a file named `.env` in the root `FinSight-main/` directory (same level as `package.json`):

```env
# FastAPI Backend URL
VITE_FASTAPI_URL=http://localhost:8000

# Optional: If you have a Node.js backend running on port 3000
# VITE_API_URL=http://localhost:3000/api/v1
```

**Important:** The frontend uses `VITE_FASTAPI_URL` to connect to the Python FastAPI backend.

### Step 4: Start the Frontend Development Server
```powershell
npm run dev
```

The frontend should start on `http://localhost:5173` (or another port if 5173 is busy).

## 🔗 Connecting Backend and Frontend

### How They Connect:
1. **Backend (FastAPI)** runs on `http://localhost:8000`
2. **Frontend (React)** runs on `http://localhost:5173` (or similar)
3. Frontend reads `VITE_FASTAPI_URL` from `.env` and makes API calls to the backend
4. The backend has CORS configured to allow requests from the frontend

### API Endpoints Used by Frontend:
- `GET /health` - Health check
- `POST /process` - Upload and process documents

## 🧪 Testing the Connection

### 1. Test Backend Health
```powershell
curl http://localhost:8000/health
```
Should return: `{"status":"healthy"}`

### 2. Test from Frontend
1. Open the frontend in browser: `http://localhost:5173`
2. Try uploading a document
3. Check browser console (F12) for any errors
4. Check backend terminal for request logs

## 📋 Complete Checklist

### Backend Setup:
- [ ] Virtual environment activated
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created in `backend/` with `OPENAI_API_KEY`
- [ ] Poppler path configured (if needed)
- [ ] Tesseract installed and configured (if needed)
- [ ] Backend server running on port 8000
- [ ] Health check works: http://localhost:8000/health

### Frontend Setup:
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created in root with `VITE_FASTAPI_URL=http://localhost:8000`
- [ ] Frontend dev server running
- [ ] Frontend accessible in browser

### Connection:
- [ ] Backend and frontend both running
- [ ] Frontend can reach backend (check Network tab in browser DevTools)
- [ ] No CORS errors in browser console
- [ ] Document upload works end-to-end

## 🐛 Troubleshooting

### Backend Issues:

**"ModuleNotFoundError: No module named 'pytesseract'"**
- Solution: Activate virtual environment and run `pip install -r requirements.txt`

**"OpenAI API key is not configured"**
- Solution: Create `.env` file in `backend/` with `OPENAI_API_KEY=your-key`

**"Poppler not found" or "Unable to get page count"**
- Solution: Set `POPPLER_PATH` in `.env` to point to the Library folder (not bin folder)
- Example: `POPPLER_PATH=C:\Users\LOQ\Downloads\FinSight-main\FinSight-main\poppler-25.12.0\Library`

**"Tesseract not found"**
- Solution: Install Tesseract and set `TESSERACT_CMD` in `.env`
- Or add Tesseract to your system PATH

### Frontend Issues:

**"Backend server is not responding"**
- Solution: Make sure backend is running on port 8000
- Check `VITE_FASTAPI_URL` in frontend `.env` matches backend URL

**CORS Errors**
- Solution: Backend CORS is already configured, but ensure frontend URL matches
- Backend allows all origins (`allow_origins=["*"]`)

**"Connection refused"**
- Solution: Start the backend server first, then the frontend

## 📝 Quick Start Commands

### Terminal 1 - Backend:
```powershell
cd "C:\Users\LOQ\Downloads\FinSight-main\FinSight-main\backend"
.\venv\Scripts\Activate.ps1
python run.py
```

### Terminal 2 - Frontend:
```powershell
cd "C:\Users\LOQ\Downloads\FinSight-main\FinSight-main"
npm run dev
```

## 🎯 What You Need to Get Started

1. **OpenAI API Key** - Get from https://platform.openai.com/api-keys
2. **Python 3.8+** - Already installed (you have venv)
3. **Node.js and npm** - Already installed (you have node_modules)
4. **Tesseract OCR** - Installer available in project root
5. **Poppler** - Already in project at `poppler-25.12.0\Library`

## 📚 Additional Resources

- Backend Python README: `backend/README_PYTHON.md`
- Quick Start Guide: `backend/QUICK_START.md`
- Setup Guide: `backend/SETUP_GUIDE.md`

---

**All errors have been fixed!** The backend should now run without issues. Make sure to:
1. Create the `.env` files (backend and frontend)
2. Add your OpenAI API key
3. Start both servers
4. Test the connection

Good luck! 🚀

