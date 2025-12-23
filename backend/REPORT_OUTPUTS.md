# FinSight Report Outputs - Complete Specification

This document outlines all specific reports generated for each document type.

## Output Structure

Each document type returns a `reports` object containing all required reports. Each report can contain:
- **Tables**: Structured data for table display
- **Charts**: Data formatted for charting libraries
- **Text**: Summary text and descriptions
- **Metrics**: Calculated KPIs and ratios

---

## 1. Bank Statement → 5 Reports

### 1.1 Cash Flow Statement
**Type**: Table + Chart
**Structure**:
```json
{
  "period": "Period covered",
  "operating_activities": {
    "inflows": [{"description": "", "amount": 0}],
    "outflows": [{"description": "", "amount": 0}],
    "net_operating": 0
  },
  "investing_activities": {...},
  "financing_activities": {...},
  "net_cash_flow": 0,
  "opening_balance": 0,
  "closing_balance": 0
}
```

### 1.2 Ledger Entries
**Type**: Table
**Structure**:
```json
{
  "entries": [
    {
      "date": "",
      "description": "",
      "debit": 0,
      "credit": 0,
      "balance": 0,
      "category": "",
      "reference": ""
    }
  ],
  "total_debits": 0,
  "total_credits": 0
}
```

### 1.3 Payment & Receipt Summary
**Type**: Table + Chart
**Structure**:
```json
{
  "total_receipts": 0,
  "total_payments": 0,
  "category_breakdown": {
    "receipts": [{"category": "", "amount": 0}],
    "payments": [{"category": "", "amount": 0}]
  },
  "top_10_receipts": [...],
  "top_10_payments": [...]
}
```

### 1.4 Anomaly & Suspicious Transaction Report
**Type**: Table + Text
**Structure**:
```json
{
  "anomalies": [
    {
      "date": "",
      "description": "",
      "amount": 0,
      "type": "high_value/duplicate/suspicious/unusual_timing",
      "reason": "",
      "risk_level": "low/medium/high"
    }
  ],
  "summary": {
    "total_anomalies": 0,
    "high_risk": 0,
    "medium_risk": 0,
    "low_risk": 0
  },
  "recommendations": []
}
```

### 1.5 Bank Reconciliation Sheet
**Type**: Table
**Structure**:
```json
{
  "book_balance": 0,
  "bank_balance": 0,
  "deposits_in_transit": [],
  "outstanding_checks": [],
  "bank_charges": [],
  "interest_earned": [],
  "adjusted_balance": 0,
  "differences": [],
  "reconciled": true
}
```

---

## 2. GST Returns → 5 Reports

### 2.1 GST Reconciliation Sheet
**Type**: Table
**Structure**:
```json
{
  "period": "",
  "sales_reconciliation": {
    "gstr1_sales": 0,
    "gstr3b_sales": 0,
    "difference": 0,
    "reason": ""
  },
  "tax_reconciliation": {...},
  "reconciliation_items": [],
  "recommendations": []
}
```

### 2.2 ITC Utilization Report
**Type**: Table + Chart
**Structure**:
```json
{
  "total_itc_available": 0,
  "itc_utilized": 0,
  "itc_pending": 0,
  "itc_reversal": 0,
  "utilization_percentage": 0,
  "month_wise_breakdown": [],
  "itc_details": []
}
```

### 2.3 Output vs Input Tax Summary
**Type**: Chart + Table
**Structure**:
```json
{
  "output_tax": {
    "total": 0,
    "cgst": 0,
    "sgst": 0,
    "igst": 0,
    "cess": 0
  },
  "input_tax": {...},
  "net_tax_payable": 0,
  "comparison_chart": {
    "labels": ["CGST", "SGST", "IGST", "CESS"],
    "output": [0, 0, 0, 0],
    "input": [0, 0, 0, 0]
  }
}
```

### 2.4 GST Liability Statement
**Type**: Table
**Structure**:
```json
{
  "period": "",
  "tax_liability": 0,
  "payment_schedule": [
    {
      "due_date": "",
      "amount": 0,
      "status": "paid/unpaid"
    }
  ],
  "penalties": 0,
  "interest": 0,
  "total_payable": 0,
  "payment_status": "paid/unpaid/partial"
}
```

