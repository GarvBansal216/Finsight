# Document Type Outputs - Person-Relevant Information

This document outlines the specific outputs extracted for each document type, tailored for individual users.

---

## 1. Bank Statement

### Output Fields:
```json
{
  "account_holder": "Account holder name",
  "account_number": "Account number",
  "bank_name": "Bank name",
  "branch_name": "Branch name",
  "ifsc_code": "IFSC code",
  "statement_start_date": "YYYY-MM-DD",
  "statement_end_date": "YYYY-MM-DD",
  "opening_balance": 100000.00,
  "closing_balance": 150000.00,
  "total_deposits": 80000.00,
  "total_withdrawals": 30000.00,
  "net_balance_change": 50000.00,
  "average_monthly_balance": 125000.00,
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "description": "Transaction description",
      "type": "credit/debit",
      "amount": 5000.00,
      "balance": 105000.00,
      "category": "Salary/Shopping/Food/Travel/etc",
      "reference_number": "UPI/Cheque/Reference number",
      "mode": "UPI/NEFT/RTGS/Cash/etc"
    }
  ],
  "summary": {
    "total_transactions": 50,
    "largest_credit": 50000.00,
    "largest_debit": 20000.00,
    "recurring_payments": ["Rent", "EMI"],
    "cash_withdrawals": 10000.00,
    "online_transfers": 20000.00
  }
}
```

### Person-Relevant Information:
- **Account Details**: Full account information for record-keeping
- **Transaction History**: Complete list with categorization
- **Spending Patterns**: Categories help track expenses
- **Recurring Payments**: Identifies monthly bills/EMIs
- **Balance Tracking**: Opening, closing, and average balances
- **Transaction Modes**: UPI, NEFT, cash withdrawals tracking

---

## 2. GST Return (GSTR-1/GSTR-3B)

### Output Fields:
```json
{
  "gstin": "GSTIN number",
  "legal_name": "Business legal name",
  "trade_name": "Trade name",
  "address": "Business address",
  "period": "Month-Year",
  "filing_date": "YYYY-MM-DD",
  "filing_status": "Filed/Pending",
  "total_sales": 1000000.00,
  "taxable_value": 900000.00,
  "cgst": 81000.00,
  "sgst": 81000.00,
  "igst": 0.00,
  "cess": 0.00,
  "output_tax": 162000.00,
  "input_tax_credit": 100000.00,
  "reverse_charge": 0.00,
  "net_tax_payable": 62000.00,
  "interest_payable": 0.00,
  "late_fee": 0.00,
  "penalty": 0.00,
  "total_payable": 62000.00,
  "payment_status": "Paid/Unpaid",
  "payment_date": "YYYY-MM-DD"
}
```

### Person-Relevant Information:
- **Tax Liability**: Clear breakdown of tax payable
- **Filing Status**: Track compliance status
- **Payment Tracking**: Payment dates and status
- **Tax Components**: CGST, SGST, IGST, CESS breakdown
- **Input Credit**: Available tax credits
- **Penalties**: Late fees and interest tracking

---

## 3. Trial Balance

### Output Fields:
```json
{
  "entity_name": "Company/Individual name",
  "entity_type": "Company/Individual/Partnership",
  "period": "Month-Year",
  "prepared_date": "YYYY-MM-DD",
  "total_debits": 500000.00,
  "total_credits": 500000.00,
  "difference": 0.00,
  "is_balanced": true,
  "balances": [
    {
      "account_code": "Account code",
      "account_name": "Account name",
      "account_type": "Asset/Liability/Income/Expense/Equity",
      "debit": 10000.00,
      "credit": 0.00,
      "balance": 10000.00
    }
  ],
  "summary": {
    "asset_accounts": 300000.00,
    "liability_accounts": 150000.00,
    "income_accounts": 200000.00,
    "expense_accounts": 100000.00
  }
}
```

### Person-Relevant Information:
- **Account Categorization**: All accounts organized by type
- **Balance Verification**: Checks if debits equal credits
- **Financial Position**: Summary by account category
- **Account Codes**: For accounting system integration
- **Period Tracking**: Financial period information

---

## 4. Profit & Loss Statement

