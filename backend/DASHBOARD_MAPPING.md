# Dashboard Mapping Schema - Document Types

This document defines the complete dashboard structure for each document type, including tables, charts, ratios, and whether multiple PDFs are required.

---

## 1. Bank Statement

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "transactions": [...],
      "category_summary": [...],
      "high_value_transactions": [...]
    },
    "charts": {
      "income_expense_trend": [...],
      "cashflow_line": [...],
      "spend_pie": [...]
    },
    "ratios": {
      "savings_rate": 0.0,
      "expense_ratio": 0.0,
      "deposit_withdrawal_ratio": 0.0,
      "average_monthly_balance": 0.0,
      "average_monthly_savings": 0.0
    },
    "requires_multiple_pdfs": false
  }
}
```

### Charts:
- **Income vs Expenses Trend**: Monthly bar/line chart showing deposits vs withdrawals
- **Cashflow Line**: Running balance over time
- **Spend Pie Chart**: Category-wise expense breakdown

### Tables:
- **Transactions**: Complete transaction list
- **Category Summary**: Expenses by category
- **High Value Transactions**: Transactions above threshold

### Ratios:
- Savings Rate = (Total Deposits − Total Withdrawals) / Total Deposits × 100
- Expense Ratio = Total Withdrawals / Total Deposits × 100
- Deposit/Withdrawal Ratio
- Average Monthly Balance
- Average Monthly Savings

---

## 2. GST Return (GSTR-1/GSTR-3B)

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "hsn_summary": [...],
      "sales_table": [...]
    },
    "charts": {
      "sales_trend": [...],
      "output_vs_input_tax": {...}
    },
    "ratios": {
      "itc_utilization": 0.0,
      "tax_liability_ratio": 0.0,
      "sales_growth": 0.0
    },
    "requires_multiple_pdfs": true
  }
}
```

### Charts:
- **Sales Trend**: Month-wise taxable sales
- **Output Tax vs Input Tax**: Dual bar chart or comparison

### Tables:
- **HSN Summary**: HSN code-wise sales summary
- **Sales Table**: Period-wise sales data

### Ratios:
- ITC Utilization % = (Input Tax Credit / Output Tax) × 100
- Tax Liability Ratio = (Net Tax Payable / Taxable Value) × 100
- Sales Growth % (requires multiple periods)

**Note**: Requires multiple PDFs for yearly analysis (12 GSTR-1 + 12 GSTR-3B)

---

## 3. Trial Balance

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "balances": [...],
      "top_accounts": [...]
    },
    "charts": {
      "debit_credit_chart": {...},
      "account_type_pyramid": [...],
      "ledger_contribution": [...]
    },
    "ratios": {
      "debit_credit_ratio": 0.0,
      "major_account_concentration": 0.0
    },
    "requires_multiple_pdfs": false
  }
}
```

### Charts:
- **Debit vs Credit Summary**: Overall balance structure
- **Account Type Pyramid**: Assets/Liabilities/Income/Expense breakdown
- **Ledger Contribution**: Donut/pie chart by account

### Tables:
- **Balances**: Complete trial balance
- **Top Accounts**: Accounts by value

### Ratios:
- Debit/Credit Ratio
- Major Account Concentration %

**Note**: Multiple PDFs only needed for period comparison

---

## 4. Profit & Loss Statement

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "expense_breakdown": [...],
      "top_5_expenses": [...]
    },
    "charts": {
      "revenue_expense_trend": [...],
      "profit_margins": {...},
      "expense_pie": [...]
    },
    "ratios": {
      "gross_margin": 0.0,
      "net_margin": 0.0,
      "expense_to_revenue_ratio": 0.0
    },
    "requires_multiple_pdfs": true
  }
}
```

### Charts:
- **Revenue vs Expenses Trend**: Monthly/Quarterly comparison
- **Profit Margins**: Gross and net profit meters
- **Expense Pie Chart**: Category breakdown

### Tables:
- **Expense Breakdown**: All expense categories
- **Top 5 Expenses**: Highest expense items

### Ratios:
- Gross Profit Margin = (Gross Profit / Revenue) × 100
- Net Profit Margin = (Net Profit / Revenue) × 100
- Expense-to-Revenue Ratio = (Total Expenses / Total Revenue) × 100
- EBITDA Margin (if data available)

**Note**: Requires multiple PDFs for yearly trends (monthly/quarterly P&L)

---

## 5. Invoice

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "line_items": [...]
    },
    "charts": {
      "tax_breakdown": [...],
      "buyer_seller_summary": {...}
    },
    "ratios": {
      "avg_order_value": 0.0,
      "tax_rate_consistency": 0.0
    },
    "requires_multiple_pdfs": true
  }
}
```

### Charts:
- **Tax Breakdown**: CGST/SGST/IGST pie chart
- **Buyer/Seller Summary**: Transaction parties

### Tables:
- **Line Items**: Item-level details

### Ratios:
- Average Order Value = Total Amount / Number of Items
- Tax Rate Consistency Check

**Note**: Requires multiple PDFs for monthly invoice insights and top customer analytics

---

## 6. Purchase Order

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "items": [...]
    },
    "charts": {
      "vendor_spend": [...],
      "item_quantities": [...]
    },
    "ratios": {
      "vendor_concentration": 0.0,
      "purchase_growth": 0.0
    },
    "requires_multiple_pdfs": false
  }
}
```

### Charts:
- **Vendor-wise Spending**: Bar chart by vendor
- **Item Quantity Summary**: Bar chart of quantities

### Tables:
- **Items**: Complete item list

### Ratios:
- Vendor Concentration %
- Purchase Growth Rate (requires multiple POs)

