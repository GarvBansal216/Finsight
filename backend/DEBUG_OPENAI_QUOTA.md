# Debug: OpenAI Quota Issue with $5 Limit

## Problem
You have a $5 spending limit set for December, but you're still getting "quota exceeded" errors.

## Possible Causes

### 1. **Rate Limiting (Not Quota)**
- **429 errors** can be rate limits (too many requests) OR quota issues
- Rate limits: Too many API calls in a short time
- Quota limits: Total spending limit reached

### 2. **Spending Limit vs Available Credits**
- A **spending limit** is different from **available credits**
- You might have a limit set, but no actual credits/balance
- Check: https://platform.openai.com/account/billing

### 3. **Account Restrictions**
- New accounts sometimes have restrictions
- Free tier accounts have very limited quotas
- Check your account type at: https://platform.openai.com/account

### 4. **Billing Delay**
- Sometimes there's a delay in the billing system
- Wait 5-10 minutes after adding credits
- Refresh your usage page

## How to Check

### Step 1: Check Actual Usage
1. Go to: https://platform.openai.com/usage
2. See how much you've actually spent
3. Check if you've exceeded the $5 limit

### Step 2: Check Billing Settings
1. Go to: https://platform.openai.com/account/billing
2. Verify:
   - Payment method is active
   - Spending limit is set correctly
   - You have available balance/credits

### Step 3: Check Account Status
1. Go to: https://platform.openai.com/account
2. Check for any warnings or restrictions
3. Verify your account type (free tier vs paid)

## Solutions

### Solution 1: Add Actual Credits (Not Just Set Limit)
1. Go to: https://platform.openai.com/account/billing
2. **Add credits** (not just set a limit)
3. Make sure you have a positive balance

### Solution 2: Check Rate Limits
- If you're making many requests quickly, you might hit rate limits
- Wait 1-2 minutes between requests
- The code now has automatic retry with backoff

### Solution 3: Use GPT-3.5 Instead (Cheaper)
If you want to reduce costs, edit `app.py`:
- Change `model="gpt-4o"` to `model="gpt-3.5-turbo"`
- GPT-3.5 is much cheaper (~10x cheaper)

### Solution 4: Check API Key Permissions
1. Go to: https://platform.openai.com/api-keys
2. Verify your API key is active
3. Check if there are any restrictions on the key

## Quick Test

Test your API key directly:

```python
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Say hello"}],
        max_tokens=5
    )
    print("✅ API key works!")
    print(response.choices[0].message.content)
except Exception as e:
    print(f"❌ Error: {e}")
```

## Common Issues

### Issue: "I have a limit but no credits"
- **Solution**: A spending limit doesn't give you credits. You need to add actual credits/balance.

### Issue: "Free tier restrictions"
- **Solution**: Free tier has very limited quotas. Consider upgrading to a paid plan.

### Issue: "Rate limits"
- **Solution**: Wait between requests. The code now retries automatically.

## After Fixing

1. **Restart your server** (if you changed the API key)
2. **Try uploading a PDF again**
3. **Check the error message** - it should now be more specific

---

**Most likely issue**: You have a spending limit set, but no actual credits/balance in your account. Add credits, not just set a limit!


