-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create schema_metadata table for storing embeddings
CREATE TABLE IF NOT EXISTS schema_metadata (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    table_name VARCHAR(255) NOT NULL,
    column_name VARCHAR(255),
    description TEXT,
    semantic_type VARCHAR(100),
    embedding vector(1536),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX ON schema_metadata USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create semantic_metrics table
CREATE TABLE IF NOT EXISTS semantic_metrics (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    definition TEXT NOT NULL,
    filters JSONB,
    time_window VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    tenant_id VARCHAR(255) REFERENCES tenants(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_users ON users
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::VARCHAR);

-- Create data_connections table
CREATE TABLE IF NOT EXISTS data_connections (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL REFERENCES tenants(id),
    source_type VARCHAR(100) NOT NULL, -- 'stripe', 'shopify', 'google_analytics', etc.
    credentials TEXT NOT NULL, -- Stored as JSON string
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create integration data tables (dynamic tables will be created per source)
CREATE TABLE IF NOT EXISTS stripe_data (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    source VARCHAR(50),
    source_id VARCHAR(255),
    date TIMESTAMP,
    type VARCHAR(50),
    description TEXT,
    amount DECIMAL(10,2),
    currency VARCHAR(10),
    status VARCHAR(50),
    raw_data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tenant_id, source_id)
);

CREATE TABLE IF NOT EXISTS shopify_data (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    source VARCHAR(50),
    source_id VARCHAR(255),
    date TIMESTAMP,
    type VARCHAR(50),
    description TEXT,
    amount DECIMAL(10,2),
    currency VARCHAR(10),
    status VARCHAR(50),
    raw_data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tenant_id, source_id)
);

CREATE TABLE IF NOT EXISTS google_analytics_data (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    source VARCHAR(50),
    source_id VARCHAR(255),
    date TIMESTAMP,
    type VARCHAR(50),
    description TEXT,
    amount DECIMAL(10,2),
    currency VARCHAR(10),
    status VARCHAR(50),
    raw_data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tenant_id, source_id)
);

-- Row Level Security policies
ALTER TABLE schema_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE semantic_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopify_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_analytics_data ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their tenant's data
CREATE POLICY tenant_isolation_schema_metadata ON schema_metadata
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::VARCHAR);

CREATE POLICY tenant_isolation_semantic_metrics ON semantic_metrics
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::VARCHAR);

CREATE POLICY tenant_isolation_data_connections ON data_connections
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::VARCHAR);

CREATE POLICY tenant_isolation_stripe_data ON stripe_data
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::VARCHAR);

CREATE POLICY tenant_isolation_shopify_data ON shopify_data
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::VARCHAR);

CREATE POLICY tenant_isolation_google_analytics_data ON google_analytics_data
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::VARCHAR);

-- Sample data for testing
INSERT INTO tenants (id, name) VALUES ('demo-tenant', 'Demo Company');

INSERT INTO semantic_metrics (tenant_id, name, description, definition) VALUES
('demo-tenant', 'revenue', 'Total revenue from sales', 'SUM(amount) WHERE type = ''sale'''),
('demo-tenant', 'active_customers', 'Count of active customers', 'COUNT(DISTINCT customer_id) WHERE last_order_date >= NOW() - INTERVAL ''90 days''');
