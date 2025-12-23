# Quick Start Guide - FastAPI Backend

## Issue: Placeholder Data Instead of Real Output

If you're seeing placeholder data instead of real results, follow these steps:

### 1. Verify .env File Setup

Make sure you have a `.env` file in `FinSight/backend/` with:

```
OPENAI_API_KEY=sk-your-actual-key-here
```

**Important:** 
- The `.env` file must be in the `FinSight/backend/` directory
- No quotes around the key value
- No spaces around the `=` sign

### 2. Restart the FastAPI Server

After adding/updating the `.env` file, you **must restart** the server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd FinSight/backend
python run.py
```

### 3. Check Server is Running

Verify the server is running at `http://localhost:8000`:
- Open browser: `http://localhost:8000/docs` (should show API docs)
- Or: `http://localhost:8000/health` (should return `{"status": "healthy"}`)

### 4. Frontend Configuration

Make sure your frontend is configured to call the FastAPI backend:

Create or update `FinSight/.env` (in the root FinSight directory, not backend):

```
VITE_FASTAPI_URL=http://localhost:8000
```

Then restart your frontend dev server.

### 5. Test the API Directly

Test if the API is working:

```bash
# Using curl (PowerShell)
curl -X POST "http://localhost:8000/process" -F "file=@path/to/your/document.pdf"
```

Or use the interactive docs at `http://localhost:8000/docs`

### 6. Check Console for Errors

- Open browser DevTools (F12)
- Check Console tab for any errors
- Check Network tab to see if requests are being made

### Common Issues:

1. **"OPENAI_API_KEY environment variable is not set"**
   - Solution: Create `.env` file with your key

2. **Server not loading .env file**
   - Solution: Make sure you're using `python run.py` (which loads .env) or `uvicorn app:app --reload`

3. **CORS errors in browser**
   - Solution: The CORS middleware is already configured, but make sure the frontend URL matches

4. **"Connection refused" errors**
   - Solution: Make sure FastAPI server is running on port 8000

### Verification Steps:

1. ✅ `.env` file exists in `FinSight/backend/`
2. ✅ `OPENAI_API_KEY` is set correctly
3. ✅ FastAPI server is running (`python run.py`)
4. ✅ Server responds at `http://localhost:8000/health`
5. ✅ Frontend `.env` has `VITE_FASTAPI_URL=http://localhost:8000`
6. ✅ Frontend dev server restarted after adding `.env`

If all these are correct, you should see real data instead of placeholders!


