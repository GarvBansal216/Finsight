# AI Prompt Improvements for Accurate Value Extraction

## Overview
This document describes the improvements made to AI prompts and calculation logic to ensure **accurate, calculated values only** - no placeholder or random numbers.

## Key Principles Applied

1. **Extract ONLY actual values from documents** - Never use placeholders like 0, "N/A", or default values unless the document explicitly shows zero
2. **Use null for missing data** - If a value is not in the document, use `null` (not 0, not empty string)
3. **Verify calculations** - All calculated values must be verified (e.g., totals should match sum of parts)
4. **Calculate ratios only when data is complete** - Ratios are only calculated when all required values are available and valid

## Changes Made

### 1. Trial Balance Extraction Prompt (`extract_trial_balance`)

**Improvements:**
- Added explicit CRITICAL REQUIREMENTS section
- Instructions to extract ONLY values present in document
- Use `null` for missing values (not 0, not empty string)
- Verify calculations: totals must match sum of individual items
- Clean numbers but preserve actual numeric value

**Before:** Simple extraction with basic rules
**After:** Strict validation with explicit instructions against placeholders

### 2. Balance Sheet Extraction Prompt (`extract_balance_sheet`)

**Improvements:**
- Added CRITICAL REQUIREMENTS section
- Verify balance sheet equation: Assets = Liabilities + Equity
- Extract detailed breakdowns if available
- Verify subcategory amounts sum to category totals
- Use `null` for missing values

**Before:** Basic extraction without verification
**After:** Verification of balance sheet equation and breakdown sums

### 3. Profit & Loss Extraction Prompt (`extract_profit_loss`)

**Improvements:**
- Added CRITICAL REQUIREMENTS section
- Explicit calculation rules for derived values (gross_profit, operating_profit, etc.)
- Calculate percentages only when both numerator and denominator are valid
- Verify expense breakdown amounts sum to total
- Use calculated values only when source values are available

**Before:** Basic extraction with simple calculation rules
**After:** Explicit calculation formulas and validation requirements

### 4. Ratio Calculation Function (`calculate_trial_balance_ratios`)

**Major Changes:**
- **Removed all default/placeholder values:**
  - `inventory_turnover`: Changed from default `5.0` to `None` if data unavailable
  - `interest_coverage`: Changed from default `5.0` to `None` if data unavailable
  - `revenue_growth`, `expense_growth`, `net_profit_growth`: Changed from defaults to `None`
  - `cash_flow_score`: Changed from default `8` to `None`

- **Added validation helper:**
  - `is_valid()` function checks for None and NaN values
  - Ratios only calculated when all required values are valid

- **Proper null handling:**
  - Returns `None` for ratios that cannot be calculated
  - Format functions handle `None` values properly

**Before:**
```python
inventory_turnover = 5.0  # Default value
interest_coverage = 5.0  # Default
revenue_growth = 0.1  # 10% default
```

**After:**
```python
inventory_turnover = None  # Only calculate from actual data
interest_coverage = None  # Only calculate from actual data
revenue_growth = None  # Requires previous period data
```

### 5. Report Generation (`generate_trial_balance_reports`)

**Improvements:**
- Calculate `inventory_turnover` from actual COGS and inventory values when available
- Calculate `trade_receivables_turnover` from revenue and receivables
- Calculate `trade_payables_turnover` from COGS/purchases and payables
- Calculate `net_capital_turnover` from revenue and net capital
- Calculate `ROCE` (Return on Capital Employed) from EBIT and capital employed
- All calculations only happen when required data is available

**New Calculations Added:**
- Inventory Turnover Ratio = COGS / Average Inventory (using ending inventory as proxy)
- Trade Receivables Turnover = Revenue / Trade Receivables
- Trade Payables Turnover = Purchases (COGS) / Trade Payables
- Net Capital Turnover = Revenue / Net Capital
- ROCE = EBIT / Capital Employed

## Impact on Output

### Before:
- Ratios showed default values like `5.0` even when data was missing
- Growth ratios showed placeholder percentages (10%, 5%, 8%)
- Some ratios calculated incorrectly due to missing validation

### After:
- Ratios show `null` or are omitted if data is unavailable
- All ratios calculated only from actual extracted data
- Calculations verified and validated before returning
- Missing data properly handled with `null` values

## Testing Recommendations

1. **Test with complete data:** Verify all ratios calculate correctly when all data is present
2. **Test with missing data:** Verify ratios show `null` or are omitted when data is missing
3. **Test calculation accuracy:** Compare calculated ratios with manual calculations
4. **Test document parsing:** Verify extracted values match document exactly

## Future Improvements

1. Add previous period data extraction for accurate growth ratios
2. Extract opening inventory for accurate inventory turnover calculation
3. Extract EBIT and interest expense separately for accurate interest coverage
4. Add validation warnings when calculated values don't match document values

