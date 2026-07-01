-- Transaction fact table
-- Combines transaction data from all sources

WITH shopify_orders AS (
    SELECT * FROM {{ ref('stg_shopify_orders') }}
),

all_transactions AS (
    SELECT
        order_id AS transaction_id,
        customer_id,
        order_date AS transaction_date,
        amount,
        financial_status AS status,
        'shopify' AS source_system
    FROM shopify_orders
)

SELECT * FROM all_transactions
