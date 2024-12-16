# Airtable MCP Server

A Model Context Protocol server that provides tools for interacting with Airtable's API. This server enables programmatic management of Airtable bases, tables, fields, and records.

## Features

### Base Management
- List accessible Airtable bases

### Table Management
- List tables in a base
- Create new tables with custom fields
- Update table properties

### Field Management
- Create new fields with various types (text, number, select, etc.)
- Update field properties and options

### Record Operations
- List records from tables
- Create new records
- Update existing records
- Search records by field values

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

## Usage

The server provides MCP tools that can be used to:
- Manage Airtable schema (bases, tables, fields)
- Create and update records
- Search and filter data
- Track changes and updates

## Example Tools

1. Create a table:
```json
{
  "base_id": "your_base_id",
  "table_name": "New Table",
  "description": "Table description",
  "fields": [
    {
      "name": "Field Name",
      "type": "singleLineText",
      "description": "Field description"
    }
  ]
}
```

2. Create a record:
```json
{
  "base_id": "your_base_id",
  "table_name": "Your Table",
  "fields": {
    "Field Name": "Value"
  }
}
```

## License

MIT