### 2.5 GSTR vs Invoice Match Report
**Type**: Table
**Structure**:
```json
{
  "matched_invoices": [],
  "unmatched_invoices": [],
  "mismatch_reasons": [],
  "match_percentage": 0,
  "recommendations": []
}
```

---

## 3. Invoices → 5 Reports

### 3.1 Sales Ledger
**Type**: Table
**Structure**:
```json
{
  "invoice_number": "",
  "invoice_date": "",
  "customer_name": "",
  "total_amount": 0,
  "line_items": [...],
  "tax_breakdown": {
    "cgst": 0,
    "sgst": 0,
    "igst": 0,
    "cess": 0
  }
}
```

### 3.2 Customer Outstanding Summary
**Type**: Table
**Structure**:
```json
{
  "customer_name": "",
  "invoice_number": "",
  "invoice_date": "",
  "due_date": "",
  "total_amount": 0,
  "paid_amount": 0,
  "outstanding_amount": 0,
  "payment_status": "",
  "days_overdue": 0
}
```

### 3.3 GST Breakdown
**Type**: Table + Chart
**Structure**:
```json
{
  "taxable_amount": 0,
  "cgst": {"rate": 0, "amount": 0},
  "sgst": {"rate": 0, "amount": 0},
  "igst": {"rate": 0, "amount": 0},
  "cess": {"rate": 0, "amount": 0},
  "total_tax": 0,
  "total_amount": 0
}
```

### 3.4 Invoice Aging
**Type**: Table
**Structure**:
```json
{
  "invoice_number": "",
  "invoice_date": "",
  "due_date": "",
  "current_date": "",
  "age_in_days": 0,
  "aging_bucket": "0-30/31-60/61-90/90+",
  "outstanding_amount": 0
}
```

### 3.5 Payment Due Summary
**Type**: Table
**Structure**:
```json
{
  "invoice_number": "",
  "customer_name": "",
  "due_date": "",
  "total_amount": 0,
  "paid_amount": 0,
  "outstanding_amount": 0,
  "payment_terms": "",
  "payment_status": ""
}
```

---

## 4. Purchase Orders → 5 Reports

### 4.1 Vendor Ledger
**Type**: Table
**Structure**:
```json
{
  "po_number": "",
  "po_date": "",
  "vendor_name": "",
  "total_amount": 0,
  "items": [...],
  "tax_breakdown": {...}
}
```

### 4.2 Purchase Summary
**Type**: Table
**Structure**:
```json
{
  "po_number": "",
  "vendor_name": "",
  "po_date": "",
  "delivery_date": "",
  "total_items": 0,
  "subtotal": 0,
  "tax_amount": 0,
  "shipping_charges": 0,
  "total_amount": 0
}
```

### 4.3 Category Spend Report
**Type**: Chart + Table
**Structure**:
```json
{
  "categories": [
    {"category": "", "amount": 0}
  ],
  "total_spend": 0
}
```

### 4.4 PO vs Invoice Matching
**Type**: Table
**Structure**:
```json
{
  "po_number": "",
  "po_date": "",
  "po_amount": 0,
  "matched_invoices": [],
  "unmatched_items": [...],
  "match_status": "",
  "variance": 0
}
```

### 4.5 Payables Summary
**Type**: Table
**Structure**:
```json
{
  "vendor_name": "",
  "po_number": "",
  "po_date": "",
  "total_amount": 0,
  "paid_amount": 0,
  "outstanding_amount": 0,
  "payment_status": "",
  "payment_terms": ""
}
```

---

## 5. Salary Slips → 5 Reports

### 5.1 Salary Summary
**Type**: Table + Text
**Structure**:
```json
{
  "employee_name": "",
  "employee_id": "",
  "designation": "",
  "period": "",
  "gross_salary": 0,
  "total_deductions": 0,
  "net_salary": 0
}
```

