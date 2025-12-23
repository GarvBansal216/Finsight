# Backend API Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb finsight_db

# Or using psql
psql -U postgres
CREATE DATABASE finsight_db;
\q
```

#### Option B: Cloud Database (AWS RDS, Heroku Postgres, etc.)
- Create a PostgreSQL instance
- Get connection string
- Add to `.env` file

### 3. Run Database Migrations

```bash
# Connect to database and run schema
psql -U postgres -d finsight_db -f database/schema.sql

# Or using connection string
psql $DATABASE_URL -f database/schema.sql
```

### 4. Set Up AWS S3

1. **Create S3 Bucket:**
   - Go to AWS Console → S3
   - Create bucket: `finsight-documents-prod`
   - Enable versioning
   - Set up lifecycle rules (optional)

2. **Create IAM User:**
   - Go to IAM → Users → Create User
   - Attach policy: `AmazonS3FullAccess` (or custom policy)
   - Create Access Key
   - Save Access Key ID and Secret Access Key

3. **Add to `.env`:**
   ```env
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=us-east-1
   S3_BUCKET_NAME=finsight-documents-prod
   ```

### 5. Set Up Firebase Admin

1. **Get Service Account Key:**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Download JSON file

2. **Extract Credentials:**
   - Copy `project_id` → `FIREBASE_PROJECT_ID`
   - Copy `private_key` → `FIREBASE_PRIVATE_KEY`
   - Copy `client_email` → `FIREBASE_CLIENT_EMAIL`

3. **Add to `.env`:**
   ```env
   FIREBASE_PROJECT_ID=finsight-78ad1
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@finsight-78ad1.iam.gserviceaccount.com
   ```

### 6. Configure Environment Variables

Create `.env` file in `backend/` directory:

```env
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/finsight_db

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=finsight-documents-prod

# AWS Textract
AWS_TEXTRACT_REGION=us-east-1

# Firebase Admin
FIREBASE_PROJECT_ID=finsight-78ad1
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@finsight-78ad1.iam.gserviceaccount.com

# JWT (optional, for additional security)
JWT_SECRET=your_random_secret_key
```

### 7. Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

### 8. Test the API

```bash
# Health check
curl http://localhost:3000/health

# Test with authentication (get token from Firebase Auth)
curl -X POST http://localhost:3000/api/v1/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"token": "your_firebase_token"}'
```

## API Endpoints

### Documents
- `POST /api/v1/documents/upload` - Upload document
- `GET /api/v1/documents` - Get user documents (history)
- `GET /api/v1/documents/:documentId/status` - Get processing status
- `GET /api/v1/documents/:documentId/results` - Get processing results
- `GET /api/v1/documents/:documentId/download` - Get download URL
- `DELETE /api/v1/documents/:documentId` - Delete document

### Users
- `GET /api/v1/users/:userId/settings` - Get user settings
- `PUT /api/v1/users/:userId/settings` - Update user settings

### Analytics
- `GET /api/v1/analytics/:userId` - Get user analytics

### Support
- `POST /api/v1/support/contact` - Create support ticket

## Frontend Integration

Update your frontend to call these APIs:

```javascript
// Example: Upload document
const uploadDocument = async (file, documentType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('document_type', documentType);

  const response = await fetch('http://localhost:3000/api/v1/documents/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${firebaseToken}`
    },
    body: formData
  });

  return response.json();
};
```

## Next Steps

1. **Deploy to Production:**
   - Use AWS EC2, Heroku, or Railway
   - Set up environment variables
   - Configure CORS for production domain

2. **Add Real AI Processing:**
   - Integrate AWS Textract properly
   - Add ML models for categorization
   - Implement anomaly detection

3. **Add Background Jobs:**
   - Use Bull or AWS SQS for job queue
   - Process documents asynchronously

4. **Add Caching:**
   - Use Redis for caching results
   - Improve API response times

5. **Add Monitoring:**
   - Set up error tracking (Sentry)
   - Add logging (Winston)
   - Monitor API performance


