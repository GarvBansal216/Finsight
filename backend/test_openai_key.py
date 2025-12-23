"""Test OpenAI API key and quota status"""
import os
from dotenv import load_dotenv
from openai import OpenAI, RateLimitError, APIError

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("❌ OPENAI_API_KEY not found in .env file")
    exit(1)

print(f"✅ API Key found: {api_key[:10]}...{api_key[-4:]}")
print("\nTesting API key...")

client = OpenAI(api_key=api_key)

try:
    # Try a simple, cheap request
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Using cheaper model for testing
        messages=[{"role": "user", "content": "Say 'Hello'"}],
        max_tokens=5
    )
    print("✅ API key is working!")
    print(f"Response: {response.choices[0].message.content}")
    print("\n✅ Your API key has credits/quota available!")
    
except RateLimitError as e:
    print(f"❌ Rate Limit Error: {e}")
    print("\nThis means:")
    print("- Your API key is valid")
    print("- But you're making requests too quickly")
    print("- Wait 1-2 minutes and try again")
    
except APIError as e:
    error_str = str(e)
    if "quota" in error_str.lower() or "insufficient_quota" in error_str.lower():
        print(f"❌ Quota Error: {e}")
        print("\n⚠️ IMPORTANT: Having a spending limit ≠ Having credits")
        print("\nTo fix:")
        print("1. Go to: https://platform.openai.com/account/billing")
        print("2. Add actual CREDITS/BALANCE (not just set a limit)")
        print("3. Make sure you have a positive balance")
        print("4. A $5 spending limit means you can spend UP TO $5, but you need credits to actually spend")
    elif "401" in error_str or "invalid" in error_str.lower():
        print(f"❌ Authentication Error: {e}")
        print("\nYour API key is invalid or expired")
        print("Get a new key at: https://platform.openai.com/api-keys")
    else:
        print(f"❌ API Error: {e}")
        
except Exception as e:
    print(f"❌ Unexpected Error: {e}")

print("\n" + "="*50)
print("Check your usage at: https://platform.openai.com/usage")
print("Check billing at: https://platform.openai.com/account/billing")


