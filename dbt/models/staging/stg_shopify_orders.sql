-- Staging layer for Shopify orders
-- Standardizes raw Shopify order data

WITH source AS (
    SELECT * FROM {{ source('shopify', 'orders') }}
),

renamed AS (
    SELECT
        id AS order_id,
        customer_id,
        created_at AS order_date,
        total_price AS amount,
        financial_status,
        fulfillment_status,
        updated_at
    FROM source
)

SELECT * FROM renamed
