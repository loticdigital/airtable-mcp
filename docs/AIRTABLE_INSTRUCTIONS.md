# Airtable MCP Table Creation Guide

When creating tables with complex field types in Airtable through the MCP server, follow these step-by-step instructions to ensure successful creation and validation.

## General Rules

1. Always create tables incrementally:
   - Start with basic fields
   - Add complex fields one by one
   - Validate each step before proceeding

2. Field Type Categories:
   - Basic Fields (no options required):
     * singleLineText
     * multilineText
     * email
     * phoneNumber
   - Complex Fields (require specific options):
     * number (requires precision)
     * currency (requires precision and symbol)
     * date (requires dateFormat)
     * singleSelect (requires choices)
     * multiSelect (requires choices)

## Step-by-Step Table Creation

1. Create Table with Basic Fields First:
```json
{
  "name": "create_table",
  "arguments": {
    "base_id": "your_base_id",
    "table_name": "Your Table Name",
    "description": "Table description",
    "fields": [
      {
        "name": "Title",
        "type": "singleLineText",
        "description": "Title field"
      },
      {
        "name": "Notes",
        "type": "multilineText",
        "description": "Notes field"
      }
    ]
  }
}
```

2. Add Number Fields:
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Quantity",
      "type": "number",
      "description": "Quantity field",
      "options": {
        "precision": 0
      }
    }
  }
}
```

3. Add Currency Fields:
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Price",
      "type": "currency",
      "description": "Price field",
      "options": {
        "precision": 2,
        "symbol": "$"
      }
    }
  }
}
```

4. Add Date Fields:
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Due Date",
      "type": "date",
      "description": "Due date field",
      "options": {
        "dateFormat": {
          "name": "local"
        }
      }
    }
  }
}
```

5. Add Single Select Fields:
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Status",
      "type": "singleSelect",
      "description": "Status field",
      "options": {
        "choices": [
          {"name": "Active", "color": "greenBright"},
          {"name": "Pending", "color": "yellowBright"},
          {"name": "Completed", "color": "blueBright"}
        ]
      }
    }
  }
}
```

## Field Options Reference

### Number Fields
```json
{
  "options": {
    "precision": 0  // 0 for integers, 1-8 for decimals
  }
}
```

### Currency Fields
```json
{
  "options": {
    "precision": 2,
    "symbol": "$"  // Currency symbol
  }
}
```

### Date Fields
```json
{
  "options": {
    "dateFormat": {
      "name": "local"  // Use local date format
    }
  }
}
```

### Select Fields
```json
{
  "options": {
    "choices": [
      {
        "name": "Option Name",
        "color": "colorName"  // Available colors: blueBright, greenBright, redBright, yellowBright, pinkBright, purpleBright, cyanBright, grayBright
      }
    ]
  }
}
```

## Example: Creating a Complex Table

To create a complex table like a Product Catalog:

1. Create table with basic fields:
```json
{
  "name": "create_table",
  "arguments": {
    "base_id": "your_base_id",
    "table_name": "Product Catalog",
    "description": "Product inventory tracking",
    "fields": [
      {
        "name": "Product Name",
        "type": "singleLineText",
        "description": "Name of the product"
      },
      {
        "name": "Description",
        "type": "multilineText",
        "description": "Product description"
      }
    ]
  }
}
```

2. Add price field:
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Price",
      "type": "currency",
      "description": "Product price",
      "options": {
        "precision": 2,
        "symbol": "$"
      }
    }
  }
}
```

3. Add category field:
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Category",
      "type": "singleSelect",
      "description": "Product category",
      "options": {
        "choices": [
          {"name": "Electronics", "color": "blueBright"},
          {"name": "Clothing", "color": "pinkBright"},
          {"name": "Books", "color": "greenBright"}
        ]
      }
    }
  }
}
```

4. Add stock field:
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Stock",
      "type": "number",
      "description": "Current stock quantity",
      "options": {
        "precision": 0
      }
    }
  }
}
```

## Best Practices

1. Field Creation Order:
   - Start with text fields
   - Add number/currency fields
   - Add date fields
   - Add select fields last

2. Validation:
   - Verify each field after creation
   - Check field options are correctly applied
   - Test with sample data

3. Error Handling:
   - If a field creation fails, check the options format
   - Ensure required options are provided
   - Verify color names in select fields are valid

4. Testing:
   - Create a test record after adding fields
   - Update the record to verify field behavior
   - Search records to confirm field indexing

By following these instructions, you can reliably create complex Airtable tables through the MCP server while avoiding common pitfalls and validation errors.
