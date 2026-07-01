# Core Insight Analytics - Setup Guide

This guide will walk you through setting up the entire Core Insight Analytics platform from scratch.

## Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- A Supabase account (free tier works)
- An OpenAI API key

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (2-3 minutes)
3. Go to SQL Editor and run the setup script from `infrastructure/supabase/setup.sql`
4. Get your credentials:
   - Project URL (Settings → API)
   - Anon key (Settings → API)
   - Service role key (Settings → API)
   - Database connection string (Settings → Database)

## Step 2: Configure Environment Variables

### Frontend
```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```bash
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
```

### dbt
Edit `dbt/profiles.yml`:
```yaml
core_insight:
  outputs:
    dev:
      type: postgres
      host: db.your-project.supabase.co
      user: postgres
      password: your-password
      port: 5432
      dbname: postgres
      schema: public
      threads: 4
  target: dev
```

## Step 3: Install Dependencies

### Frontend
```bash
cd frontend
npm install
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### dbt
```bash
cd dbt
pip install -r requirements.txt
```

## Step 4: Run Development Servers

### Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000
The backend API will be available at http://localhost:8000

## Step 5: Initial Data Setup

### 1. Run dbt transformations
```bash
cd dbt
dbt run
```

### 2. Profile your data
You'll need to create a script to profile your tables and generate embeddings. Here's an example:

```python
# In backend/app/scripts/profile_data.py
import asyncio
from app.services.profiling.profiling_service import ProfilingService

async def main():
    profiler = ProfilingService()
    await profiler.profile_database(
        table_names=['dim_customer', 'fct_transaction'],
        tenant_id='demo-tenant'
    )

if __name__ == "__main__":
    asyncio.run(main())
```

Run it:
```bash
cd backend
python -m app.scripts.profile_data
```

### 3. Add semantic metrics
You can add metrics via the API or directly in Supabase SQL Editor:

```sql
INSERT INTO semantic_metrics (tenant_id, name, description, definition) VALUES
('demo-tenant', 'revenue', 'Total revenue from paid orders', 'SUM(amount) WHERE status = ''paid'''),
('demo-tenant', 'order_count', 'Total number of orders', 'COUNT(*)');
```

## Step 6: Connect a Data Source (Optional)

To connect Shopify:

1. Create a Shopify app and get API credentials
2. Add a data connection record:

```sql
INSERT INTO data_connections (tenant_id, source_type, config, status)
VALUES (
    'demo-tenant',
    'shopify',
    '{"shop_url": "your-shop.myshopify.com", "access_token": "your-token"}',
    'active'
);
```

3. Run the sync script (you'll need to create this based on the connector)

## Testing the Application

1. Open http://localhost:3000
2. Type a question like: "What is the total revenue?"
3. Click "Ask"
4. View the generated SQL, results, and visualization

## Troubleshooting

### pgvector not found
Make sure you ran the setup.sql script in Supabase SQL Editor to enable the extension.

### Connection errors
Verify your DATABASE_URL in backend/.env matches your Supabase connection string.

### LLM errors
Check that your OPENAI_API_KEY is valid and has credits.

### TypeScript errors in frontend
Run `npm install` to ensure all dependencies are installed.

## Next Steps

1. Add more data sources (Square, Salesforce, etc.)
2. Create custom metrics in the semantic layer
3. Set up automated data sync schedules
4. Add authentication for multi-tenant access
5. Deploy to production (Vercel for frontend, AWS/Render for backend)
