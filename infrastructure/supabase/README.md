# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Sign in
3. Click "New Project"
4. Choose organization and enter project name: `core-insight-analytics`
5. Set database password (save it securely)
6. Choose a region closest to your users
7. Click "Create new project"

## 2. Get Connection Details

Once the project is ready:
1. Go to Settings → Database
2. Copy the connection string (URI format)
3. Go to Settings → API
4. Copy the Project URL
5. Copy the anon/public key
6. Copy the service_role key (for backend)

## 3. Run Setup Script

1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Copy the contents of `setup.sql`
4. Paste and run the script

This will:
- Enable pgvector extension
- Create schema_metadata table for embeddings
- Create semantic_metrics table
- Create tenants and data_connections tables
- Set up Row Level Security (RLS)

## 4. Configure Environment Variables

Add these to your `.env` files:

**Frontend (frontend/.env.local):**
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend (backend/.env):**
```bash
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
```

## 5. Verify Setup

Run this SQL query to verify pgvector is working:
```sql
SELECT * FROM pg_extension WHERE extname = 'vector';
```

You should see one row with extname = 'vector'.