### Output Fields:
```json
{
  "entity_name": "Company/Individual name",
  "period": "Month-Year",
  "prepared_date": "YYYY-MM-DD",
  "revenue": {
    "total_revenue": 1000000.00,
    "sales": 800000.00,
    "service_income": 150000.00,
    "other_income": 50000.00,
    "revenue_breakdown": [
      {
        "category": "Product Sales",
        "amount": 800000.00
      }
    ]
  },
  "expenses": {
    "total_expenses": 700000.00,
    "cost_of_goods_sold": 400000.00,
    "operating_expenses": 200000.00,
    "administrative_expenses": 50000.00,
    "financial_expenses": 30000.00,
    "tax_expenses": 20000.00,
    "expense_breakdown": [
      {
        "category": "Rent",
        "amount": 50000.00,
        "percentage": 7.14
      }
    ]
  },
  "profitability": {
    "gross_profit": 600000.00,
    "operating_profit": 400000.00,
    "profit_before_tax": 370000.00,
    "net_profit": 350000.00,
    "gross_margin": 60.00,
    "net_margin": 35.00
  }
}
```

### Person-Relevant Information:
- **Revenue Breakdown**: All income sources categorized
- **Expense Analysis**: Detailed expense categories with percentages
- **Profitability Metrics**: Gross and net profit margins
- **Cost Analysis**: COGS, operating, admin expenses
- **Tax Information**: Tax expenses included
- **Performance Tracking**: Margins for business health

---

## 5. Invoice

### Output Fields:
```json
{
  "invoice_number": "INV-2025-001",
  "invoice_date": "YYYY-MM-DD",
  "due_date": "YYYY-MM-DD",
  "seller": {
    "name": "Seller company name",
    "address": "Complete address",
    "gstin": "GSTIN number",
    "pan": "PAN number",
    "contact": "Phone/Email",
    "bank_details": "Bank account details"
  },
  "buyer": {
    "name": "Buyer name",
    "address": "Buyer address",
    "gstin": "GSTIN number",
    "pan": "PAN number",
    "contact": "Phone/Email"
  },
  "amounts": {
    "subtotal": 100000.00,
    "discount": 5000.00,
    "taxable_amount": 95000.00,
    "cgst": 8550.00,
    "sgst": 8550.00,
    "igst": 0.00,
    "cess": 0.00,
    "tax_amount": 17100.00,
    "round_off": 0.00,
    "total_amount": 112100.00
  },
  "payment": {
    "payment_terms": "Net 30",
    "payment_mode": "Bank Transfer",
    "payment_status": "Pending/Paid",
    "paid_amount": 0.00,
    "outstanding_amount": 112100.00
  },
  "line_items": [
    {
      "item_code": "ITEM-001",
      "description": "Product description",
      "hsn_sac": "HSN/SAC code",
      "quantity": 10,
      "unit": "Nos",
      "rate": 1000.00,
      "discount": 0.00,
      "amount": 10000.00,
      "tax_rate": 18.00,
      "tax_amount": 1800.00
    }
  ]
}
```

### Person-Relevant Information:
- **Complete Invoice Details**: All invoice information
- **Tax Breakdown**: CGST, SGST, IGST, CESS separately
- **Payment Tracking**: Payment status and outstanding amounts
- **Vendor Information**: Complete seller details for records
- **Item Details**: Line items with HSN/SAC codes
- **Due Dates**: Payment due date tracking

---

## 6. Purchase Order

### Output Fields:
```json
{
  "po_number": "PO-2025-001",
  "po_date": "YYYY-MM-DD",
  "delivery_date": "YYYY-MM-DD",
  "validity_date": "YYYY-MM-DD",
  "vendor": {
    "name": "Vendor name",
    "address": "Vendor address",
    "contact": "Phone/Email",
    "gstin": "GSTIN number",
    "pan": "PAN number"
  },
  "buyer": {
    "name": "Buyer name",
    "address": "Buyer address",
    "contact": "Phone/Email",
    "gstin": "GSTIN number",
    "pan": "PAN number"
  },
  "items": [
    {
      "item_code": "ITEM-001",
      "description": "Product description",
      "specification": "Product specifications",
      "quantity": 100,
      "unit": "Nos",
      "rate": 100.00,
      "discount": 5.00,
      "amount": 9500.00,
      "tax_rate": 18.00,
      "tax_amount": 1710.00
    }
  ],
  "amounts": {
    "subtotal": 95000.00,
    "discount": 5000.00,
    "taxable_amount": 90000.00,
    "cgst": 8100.00,
    "sgst": 8100.00,
    "igst": 0.00,
    "tax_amount": 16200.00,
    "shipping_charges": 1000.00,
    "total_amount": 107200.00
  },
  "terms": {
    "payment_terms": "Advance 50%, Balance on delivery",
    "delivery_terms": "FOB/FOR",
    "warranty": "1 year warranty",
    "notes": "Additional terms"
  }
}
```

