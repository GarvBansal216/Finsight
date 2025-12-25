# Supabase Database Integration

This document explains how Supabase database integration works in FinSight.

## Setup

1. **Run the schema SQL in Supabase:**
   - Open Supabase Dashboard → SQL Editor
   - Copy and paste the contents of `database/supabase_schema.sql`
   - Click "Run" to create all tables

2. **Configure environment variables in `.env`:**
   ```env
   # Option 1: Full connection string (recommended)
   SUPABASE_DB_URL=postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres
   
   # Option 2: Individual components
   SUPABASE_DB_PASSWORD=your_database_password
   SUPABASE_PROJECT_REF=your_project_reference
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## How It Works

### Automatic Database Saving

When you process a document via `/process` endpoint, the system will:

1. **Create/Get User** (if `user_email` or `user_id` is provided)
2. **Create Document Record** with metadata (filename, file size, type, etc.)
3. **Update Document Status** to `processing` → `completed` or `failed`
4. **Save Processing Results** (extracted data, insights, summary stats, anomalies)
5. **Record Analytics** (processing time, success rate, document type)
6. **Add Processing History** entries for tracking

### Optional Parameters

The `/process` endpoint accepts optional parameters:

```python
POST /process
FormData:
  - file: <file> (required)
  - document_type: <string> (optional)
  - user_id: <UUID string> (optional)
  - user_email: <email string> (optional)
```

If `user_email` is provided, the system will automatically create or retrieve the user record.

### Graceful Degradation

The database integration is **optional** - if Supabase is not configured or unavailable:

- ✅ Document processing continues to work normally
- ✅ Results are returned as before
- ⚠️ Results are not saved to the database
- ⚠️ Analytics are not recorded

You'll see warnings in the logs but processing will continue.

## Database Schema

The schema includes the following tables:

- **users**: User information (synced with Firebase Auth)
- **documents**: Document metadata and processing status
- **processing_results**: Extracted data, insights, and analysis results
- **processing_history**: Activity log for all processing actions
- **user_settings**: User preferences and settings
- **support_tickets**: Support ticket tracking
- **analytics**: Performance and usage analytics

See `database/supabase_schema.sql` for complete schema definition.

## Retrieving Data

### Get User Documents

```python
from database import get_user_documents

documents = get_user_documents(user_id="user-uuid", limit=50, offset=0)
```

### Get Processing Results

```python
from database import get_processing_result

result = get_processing_result(document_id="doc-uuid")
if result:
    extracted_data = result['extracted_data']
    insights = result['insights']
    summary_stats = result['summary_stats']
```

### Get Processing History

```python
from database import get_user_history

history = get_user_history(user_id="user-uuid", limit=50)
```

## Example Usage

### Frontend Integration

When uploading a document from the frontend:

```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('document_type', 'bank_statement');
formData.append('user_email', 'user@example.com'); // Optional

const response = await fetch('/process', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// Processing result returned immediately
// Database records are saved automatically in the background
```

## Troubleshooting

### Database Connection Errors

If you see errors like:
```
❌ Failed to create database connection pool
```

1. Check your `.env` file has `SUPABASE_DB_URL` or `SUPABASE_DB_PASSWORD`
2. Verify your Supabase project is active (not paused)
3. Check your database password is correct
4. Ensure your IP is allowed in Supabase dashboard (Settings → Database)

### Table Not Found Errors

If you see:
```
relation "documents" does not exist
```

1. Run the schema SQL in Supabase SQL Editor
2. Verify tables exist in Supabase Table Editor
3. Check you're connected to the correct database

### Module Not Found

If you see:
```
ModuleNotFoundError: No module named 'psycopg2'
```

Run:
```bash
pip install -r requirements.txt
```

## Notes

- The database integration is designed to be non-blocking - if it fails, processing continues
- All database operations are wrapped in try-except blocks to prevent crashes
- Connection pooling is used for better performance
- Results are cached in Redis (if available) in addition to database storage

