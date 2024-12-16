# Airtable MCP Server

A Model Context Protocol server that provides tools for interacting with Airtable's API. This server enables programmatic management of Airtable bases, tables, fields, and records with proper type validation and error handling.

## Features

### Base Management
- List accessible Airtable bases
```json
{
  "name": "list_bases"
}
```

### Table Management
- List tables in a base
- Create new tables with custom fields
- Update table properties

Example creating a table:
```json
{
  "name": "create_table",
  "arguments": {
    "base_id": "your_base_id",
    "table_name": "Customer Support",
    "description": "Track customer support tickets",
    "fields": [
      {
        "name": "Ticket ID",
        "type": "singleLineText",
        "description": "Unique identifier for the ticket"
      },
      {
        "name": "Status",
        "type": "singleSelect",
        "description": "Current status of the ticket",
        "options": {
          "choices": [
            {"name": "New", "color": "blueBright"},
            {"name": "In Progress", "color": "yellowBright"},
            {"name": "Resolved", "color": "greenBright"}
          ]
        }
      }
    ]
  }
}
```

### Field Types and Validation

The server supports various field types with automatic validation:

#### Text Fields
- `singleLineText`: Basic text field (no options required)
- `multilineText`: Multi-line text field (no options required)
```json
{
  "name": "Description",
  "type": "multilineText",
  "description": "Detailed description"
}
```

#### Number Fields
- `number`: Requires precision option
```json
{
  "name": "Quantity",
  "type": "number",
  "description": "Item quantity",
  "options": {
    "precision": 0
  }
}
```

#### Select Fields
- `singleSelect`: Single choice from options
- `multiSelect`: Multiple choices from options
```json
{
  "name": "Category",
  "type": "singleSelect",
  "description": "Item category",
  "options": {
    "choices": [
      {"name": "Electronics", "color": "blueBright"},
      {"name": "Books", "color": "greenBright"}
    ]
  }
}
```

#### Date Fields
- `date`: Requires dateFormat configuration
```json
{
  "name": "Due Date",
  "type": "date",
  "description": "Task due date",
  "options": {
    "dateFormat": {
      "name": "local"
    }
  }
}
```

#### Other Fields
- `email`: Email field (no options required)
- `phoneNumber`: Phone number field (no options required)
- `currency`: Currency field with precision and symbol options

### Record Operations
- List records from tables
- Create new records
- Update existing records
- Search records by field values

Example creating a record:
```json
{
  "name": "create_record",
  "arguments": {
    "base_id": "your_base_id",
    "table_name": "Customer Support",
    "fields": {
      "Ticket ID": "TKT-001",
      "Status": "New",
      "Description": "Initial setup required"
    }
  }
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with your Airtable API key:
```
AIRTABLE_API_KEY=your_api_key_here
```

3. Build the server:
```bash
npm run build
```

## Implementation Details

### Field Validation

The server implements robust field validation through several key components:

1. Type Definitions (`types.ts`):
```typescript
export type FieldType =
  | 'singleLineText'
  | 'multilineText'
  | 'number'
  | 'singleSelect'
  | 'multiSelect'
  | 'date'
  | 'checkbox'
  | 'email'
  | 'phoneNumber'
  | 'currency';
```

2. Field Validation Logic:
- Automatically determines if a field type requires options
- Provides default options for fields that need them
- Removes unnecessary options from fields that don't support them

3. Error Handling:
- Validates field structure before API calls
- Provides clear error messages for invalid configurations
- Handles API errors gracefully

## Example Usage

### Creating a Complex Table

```json
{
  "name": "create_table",
  "arguments": {
    "base_id": "your_base_id",
    "table_name": "Influencer Outreach",
    "description": "Track influencer contacts and communications",
    "fields": [
      {
        "name": "Influencer Name",
        "type": "singleLineText",
        "description": "Full name of the influencer"
      },
      {
        "name": "Platform",
        "type": "singleSelect",
        "description": "Primary social media platform",
        "options": {
          "choices": [
            {"name": "Instagram", "color": "pinkBright"},
            {"name": "YouTube", "color": "redBright"},
            {"name": "TikTok", "color": "cyanBright"}
          ]
        }
      },
      {
        "name": "Followers",
        "type": "number",
        "description": "Number of followers",
        "options": {
          "precision": 0
        }
      }
    ]
  }
}
```

### Adding Fields to Existing Table

```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Contact Status",
      "type": "singleSelect",
      "description": "Current status of communication",
      "options": {
        "choices": [
          {"name": "To Contact", "color": "grayBright"},
          {"name": "Message Sent", "color": "yellowBright"},
          {"name": "Responded", "color": "greenBright"}
        ]
      }
    }
  }
}
```

## License

MIT
