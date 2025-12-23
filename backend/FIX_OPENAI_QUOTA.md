# Fix: OpenAI API Quota Exceeded

## ✅ Great Progress!

Your setup is working correctly:
- ✅ Poppler is installed and working
- ✅ Tesseract OCR is installed and working
- ✅ PDF text extraction is working
- ❌ OpenAI API quota exceeded

## Problem

You're getting: `Error code: 429 - insufficient_quota`

This means your OpenAI API account has run out of credits/quota.

## Solutions

### Solution 1: Add Credits to OpenAI Account (Recommended)

1. **Go to OpenAI Platform:**
   - Visit: https://platform.openai.com/account/billing

2. **Add Payment Method:**
   - Click "Add payment method"
   - Enter your credit card details

3. **Add Credits:**
   - Set up a usage limit or add credits
   - OpenAI charges per API call (very affordable for testing)

4. **Check Your Usage:**
   - View your usage at: https://platform.openai.com/usage
   - See how many credits you have remaining

### Solution 2: Use a Different API Key

If you have another OpenAI account with credits:

1. **Get a new API key:**
   - Go to: https://platform.openai.com/api-keys
   - Create a new API key

2. **Update your .env file:**
   ```env
   OPENAI_API_KEY=sk-your-new-key-here
   ```

3. **Restart your server**

### Solution 3: Check Free Tier Limits

If you're on the free tier:
- Free tier has limited credits
- You may need to upgrade to a paid plan
- Visit: https://platform.openai.com/pricing

## Cost Information

OpenAI API pricing (as of 2024):
- **GPT-4o**: ~$2.50-$10 per 1M input tokens, ~$10-$30 per 1M output tokens
- **For testing**: Usually costs cents per document processed
- Very affordable for development and testing

## Quick Check

To verify your API key and quota:

1. Visit: https://platform.openai.com/account/usage
2. Check if you have credits available
3. If not, add a payment method

## After Adding Credits

1. **No need to restart** - the API key is the same
2. **Try uploading a PDF again** - it should work now!

## Alternative: Use GPT-3.5 (Cheaper)

If you want to reduce costs, you can modify the code to use `gpt-3.5-turbo` instead of `gpt-4o`:

- Edit `app.py`
- Change `model="gpt-4o"` to `model="gpt-3.5-turbo"`
- GPT-3.5 is much cheaper but slightly less accurate

---

**Your setup is complete!** Once you add credits to your OpenAI account, everything will work perfectly. 🎉


