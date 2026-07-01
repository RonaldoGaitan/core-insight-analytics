# Core Insight Analytics

A multi-tenant SaaS analytics platform that allows non-technical business users to connect their operational systems and ask business questions in plain English.

## Architecture

- **Frontend**: Next.js + React + TypeScript + Plotly.js
- **Backend**: FastAPI (Python) + LangChain
- **Database**: Supabase (PostgreSQL + pgvector)
- **Transformations**: dbt
- **AI**: OpenAI (GPT-4o + embeddings)
- **Auth**: Supabase Auth with Row Level Security

## Project Structure

```
core-insight-analytics/
├── frontend/          # Next.js application
├── backend/           # FastAPI backend
├── dbt/              # Data transformations
├── infrastructure/    # AWS/Supabase configs
└── docs/             # Documentation
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Supabase account
- OpenAI API key

### Setup

1. **Clone and install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
pip install -r requirements.txt

# dbt
cd dbt
pip install -r requirements.txt
```

2. **Configure environment variables**
```bash
# Copy example env files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

3. **Set up Supabase**
- Create project at [supabase.com](https://supabase.com)
- Enable pgvector extension
- Run SQL setup scripts from `infrastructure/supabase/`

4. **Run development servers**
```bash
# Frontend (port 3000)
cd frontend
npm run dev

# Backend (port 8000)
cd backend
uvicorn main:app --reload
```

## Development

### Frontend
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend
```bash
cd backend
uvicorn main:app --reload    # Start dev server
pytest                       # Run tests
```

### dbt
```bash
cd dbt
dbt run          # Run transformations
dbt test         # Run tests
dbt docs generate # Generate documentation
```

## Key Features

- **Natural Language Queries**: Ask questions in plain English
- **Automatic SQL Generation**: AI generates optimized SQL
- **Multi-Source Data**: Connect Shopify, Square, Salesforce, etc.
- **Semantic Layer**: Pre-defined business metrics
- **Vector Search**: Efficient schema retrieval
- **Multi-Tenant**: Secure data isolation

## License

MIT
