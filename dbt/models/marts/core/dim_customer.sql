-- Customer dimension table
-- Combines customer data from all sources

WITH shopify_customers AS (
    SELECT * FROM {{ ref('stg_shopify_customers') }}
),

all_customers AS (
    SELECT
        customer_id,
        email,
        first_name,
        last_name,
        customer_created_at,
        'shopify' AS source_system,
        orders_count,
        total_spent
    FROM shopify_customers
)

SELECT * FROM all_customers
