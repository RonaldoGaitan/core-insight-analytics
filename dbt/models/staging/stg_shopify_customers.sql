-- Staging layer for Shopify customers
-- Standardizes raw Shopify customer data

WITH source AS (
    SELECT * FROM {{ source('shopify', 'customers') }}
),

renamed AS (
    SELECT
        id AS customer_id,
        email,
        first_name,
        last_name,
        created_at AS customer_created_at,
        updated_at,
        orders_count,
        total_spent
    FROM source
)

SELECT * FROM renamed