### 5.2 Allowances & Deductions Report
**Type**: Table + Chart
**Structure**:
```json
{
  "allowances": {
    "hra": 0,
    "conveyance_allowance": 0,
    "medical_allowance": 0,
    "special_allowance": 0,
    "other_allowances": 0,
    "total_allowances": 0
  },
  "deductions": {
    "provident_fund": 0,
    "professional_tax": 0,
    "income_tax": 0,
    "esi": 0,
    "loan_deduction": 0,
    "other_deductions": 0,
    "total_deductions": 0
  }
}
```

### 5.3 PF/ESI/TDS Summary
**Type**: Table
**Structure**:
```json
{
  "provident_fund": {
    "employee_contribution": 0,
    "employer_contribution": 0,
    "total": 0
  },
  "esi": {...},
  "tds": {
    "income_tax": 0,
    "professional_tax": 0,
    "total_tds": 0
  }
}
```

### 5.4 Employee Cost Report
**Type**: Table
**Structure**:
```json
{
  "employee_name": "",
  "employee_id": "",
  "period": "",
  "cost_to_company": {
    "gross_salary": 0,
    "employer_pf": 0,
    "employer_esi": 0,
    "gratuity": 0,
    "other_benefits": 0,
    "total_ctc": 0
  },
  "annual_ctc": 0
}
```

### 5.5 Payroll Journal Entries
**Type**: Table
**Structure**:
```json
{
  "period": "",
  "entries": [
    {
      "account": "",
      "debit": 0,
      "credit": 0
    }
  ]
}
```

---

## 6. Profit & Loss Statement → 5 Reports

### 6.1 Profitability Summary
**Type**: Table + Text
**Structure**:
```json
{
  "entity_name": "",
  "period": "",
  "total_revenue": 0,
  "total_expenses": 0,
  "gross_profit": 0,
  "operating_profit": 0,
  "net_profit": 0,
  "gross_margin": 0,
  "net_margin": 0
}
```

### 6.2 Revenue vs Expense Analysis
**Type**: Chart + Table
**Structure**:
```json
{
  "revenue": {
    "total": 0,
    "breakdown": [...]
  },
  "expenses": {
    "total": 0,
    "breakdown": [...]
  },
  "net_result": 0
}
```

### 6.3 Margin KPIs
**Type**: Metrics
**Structure**:
```json
{
  "gross_margin": 0,
  "operating_margin": 0,
  "net_margin": 0,
  "ebitda_margin": 0
}
```

### 6.4 Operating vs Non-Operating Split
**Type**: Chart + Table
**Structure**:
```json
{
  "operating": {
    "revenue": 0,
    "expenses": 0,
    "profit": 0
  },
  "non_operating": {
    "revenue": 0,
    "expenses": 0,
    "profit": 0
  }
}
```

### 6.5 Period-wise Profit Trend
**Type**: Chart
**Structure**:
```json
{
  "period": "",
  "revenue": 0,
  "expenses": 0,
  "gross_profit": 0,
  "net_profit": 0,
  "trend": "increasing/decreasing/stable"
}
```

---

## 7. Trial Balance → 5 Reports

### 7.1 Profit & Loss (from Trial Balance)
**Type**: Table
**Structure**:
```json
{
  "income_accounts": 0,
  "expense_accounts": 0,
  "net_profit": 0
}
```

### 7.2 Balance Sheet (from Trial Balance)
**Type**: Table
**Structure**:
```json
{
  "assets": 0,
  "liabilities": 0,
  "equity": 0,
  "total": 0
}
```

### 7.3 Cash Flow (from Trial Balance)
**Type**: Table
**Structure**:
```json
{
  "opening_balance": 0,
  "cash_inflows": 0,
  "cash_outflows": 0,
  "closing_balance": 0
}
```

### 7.4 Accounting Ratios
**Type**: Metrics
**Structure**:
```json
{
  "debit_credit_ratio": 0,
  "current_ratio": 0,
  "debt_to_equity": 0,
  "asset_turnover": 0
}
```

