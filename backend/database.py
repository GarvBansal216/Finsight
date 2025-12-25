"""
Supabase Database Connection and Operations Module
Handles all database interactions for FinSight application
"""

import os
import psycopg2
from psycopg2.extras import RealDictCursor, Json
from psycopg2.pool import SimpleConnectionPool
from typing import Optional, Dict, List, Any
import uuid
from datetime import datetime
import json

# Database connection pool
_db_pool: Optional[SimpleConnectionPool] = None

def get_db_pool():
    """Initialize and return database connection pool"""
    global _db_pool
    
    if _db_pool is None:
        # Get connection string from environment
        db_url = os.getenv("SUPABASE_DB_URL") or os.getenv("DATABASE_URL")
        
        if not db_url:
            # Try constructing from individual components
            db_password = os.getenv("SUPABASE_DB_PASSWORD")
            project_ref = os.getenv("SUPABASE_PROJECT_REF", "igqocjymgmhygdyvviii")
            
            if db_password:
                # URL encode password to handle special characters
                from urllib.parse import quote_plus
                encoded_password = quote_plus(db_password)
                db_url = f"postgresql://postgres:{encoded_password}@db.{project_ref}.supabase.co:5432/postgres"
                print(f"ℹ️  Constructed database URL from SUPABASE_DB_PASSWORD and SUPABASE_PROJECT_REF")
            else:
                error_msg = "SUPABASE_DB_URL or SUPABASE_DB_PASSWORD must be set in .env file"
                print(f"❌ {error_msg}")
                raise ValueError(error_msg)
        else:
            # Remove pgbouncer query parameter if present (psycopg2 doesn't support it)
            if '?pgbouncer=' in db_url or '&pgbouncer=' in db_url:
                from urllib.parse import urlparse, urlunparse, parse_qs, urlencode
                parsed = urlparse(db_url)
                query_params = parse_qs(parsed.query)
                # Remove pgbouncer parameter
                query_params.pop('pgbouncer', None)
                # Also convert pooler port (6543) to direct port (5432) if present
                if parsed.port == 6543:
                    netloc = parsed.netloc.replace(':6543', ':5432')
                    parsed = parsed._replace(netloc=netloc)
                # Reconstruct URL without pgbouncer parameter
                new_query = urlencode(query_params, doseq=True) if query_params else ''
                db_url = urlunparse(parsed._replace(query=new_query))
                print(f"ℹ️  Removed pgbouncer parameter and converted pooler port to direct connection")
            
            # Mask password in URL for logging
            masked_url = db_url.split('@')[1] if '@' in db_url else '****'
            print(f"ℹ️  Using database URL: ...@{masked_url}")
        
        try:
            # Create connection pool (min 1, max 10 connections)
            _db_pool = SimpleConnectionPool(1, 10, db_url)
            print(f"✓ Database connection pool created successfully")
            
            # Test the connection
            test_conn = _db_pool.getconn()
            try:
                with test_conn.cursor() as cur:
                    cur.execute("SELECT 1")
                    cur.fetchone()
                print(f"✓ Database connection test successful")
            finally:
                _db_pool.putconn(test_conn)
                
        except Exception as e:
            print(f"❌ Failed to create database connection pool: {str(e)}")
            import traceback
            traceback.print_exc()
            _db_pool = None  # Ensure it's None on failure
            raise
    
    return _db_pool

def get_db_connection():
    """Get a database connection from the pool"""
    pool = get_db_pool()
    return pool.getconn()

def return_db_connection(conn):
    """Return a database connection to the pool"""
    pool = get_db_pool()
    pool.putconn(conn)

def execute_query(query: str, params: tuple = None, fetch: bool = True) -> List[Dict[str, Any]]:
    """Execute a database query and return results"""
    conn = None
    try:
        conn = get_db_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            if fetch:
                results = cur.fetchall()
                return [dict(row) for row in results]
            else:
                conn.commit()
                return []
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"Database query error: {str(e)}")
        raise
    finally:
        if conn:
            return_db_connection(conn)

# ==================== USER OPERATIONS ====================

