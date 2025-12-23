# FinSight Backend API

## Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- AWS S3 bucket configured
- Firebase Admin SDK credentials

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Create a `.env` file:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/finsight_db

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=finsight-documents-prod

# Firebase Admin
FIREBASE_PROJECT_ID=finsight-78ad1
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# JWT
JWT_SECRET=your_jwt_secret_key

# AI Services
AWS_TEXTRACT_REGION=us-east-1
```

### Running the Server

```bash
# Development
npm run dev

# Production
npm start
```


