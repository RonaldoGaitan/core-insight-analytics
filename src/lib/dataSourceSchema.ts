export const DATA_SOURCE_SCHEMAS = {
  shopify: {
    name: 'Shopify',
    icon: '🛒',
    metrics: [
      { id: 'revenue', label: 'Revenue', type: 'currency' },
      { id: 'order_count', label: 'Order Count', type: 'number' },
      { id: 'customer_count', label: 'Customer Count', type: 'number' },
      { id: 'refund_rate', label: 'Refund Rate', type: 'percentage' },
      { id: 'average_order_value', label: 'Average Order Value', type: 'currency' },
      { id: 'conversion_rate', label: 'Conversion Rate', type: 'percentage' }
    ],
    dimensions: [
      { id: 'week', label: 'Week' },
      { id: 'month', label: 'Month' },
      { id: 'product', label: 'Product' },
      { id: 'channel', label: 'Channel' },
      { id: 'customer_type', label: 'Customer Type' }
    ]
  },
  stripe: {
    name: 'Stripe',
    icon: '💳',
    metrics: [
      { id: 'mrr', label: 'Monthly Recurring Revenue', type: 'currency' },
      { id: 'payment_count', label: 'Payment Count', type: 'number' },
      { id: 'failed_payment_rate', label: 'Failed Payment Rate', type: 'percentage' },
      { id: 'customer_count', label: 'Customer Count', type: 'number' },
      { id: 'churn_rate', label: 'Churn Rate', type: 'percentage' }
    ],
    dimensions: [
      { id: 'month', label: 'Month' },
      { id: 'customer_type', label: 'Customer Type' },
      { id: 'plan_type', label: 'Plan Type' }
    ]
  },
  square: {
    name: 'Square',
    icon: '📱',
    metrics: [
      { id: 'sales', label: 'Sales', type: 'currency' },
      { id: 'transaction_count', label: 'Transaction Count', type: 'number' },
      { id: 'average_ticket', label: 'Average Ticket', type: 'currency' },
      { id: 'item_count', label: 'Item Count', type: 'number' }
    ],
    dimensions: [
      { id: 'location', label: 'Location' },
      { id: 'day_of_week', label: 'Day of Week' },
      { id: 'hour', label: 'Hour' }
    ]
  },
  quickbooks: {
    name: 'QuickBooks',
    icon: '📊',
    metrics: [
      { id: 'profit', label: 'Profit', type: 'currency' },
      { id: 'expenses', label: 'Expenses', type: 'currency' },
      { id: 'accounts_receivable', label: 'Accounts Receivable', type: 'currency' },
      { id: 'accounts_payable', label: 'Accounts Payable', type: 'currency' }
    ],
    dimensions: [
      { id: 'month', label: 'Month' },
      { id: 'category', label: 'Category' },
      { id: 'account_type', label: 'Account Type' }
    ]
  }
}

export const WIDGET_TYPES = [
  { id: 'kpi_card', label: 'KPI Card' },
  { id: 'line_chart', label: 'Line Chart' },
  { id: 'bar_chart', label: 'Bar Chart' },
  { id: 'table', label: 'Table' },
  { id: 'pie_chart', label: 'Pie Chart' }
]

export const SAMPLE_PROMPTS = {
  shopify: [
    "Show me revenue by week",
    "Add a chart for top-selling products",
    "Track my refund rate over time"
  ],
  stripe: [
    "Show me monthly recurring revenue",
    "Break down payments by customer type",
    "Add a chart for failed payment rate"
  ],
  square: [
    "Show sales by location",
    "Compare weekday vs weekend revenue",
    "Add average order value trend"
  ],
  quickbooks: [
    "Show profit by month",
    "Break down expenses by category",
    "Track accounts receivable over time"
  ],
  multi: [
    "Combine my Shopify and Stripe revenue into one view",
    "Which channel drives the most orders?"
  ]
}
