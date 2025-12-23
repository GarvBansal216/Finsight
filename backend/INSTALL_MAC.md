# Installing Dependencies on macOS

This guide will help you set up the FinSight backend on macOS.

## Prerequisites

1. **Python 3.8+** - Check if installed:
   ```bash
   python3 --version
   ```
   If not installed, download from [python.org](https://www.python.org/downloads/) or use Homebrew:
   ```bash
   brew install python3
   ```

2. **Homebrew** (recommended for installing dependencies):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

## Installation Steps

### 1. Install Tesseract OCR

```bash
brew install tesseract
```

Verify installation:
```bash
tesseract --version
```

**Note**: On Apple Silicon Macs, Tesseract is usually installed at `/opt/homebrew/bin/tesseract`
On Intel Macs, it's usually at `/usr/local/bin/tesseract`

### 2. Install Poppler

```bash
brew install poppler
```

Verify installation:
```bash
pdftoppm -h
```

**Note**: Poppler binaries are usually in `/opt/homebrew/bin` (Apple Silicon) or `/usr/local/bin` (Intel)

### 3. Set Up Python Environment

Run the setup script:
```bash
cd backend
./setup_python.sh
```

Or manually:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**If Tesseract/Poppler are not in your PATH**, add these lines:

For Apple Silicon Macs:
```env
TESSERACT_CMD=/opt/homebrew/bin/tesseract
POPPLER_PATH=/opt/homebrew
```

For Intel Macs:
```env
TESSERACT_CMD=/usr/local/bin/tesseract
POPPLER_PATH=/usr/local
```

**Note**: For `POPPLER_PATH`, use the directory that contains the `bin` folder (not the `bin` folder itself).

### 5. Test Installation

Test Tesseract:
```bash
cd backend
source venv/bin/activate
python test_tesseract.py
```

Test Poppler:
```bash
python test_poppler.py
```

### 6. Run the Server

```bash
cd backend
source venv/bin/activate
python run.py
```

The server should start on `http://localhost:8000`

## Troubleshooting

### Issue: "Tesseract not found"

1. Find where Tesseract is installed:
   ```bash
   which tesseract
   ```

2. Add the path to `.env`:
   ```env
   TESSERACT_CMD=/path/to/tesseract
   ```

### Issue: "Poppler not found"

1. Find where Poppler is installed:
   ```bash
   which pdftoppm
   ```

2. Get the parent directory (the one containing `bin`):
   ```bash
   dirname $(dirname $(which pdftoppm))
   ```

3. Add to `.env`:
   ```env
   POPPLER_PATH=/path/to/parent/directory
   ```

### Issue: "Permission denied" when running setup script

Make the script executable:
```bash
chmod +x setup_python.sh
```

### Issue: Virtual environment activation doesn't work

Make sure you're using `source venv/bin/activate` (not `venv/bin/activate`)

## Differences from Windows

- Executables don't have `.exe` extension
- Use forward slashes `/` in paths (though Python handles both)
- Virtual environment activation uses `source venv/bin/activate` instead of `venv\Scripts\activate.bat`
- Homebrew is the recommended package manager instead of downloading installers