def create_or_get_user(email: str, display_name: Optional[str] = None) -> Dict[str, Any]:
    """Create a new user or return existing user"""
    # Check if user exists
    existing = execute_query(
        "SELECT * FROM users WHERE email = %s",
        (email,)
    )
    
    if existing:
        return existing[0]
    
    # Create new user
    user_id = uuid.uuid4()
    execute_query(
        """INSERT INTO users (user_id, email, display_name)
           VALUES (%s, %s, %s)""",
        (str(user_id), email, display_name),
        fetch=False
    )
    
    return execute_query(
        "SELECT * FROM users WHERE user_id = %s",
        (str(user_id),)
    )[0]

def get_user(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user by ID"""
    results = execute_query(
        "SELECT * FROM users WHERE user_id = %s",
        (user_id,)
    )
    return results[0] if results else None

# ==================== DOCUMENT OPERATIONS ====================

def create_document(
    user_id: str,
    original_filename: str,
    file_type: str,
    file_size: int,
    storage_path: str,
    document_type: Optional[str] = None
) -> Dict[str, Any]:
    """Create a new document record"""
    document_id = uuid.uuid4()
    execute_query(
        """INSERT INTO documents 
           (document_id, user_id, original_filename, file_type, file_size, storage_path, document_type, processing_status)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""",
        (str(document_id), user_id, original_filename, file_type, file_size, storage_path, document_type, 'pending'),
        fetch=False
    )
    
    return execute_query(
        "SELECT * FROM documents WHERE document_id = %s",
        (str(document_id),)
    )[0]

def update_document_status(
    document_id: str,
    status: str,
    error_message: Optional[str] = None
) -> None:
    """Update document processing status"""
    now = datetime.utcnow()
    
    if status == 'processing':
        execute_query(
            """UPDATE documents 
               SET processing_status = %s, processing_started_at = %s
               WHERE document_id = %s""",
            (status, now, document_id),
            fetch=False
        )
    elif status in ['completed', 'failed']:
        execute_query(
            """UPDATE documents 
               SET processing_status = %s, processing_completed_at = %s, error_message = %s
               WHERE document_id = %s""",
            (status, now, error_message, document_id),
            fetch=False
        )
    else:
        execute_query(
            """UPDATE documents 
               SET processing_status = %s
               WHERE document_id = %s""",
            (status, document_id),
            fetch=False
        )

def get_document(document_id: str, user_id: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Get document by ID (optionally filtered by user_id)"""
    if user_id:
        results = execute_query(
            "SELECT * FROM documents WHERE document_id = %s AND user_id = %s",
            (document_id, user_id)
        )
    else:
        results = execute_query(
            "SELECT * FROM documents WHERE document_id = %s",
            (document_id,)
        )
    return results[0] if results else None

def get_user_documents(user_id: str, limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
    """Get all documents for a user"""
    return execute_query(
        """SELECT * FROM documents 
           WHERE user_id = %s 
           ORDER BY created_at DESC 
           LIMIT %s OFFSET %s""",
        (user_id, limit, offset)
    )

# ==================== PROCESSING RESULTS OPERATIONS ====================

def save_processing_result(
    document_id: str,
    extracted_data: Dict[str, Any],
    insights: Optional[Dict[str, Any]] = None,
    summary_stats: Optional[Dict[str, Any]] = None,
    anomalies: Optional[Dict[str, Any]] = None,
    output_files: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Save processing results for a document"""
    result_id = uuid.uuid4()
    
    execute_query(
        """INSERT INTO processing_results 
           (result_id, document_id, extracted_data, insights, summary_stats, anomalies, output_files)
           VALUES (%s, %s, %s, %s, %s, %s, %s)""",
        (
            str(result_id),
            document_id,
            Json(extracted_data),
            Json(insights) if insights else None,
            Json(summary_stats) if summary_stats else None,
            Json(anomalies) if anomalies else None,
            Json(output_files) if output_files else None
        ),
        fetch=False
    )
    
    return execute_query(
        "SELECT * FROM processing_results WHERE result_id = %s",
        (str(result_id),)
    )[0]

def get_processing_result(document_id: str) -> Optional[Dict[str, Any]]:
    """Get processing result for a document"""
    results = execute_query(
        """SELECT * FROM processing_results 
           WHERE document_id = %s 
           ORDER BY created_at DESC 
           LIMIT 1""",
        (document_id,)
    )
    return results[0] if results else None

# ==================== PROCESSING HISTORY OPERATIONS ====================

def add_processing_history(
    user_id: str,
    document_id: Optional[str],
    action_type: str,
    metadata: Optional[Dict[str, Any]] = None
) -> None:
    """Add an entry to processing history"""
    execute_query(
        """INSERT INTO processing_history (user_id, document_id, action_type, metadata)
           VALUES (%s, %s, %s, %s)""",
        (user_id, document_id, action_type, Json(metadata) if metadata else None),
        fetch=False
    )

def get_user_history(user_id: str, limit: int = 50) -> List[Dict[str, Any]]:
    """Get processing history for a user"""
    return execute_query(
        """SELECT * FROM processing_history 
           WHERE user_id = %s 
           ORDER BY action_timestamp DESC 
           LIMIT %s""",
        (user_id, limit)
    )

# ==================== ANALYTICS OPERATIONS ====================

def save_analytics(
    user_id: Optional[str],
    document_id: Optional[str],
    processing_time_ms: Optional[int],
    success_rate: Optional[float],
    document_type: Optional[str]
) -> None:
    """Save analytics data"""
    execute_query(
        """INSERT INTO analytics (user_id, document_id, processing_time_ms, success_rate, document_type)
           VALUES (%s, %s, %s, %s, %s)""",
        (user_id, document_id, processing_time_ms, success_rate, document_type),
        fetch=False
    )

# ==================== USER SETTINGS OPERATIONS ====================

def get_user_settings(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user settings"""
    results = execute_query(
        "SELECT * FROM user_settings WHERE user_id = %s",
        (user_id,)
    )
    return results[0] if results else None

def create_or_update_user_settings(
    user_id: str,
    email_notifications: Optional[bool] = None,
    push_notifications: Optional[bool] = None,
    dark_mode: Optional[bool] = None,
    preferred_export_format: Optional[str] = None
) -> Dict[str, Any]:
    """Create or update user settings"""
    existing = get_user_settings(user_id)
    
    if existing:
        # Update existing
        updates = []
        params = []
        
        if email_notifications is not None:
            updates.append("email_notifications = %s")
            params.append(email_notifications)
        if push_notifications is not None:
            updates.append("push_notifications = %s")
            params.append(push_notifications)
        if dark_mode is not None:
            updates.append("dark_mode = %s")
            params.append(dark_mode)
        if preferred_export_format is not None:
            updates.append("preferred_export_format = %s")
            params.append(preferred_export_format)
        
        if updates:
            params.append(user_id)
            execute_query(
                f"UPDATE user_settings SET {', '.join(updates)} WHERE user_id = %s",
                tuple(params),
                fetch=False
            )
    else:
        # Create new
        setting_id = uuid.uuid4()
        execute_query(
            """INSERT INTO user_settings 
               (setting_id, user_id, email_notifications, push_notifications, dark_mode, preferred_export_format)
               VALUES (%s, %s, %s, %s, %s, %s)""",
            (str(setting_id), user_id, email_notifications, push_notifications, dark_mode, preferred_export_format),
            fetch=False
        )
    
    return get_user_settings(user_id)

# ==================== SUPPORT TICKETS OPERATIONS ====================

def create_support_ticket(
    user_id: str,
    subject: str,
    message: str,
    document_id: Optional[str] = None
) -> Dict[str, Any]:
    """Create a support ticket"""
    ticket_id = uuid.uuid4()
    execute_query(
        """INSERT INTO support_tickets (ticket_id, user_id, subject, message, document_id, status)
           VALUES (%s, %s, %s, %s, %s, %s)""",
        (str(ticket_id), user_id, subject, message, document_id, 'open'),
        fetch=False
    )
    
    return execute_query(
        "SELECT * FROM support_tickets WHERE ticket_id = %s",
        (str(ticket_id),)
    )[0]

def get_user_tickets(user_id: str, status: Optional[str] = None) -> List[Dict[str, Any]]:
    """Get support tickets for a user"""
    if status:
        return execute_query(
            """SELECT * FROM support_tickets 
               WHERE user_id = %s AND status = %s 
               ORDER BY created_at DESC""",
            (user_id, status)
        )
    else:
        return execute_query(
            """SELECT * FROM support_tickets 
               WHERE user_id = %s 
               ORDER BY created_at DESC""",
            (user_id,)
        )