**Note**: Multiple POs provide better vendor analysis

---

## 7. Salary Slip

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "earnings": [...],
      "deductions": [...]
    },
    "charts": {
      "salary_trend": [...],
      "earnings_breakdown": [...],
      "deductions_breakdown": [...]
    },
    "ratios": {
      "deduction_ratio": 0.0,
      "allowance_to_basic_ratio": 0.0,
      "ctc_monthly": 0.0,
      "ctc_annual": 0.0
    },
    "requires_multiple_pdfs": true
  }
}
```

### Charts:
- **Salary Trend**: Net salary over months
- **Earnings Breakdown**: Basic/HRA/Allowances pie chart
- **Deductions Breakdown**: PF/ESI/TDS breakdown

### Tables:
- **Earnings**: All earnings components
- **Deductions**: All deduction components

### Ratios:
- Deduction Ratio = (Total Deductions / Gross Salary) × 100
- Allowance-to-Basic Ratio = (Total Allowances / Basic Pay) × 100
- CTC Monthly and Annual

**Note**: Requires multiple PDFs for salary growth trend and year-to-date analytics

---

## 8. Balance Sheet

### Dashboard Structure:
```json
{
  "dashboard": {
    "tables": {
      "asset_breakdown": [...],
      "liability_breakdown": [...]
    },
    "charts": {
      "assets_vs_liabilities": {...},
      "debt_equity": {...},
      "asset_pie": [...]
    },
    "ratios": {
      "current_ratio": 0.0,
      "debt_to_equity": 0.0,
      "working_capital": 0.0,
      "quick_ratio": 0.0,
      "asset_turnover": 0.0
    },
    "requires_multiple_pdfs": false
  }
}
```

### Charts:
- **Assets vs Liabilities**: Big picture comparison
- **Debt vs Equity**: Capital structure bar chart
- **Asset Pie Chart**: Current, fixed, other assets

### Tables:
- **Asset Breakdown**: Detailed asset categories
- **Liability Breakdown**: Detailed liability categories

### Ratios:
- Current Ratio = Current Assets / Current Liabilities
- Quick Ratio = (Current Assets - Inventory) / Current Liabilities
- Debt-to-Equity = Total Debt / Total Equity
- Asset Turnover = Revenue / Total Assets
- Working Capital = Current Assets - Current Liabilities

**Note**: Multiple PDFs only needed for year-on-year comparison

---

## Complete Mapping Schema

```json
{
  "bank_statement": {
    "tables": ["transactions", "category_summary", "high_value_transactions"],
    "charts": ["income_expense_trend", "cashflow_line", "spend_pie"],
    "ratios": ["savings_rate", "expense_ratio", "deposit_withdrawal_ratio", "average_monthly_balance", "average_monthly_savings"],
    "requires_multiple_pdfs": false
  },
  "gst_return": {
    "tables": ["hsn_summary", "sales_table"],
    "charts": ["sales_trend", "output_vs_input_tax"],
    "ratios": ["itc_utilization", "tax_liability_ratio", "sales_growth"],
    "requires_multiple_pdfs": true
  },
  "trial_balance": {
    "tables": ["balances", "top_accounts"],
    "charts": ["debit_credit_chart", "account_type_pyramid", "ledger_contribution"],
    "ratios": ["debit_credit_ratio", "major_account_concentration"],
    "requires_multiple_pdfs": false
  },
  "profit_loss": {
    "tables": ["expense_breakdown", "top_5_expenses"],
    "charts": ["revenue_expense_trend", "profit_margins", "expense_pie"],
    "ratios": ["gross_margin", "net_margin", "expense_to_revenue_ratio"],
    "requires_multiple_pdfs": true
  },
  "invoice": {
    "tables": ["line_items"],
    "charts": ["tax_breakdown", "buyer_seller_summary"],
    "ratios": ["avg_order_value", "tax_rate_consistency"],
    "requires_multiple_pdfs": true
  },
  "purchase_order": {
    "tables": ["items"],
    "charts": ["vendor_spend", "item_quantities"],
    "ratios": ["vendor_concentration", "purchase_growth"],
    "requires_multiple_pdfs": false
  },
  "salary_slip": {
    "tables": ["earnings", "deductions"],
    "charts": ["salary_trend", "earnings_breakdown", "deductions_breakdown"],
    "ratios": ["deduction_ratio", "allowance_to_basic_ratio", "ctc_monthly", "ctc_annual"],
    "requires_multiple_pdfs": true
  },
  "balance_sheet": {
    "tables": ["asset_breakdown", "liability_breakdown"],
    "charts": ["assets_vs_liabilities", "debt_equity", "asset_pie"],
    "ratios": ["current_ratio", "debt_to_equity", "working_capital", "quick_ratio", "asset_turnover"],
    "requires_multiple_pdfs": false
  }
}
```

---

## Implementation Notes

1. **All ratios are calculated automatically** from extracted data
2. **Charts data is pre-formatted** for direct use in frontend charting libraries
3. **Tables contain structured data** ready for display
4. **Multiple PDFs flag** indicates if trend analysis requires batch uploads
5. **All monetary values are cleaned** (no currency symbols, commas)
6. **Dates are standardized** to YYYY-MM-DD format
7. **Missing data returns null** or 0 for calculations

---

## Frontend Integration

The dashboard structure is designed for direct integration with:
- **Chart.js** or **Recharts** for visualizations
- **React Table** or **Material-UI Table** for data tables
- **Custom KPI components** for ratio displays

Each document type's `dashboard` object contains all necessary data for rendering the complete dashboard view.


