-- Revenue metric
-- Total revenue from completed transactions

WITH transactions AS (
    SELECT * FROM {{ ref('fct_transaction') }}
    WHERE status = 'paid'
)

SELECT
    SUM(amount) AS total_revenue,
    COUNT(*) AS transaction_count,
    AVG(amount) AS avg_transaction_value
FROM transactions