### 7.5 Management Report
**Type**: Table + Text
**Structure**:
```json
{
  "entity_name": "",
  "period": "",
  "total_accounts": 0,
  "total_debits": 0,
  "total_credits": 0,
  "is_balanced": true,
  "difference": 0,
  "top_accounts": [...]
}
```

---

## 8. Balance Sheet → 5 Reports

### 8.1 Asset & Liability Schedules
**Type**: Table
**Structure**:
```json
{
  "assets": {
    "current_assets": 0,
    "fixed_assets": 0,
    "intangible_assets": 0,
    "investments": 0,
    "other_assets": 0,
    "total": 0,
    "breakdown": [...]
  },
  "liabilities": {...}
}
```

### 8.2 Net Worth Statement
**Type**: Table
**Structure**:
```json
{
  "total_assets": 0,
  "total_liabilities": 0,
  "net_worth": 0,
  "equity": 0
}
```

### 8.3 Solvency & Liquidity Summary
**Type**: Metrics + Table
**Structure**:
```json
{
  "current_ratio": 0,
  "quick_ratio": 0,
  "debt_to_equity": 0,
  "working_capital": 0,
  "solvency_ratio": 0
}
```

### 8.4 Equity Movement Statement
**Type**: Table
**Structure**:
```json
{
  "opening_equity": 0,
  "share_capital": 0,
  "reserves": 0,
  "retained_earnings": 0,
  "closing_equity": 0,
  "movement": 0
}
```

### 8.5 Financial Position Report
**Type**: Table + Text
**Structure**:
```json
{
  "entity_name": "",
  "period": "",
  "assets": {
    "total": 0,
    "current": 0,
    "non_current": 0
  },
  "liabilities": {...},
  "equity": {...},
  "is_balanced": true
}
```

---

## 9. Audit Papers → 5 Reports

### 9.1 Audit-Ready Summary
**Type**: Text + Table
**Structure**:
```json
{
  "audit_period": "",
  "entity_name": "",
  "audit_type": "",
  "key_findings": [],
  "adjustments": [],
  "recommendations": [],
  "audit_opinion": ""
}
```

### 9.2 Supporting Schedules
**Type**: Table
**Structure**:
```json
{
  "schedules": []
}
```

### 9.3 Adjustment Notes
**Type**: Table
**Structure**:
```json
{
  "adjustments": []
}
```

### 9.4 Working Papers
**Type**: Table
**Structure**:
```json
{
  "papers": []
}
```

### 9.5 Final Audit Pack
**Type**: Text
**Structure**:
```json
{
  "status": "ready",
  "components": []
}
```

---

## 10. Agreements/Contracts → 5 Reports

### 10.1 Contract Summary
**Type**: Text + Table
**Structure**:
```json
{
  "contract_type": "",
  "parties": [],
  "key_terms": [],
  "obligations": [],
  "risks": [],
  "compliance_requirements": [],
  "summary": ""
}
```

### 10.2 Key Clause Extraction
**Type**: Table
**Structure**:
```json
{
  "clauses": []
}
```

### 10.3 Risk & Obligation Analysis
**Type**: Table + Text
**Structure**:
```json
{
  "risks": [],
  "obligations": []
}
```

### 10.4 Term Compliance Summary
**Type**: Table
**Structure**:
```json
{
  "compliance_requirements": [],
  "status": "pending"
}
```

### 10.5 Contract Analysis
**Type**: Text + Table
**Structure**: Same as Contract Summary

---

## Implementation Notes

1. All reports are generated after base data extraction
2. Reports use AI (GPT-4o) for intelligent analysis
3. Data is cleaned and normalized before report generation
4. Reports can contain tables, charts, text, or metrics
5. Frontend should render based on report type
6. All monetary values are numbers (not strings)
7. Dates are in YYYY-MM-DD format

---

## Frontend Integration

The frontend should:
1. Check for `reports` object in response
2. Display each report in appropriate format:
   - **Tables**: Use table components
   - **Charts**: Use charting libraries (Chart.js, Recharts)
   - **Text**: Display as formatted text
   - **Metrics**: Display as KPI cards
3. Allow users to export each report individually
4. Provide navigation between reports