### Person-Relevant Information:
- **Order Tracking**: PO number and dates
- **Vendor Details**: Complete vendor information
- **Item Specifications**: Detailed product information
- **Delivery Terms**: Delivery dates and terms
- **Payment Terms**: Payment conditions
- **Total Cost**: Including taxes and shipping

---

## 7. Salary Slip

### Output Fields:
```json
{
  "employee": {
    "name": "Employee name",
    "employee_id": "EMP-001",
    "designation": "Job title",
    "department": "Department name",
    "uan": "UAN number",
    "pan": "PAN number",
    "aadhaar": "Aadhaar number"
  },
  "employer": {
    "name": "Company name",
    "address": "Company address",
    "pf_number": "PF number",
    "esi_number": "ESI number"
  },
  "salary_period": {
    "month": "January",
    "year": "2025",
    "days_paid": 31,
    "working_days": 31
  },
  "earnings": {
    "basic_pay": 50000.00,
    "hra": 20000.00,
    "conveyance_allowance": 2000.00,
    "medical_allowance": 5000.00,
    "special_allowance": 10000.00,
    "bonus": 0.00,
    "overtime": 0.00,
    "other_allowances": 3000.00,
    "total_earnings": 90000.00,
    "gross_salary": 90000.00
  },
  "deductions": {
    "provident_fund": 6000.00,
    "professional_tax": 200.00,
    "income_tax": 5000.00,
    "esi": 225.00,
    "loan_deduction": 0.00,
    "other_deductions": 0.00,
    "total_deductions": 11425.00
  },
  "net_salary": 78575.00,
  "year_to_date": {
    "gross_ytd": 1080000.00,
    "deductions_ytd": 137100.00,
    "net_ytd": 942900.00
  }
}
```

### Person-Relevant Information:
- **Complete Salary Breakdown**: All earnings and deductions
- **Tax Information**: Income tax and professional tax
- **Provident Fund**: PF contribution tracking
- **Year-to-Date**: Annual salary summary
- **Employee Details**: UAN, PAN for tax filing
- **Employer Information**: For records and verification

---

## 8. Balance Sheet

### Output Fields:
```json
{
  "entity_name": "Company/Individual name",
  "entity_type": "Company/Individual/Partnership",
  "period": "Month-Year",
  "prepared_date": "YYYY-MM-DD",
  "assets": {
    "current_assets": 500000.00,
    "fixed_assets": 1000000.00,
    "intangible_assets": 200000.00,
    "investments": 300000.00,
    "other_assets": 100000.00,
    "total_assets": 2100000.00,
    "asset_breakdown": [
      {
        "category": "Current Assets",
        "subcategory": "Cash",
        "amount": 100000.00
      }
    ]
  },
  "liabilities": {
    "current_liabilities": 400000.00,
    "long_term_liabilities": 600000.00,
    "loans": 500000.00,
    "creditors": 300000.00,
    "other_liabilities": 200000.00,
    "total_liabilities": 1500000.00,
    "liability_breakdown": [
      {
        "category": "Current Liabilities",
        "subcategory": "Creditors",
        "amount": 300000.00
      }
    ]
  },
  "equity": {
    "share_capital": 400000.00,
    "reserves": 150000.00,
    "retained_earnings": 50000.00,
    "total_equity": 600000.00
  },
  "summary": {
    "total_liabilities_and_equity": 2100000.00,
    "is_balanced": true
  }
}
```

### Person-Relevant Information:
- **Asset Categorization**: Current, fixed, intangible assets
- **Liability Breakdown**: Current and long-term liabilities
- **Equity Details**: Share capital, reserves, retained earnings
- **Balance Verification**: Checks if Assets = Liabilities + Equity
- **Financial Position**: Complete financial snapshot
- **Asset Details**: Detailed asset breakdown by category

---

## Common Features Across All Documents:

1. **Number Cleaning**: All amounts are cleaned (no currency symbols, commas)
2. **Date Formatting**: Dates in YYYY-MM-DD format
3. **Null Handling**: Missing data returns null or empty strings
4. **Structured JSON**: All outputs are valid JSON
5. **Person-Focused**: Information relevant for individual use
6. **Tax Details**: Complete tax breakdowns where applicable
7. **Contact Information**: Vendor/buyer/employer details
8. **Status Tracking**: Payment/filing status information

---

## Usage Notes:

- All monetary values are in numbers (not strings)
- Dates are standardized to YYYY-MM-DD format
- Missing fields return null or empty strings
- All outputs are ready for dashboard integration
- Data is cleaned and normalized for direct use


