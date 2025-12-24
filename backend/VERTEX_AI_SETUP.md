# Vertex AI Setup Guide - Step by Step

This guide will walk you through setting up Google Cloud Vertex AI for the FinSight project.

---

## Prerequisites

- A Google account
- Basic familiarity with terminal/command line
- Python 3.8+ installed
- pip installed

---

## Step 1: Create a Google Cloud Project

### 1.1 Go to Google Cloud Console
1. Open your browser and go to: https://console.cloud.google.com/
2. Sign in with your Google account

### 1.2 Create a New Project
1. Click on the project dropdown at the top (it may show "Select a project" or your current project name)
2. Click **"New Project"**
3. Enter a project name (e.g., "finsight-ai" or "finsight-production")
4. Note the **Project ID** that Google Cloud generates (you'll need this later)
5. Click **"Create"**
6. Wait for the project to be created (usually takes 10-30 seconds)

### 1.3 Select Your Project
1. Once created, select your new project from the project dropdown at the top

---

## Step 2: Enable Billing (Required for Vertex AI)

⚠️ **Important**: Vertex AI requires a billing account, even if you stay within free tier limits.

### 2.1 Set Up Billing
1. In the Google Cloud Console, go to **Navigation Menu** (☰) → **Billing**
2. If you don't have a billing account:
   - Click **"Link a billing account"**
   - Click **"Create billing account"**
   - Fill in the required information (account name, country, currency)
   - Enter your payment information
   - Click **"Submit and enable billing"**
3. If you already have a billing account:
   - Click **"Link a billing account"**
   - Select your existing billing account
   - Click **"Set account"**

### 2.2 Link Billing to Your Project
1. Make sure your project is linked to the billing account
2. You should see the billing account name next to your project

---

## Step 3: Enable Vertex AI API

### 3.1 Enable the API via Console
1. Go to **Navigation Menu** (☰) → **APIs & Services** → **Library**
2. Search for **"Vertex AI API"**
3. Click on **"Vertex AI API"**
4. Click **"Enable"**
5. Wait for the API to be enabled (usually takes 1-2 minutes)

### 3.2 Alternative: Enable via Command Line
If you have `gcloud` CLI installed:
```bash
gcloud services enable aiplatform.googleapis.com --project=YOUR_PROJECT_ID
```

---

## Step 4: Install Google Cloud SDK (gcloud CLI)

### 4.1 For macOS (using Homebrew - Recommended)
```bash
# Install gcloud CLI
brew install google-cloud-sdk

# Initialize gcloud
gcloud init
```

### 4.2 For macOS (Manual Installation)
1. Download the SDK from: https://cloud.google.com/sdk/docs/install
2. Extract the archive
3. Run the install script:
```bash
./google-cloud-sdk/install.sh
```

### 4.3 For Linux
```bash
# Add Google Cloud SDK repository
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Install
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

### 4.4 Initialize gcloud
After installation:
```bash
gcloud init
```
Follow the prompts to:
- Log in to your Google account
- Select your project
- Set default region (choose `us-central1` or your preferred region)

---

## Step 5: Set Up Authentication

You have two options for authentication. Choose the one that fits your setup:

### Option A: Application Default Credentials (ADC) - Recommended for Local Development

This is the easiest method for local development:

```bash
# Authenticate using your Google account
gcloud auth application-default login

# This will:
# 1. Open a browser window
# 2. Ask you to sign in to Google
# 3. Grant permissions to Google Cloud SDK
# 4. Store credentials locally
```

**Pros**: Easy to set up, good for development  
**Cons**: Uses your personal Google account (not recommended for production)

---

### Option B: Service Account (Recommended for Production)

This is better for production and CI/CD:

#### 5.1 Create a Service Account
1. Go to **Navigation Menu** (☰) → **IAM & Admin** → **Service Accounts**
2. Click **"Create Service Account"**
3. Enter a name (e.g., "finsight-vertex-ai")
4. Enter a description (optional)
5. Click **"Create and Continue"**

#### 5.2 Grant Permissions
1. In the "Grant this service account access to project" section:
   - Select role: **"Vertex AI User"** (or search for it)
   - Click **"Add Another Role"** and add: **"Service Account User"**
2. Click **"Continue"**
3. Click **"Done"**

#### 5.3 Create and Download Key
1. Find your service account in the list
2. Click on the service account email
3. Go to the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **JSON** format
6. Click **"Create"**
7. The JSON file will download automatically - **save it securely**!

#### 5.4 Set Environment Variable
```bash
# Set the path to your downloaded service account key
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"

# Example:
export GOOGLE_APPLICATION_CREDENTIALS="/Users/utsavgautam/Downloads/finsight-service-account.json"

# To make it permanent, add to ~/.zshrc (macOS) or ~/.bashrc (Linux):
echo 'export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"' >> ~/.zshrc
source ~/.zshrc
```

**Pros**: More secure, better for production  
**Cons**: Requires managing key files

---

## Step 6: Update Environment Variables

### 6.1 Update .env File
Edit `backend/.env` file and update these values:

```env
# Vertex AI Configuration
VERTEXAI_PROJECT_ID=your-actual-project-id-here
VERTEXAI_LOCATION=us-central1
VERTEXAI_MODEL=gemini-1.5-pro

# Note: Replace 'your-actual-project-id-here' with your actual GCP Project ID
# You can find it in the Google Cloud Console at the top of the page
```

**Where to find your Project ID**:
- In Google Cloud Console, look at the top of the page
- It's usually in the format: `my-project-123456` or `finsight-ai-12345`

**Model Options**:
- `gemini-1.5-pro` - Best quality, slower, more expensive (recommended)
- `gemini-1.5-flash` - Faster, cheaper, good quality (for testing)
- `gemini-pro` - Older version (not recommended)

---

## Step 7: Install Python Dependencies

### 7.1 Navigate to Backend Directory
```bash
cd backend
```

### 7.2 Activate Virtual Environment
```bash
# If you haven't created a venv yet:
python3 -m venv venv

# Activate it:
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate  # Windows
```

### 7.3 Install Requirements
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

This will install:
- `google-cloud-aiplatform` (Vertex AI SDK)
- All other project dependencies

---

## Step 8: Verify Installation

### 8.1 Test Authentication
```bash
# Test if authentication is working
gcloud auth list

# Should show your account or service account
```

### 8.2 Test Vertex AI Access (Python)
Create a test file `test_vertexai.py`:

```python
import os
from dotenv import load_dotenv
import vertexai
from vertexai.generative_models import GenerativeModel

load_dotenv()

project_id = os.getenv("VERTEXAI_PROJECT_ID")
location = os.getenv("VERTEXAI_LOCATION", "us-central1")
model_name = os.getenv("VERTEXAI_MODEL", "gemini-1.5-pro")

print(f"Initializing Vertex AI with:")
print(f"  Project ID: {project_id}")
print(f"  Location: {location}")
print(f"  Model: {model_name}")

try:
    vertexai.init(project=project_id, location=location)
    model = GenerativeModel(model_name)
    
    response = model.generate_content("Say hello in one sentence")
    print(f"\n✅ Success! Response: {response.text}")
    
except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    print("\nCommon issues:")
    print("1. Check VERTEXAI_PROJECT_ID in .env file")
    print("2. Verify authentication: gcloud auth application-default login")
    print("3. Check if Vertex AI API is enabled in GCP Console")
    print("4. Verify billing is enabled")
```

Run the test:
```bash
python test_vertexai.py
```

If successful, you should see a response from the AI model.

---

## Step 9: Start the Application

### 9.1 Make Sure Environment is Set Up
```bash
# In backend directory, with venv activated
cd backend
source venv/bin/activate

# Verify .env file has correct values
cat .env | grep VERTEXAI
```

### 9.2 Start the Server
```bash
python run.py
```

You should see:
```
✓ Vertex AI initialized: project=your-project-id, location=us-central1, model=gemini-1.5-pro
Starting FinSight Backend Server
Host: 0.0.0.0
Port: 8000
```

---

## Step 10: Test the Application

### 10.1 Check Health Endpoint
```bash
curl http://localhost:8000/health
```

Should return: `{"status":"healthy"}`

### 10.2 Test Document Processing
1. Open the frontend (if running): http://localhost:5173
2. Upload a test document
3. Check backend logs for Vertex AI usage
4. Verify processing completes successfully

---

## Troubleshooting

### Issue: "Permission denied" or "Authentication failed"

**Solution**:
```bash
# Re-authenticate
gcloud auth application-default login

# Or if using service account, check the path:
echo $GOOGLE_APPLICATION_CREDENTIALS
```

---

### Issue: "API not enabled" or "API not found"

**Solution**:
1. Go to Google Cloud Console → APIs & Services → Library
2. Search for "Vertex AI API"
3. Click "Enable"
4. Wait 1-2 minutes for activation

Or via command line:
```bash
gcloud services enable aiplatform.googleapis.com --project=YOUR_PROJECT_ID
```

---

### Issue: "Billing not enabled"

**Solution**:
1. Go to Google Cloud Console → Billing
2. Link a billing account to your project
3. Even if you stay within free tier, billing must be enabled

---

### Issue: "Project not found" or "Invalid project ID"

**Solution**:
1. Check your Project ID in Google Cloud Console
2. Update `.env` file with correct `VERTEXAI_PROJECT_ID`
3. Make sure there are no extra spaces or quotes

---

### Issue: "Model not found"

**Solution**:
1. Check available models in your region
2. Try changing model in `.env`:
   ```env
   VERTEXAI_MODEL=gemini-1.5-flash
   ```
3. Make sure the model is available in your selected location

---

### Issue: Import errors (google.cloud.aiplatform not found)

**Solution**:
```bash
# Reinstall the package
pip uninstall google-cloud-aiplatform
pip install google-cloud-aiplatform>=1.38.0

# Or reinstall all requirements
pip install -r requirements.txt --upgrade
```

---

## Cost Considerations

### Free Tier
- Google Cloud offers $300 free credits for new accounts
- Vertex AI pricing is pay-per-use
- Check current pricing: https://cloud.google.com/vertex-ai/pricing

### Cost Optimization Tips
1. Use `gemini-1.5-flash` for development/testing (cheaper)
2. Use `gemini-1.5-pro` for production (better quality)
3. Monitor usage in Google Cloud Console → Billing
4. Set up billing alerts to avoid surprises

---

## Security Best Practices

1. **Never commit credentials**:
   - Add `*.json` (service account keys) to `.gitignore`
   - Never commit `.env` files with real credentials

2. **Use service accounts for production**:
   - Don't use personal Google accounts in production
   - Rotate service account keys periodically

3. **Limit permissions**:
   - Only grant necessary roles to service accounts
   - Use principle of least privilege

4. **Monitor usage**:
   - Set up billing alerts
   - Review access logs regularly

---

## Next Steps

1. ✅ Verify everything works with a test document
2. ✅ Monitor costs in GCP Console
3. ✅ Set up billing alerts
4. ✅ Consider using Vertex AI Document AI for better OCR (optional)
5. ✅ Set up monitoring and logging (optional)

---

## Quick Reference Commands

```bash
# Check authentication
gcloud auth list

# Check current project
gcloud config get-value project

# Set project
gcloud config set project YOUR_PROJECT_ID

# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Authenticate for application default credentials
gcloud auth application-default login

# Check if API is enabled
gcloud services list --enabled | grep aiplatform
```

---

## Support Resources

- **Vertex AI Documentation**: https://cloud.google.com/vertex-ai/docs
- **Python SDK Reference**: https://cloud.google.com/python/docs/reference/aiplatform/latest
- **Pricing Information**: https://cloud.google.com/vertex-ai/pricing
- **Google Cloud Support**: https://cloud.google.com/support

---

**You're all set!** 🎉

If you encounter any issues, refer to the Troubleshooting section or check the error messages in your terminal/backend logs.

