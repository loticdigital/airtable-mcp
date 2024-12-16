# Airtable MCP Server

[Previous installation sections remain the same until Features...]

## Features

### Base Management
- **List Bases**
  ```json
  {
    "name": "list_bases"
  }
  ```
  Lists all accessible Airtable bases with their IDs and permission levels.

### Table Operations
- **List Tables**
  ```json
  {
    "name": "list_tables",
    "arguments": {
      "base_id": "your_base_id"
    }
  }
  ```
  Returns complete schema including tables, fields, and views.

- **Create Table**
  ```json
  {
    "name": "create_table",
    "arguments": {
      "base_id": "your_base_id",
      "table_name": "Projects",
      "description": "Track project progress",
      "fields": [
        {
          "name": "Project Name",
          "type": "singleLineText",
          "description": "Name of the project"
        },
        {
          "name": "Status",
          "type": "singleSelect",
          "description": "Project status",
          "options": {
            "choices": [
              {"name": "Planning", "color": "blueBright"},
              {"name": "In Progress", "color": "yellowBright"},
              {"name": "Completed", "color": "greenBright"}
            ]
          }
        }
      ]
    }
  }
  ```

- **Update Table**
  ```json
  {
    "name": "update_table",
    "arguments": {
      "base_id": "your_base_id",
      "table_id": "your_table_id",
      "name": "Updated Name",
      "description": "Updated description"
    }
  }
  ```

### Field Management
- **Create Field**
  ```json
  {
    "name": "create_field",
    "arguments": {
      "base_id": "your_base_id",
      "table_id": "your_table_id",
      "field": {
        "name": "Due Date",
        "type": "date",
        "description": "Project deadline",
        "options": {
          "dateFormat": {
            "name": "local"
          }
        }
      }
    }
  }
  ```

- **Update Field**
  ```json
  {
    "name": "update_field",
    "arguments": {
      "base_id": "your_base_id",
      "table_id": "your_table_id",
      "field_id": "your_field_id",
      "updates": {
        "name": "Updated Field Name",
        "description": "Updated description"
      }
    }
  }
  ```

### Record Operations
- **List Records**
  ```json
  {
    "name": "list_records",
    "arguments": {
      "base_id": "your_base_id",
      "table_name": "Your Table",
      "max_records": 100
    }
  }
  ```

- **Create Record**
  ```json
  {
    "name": "create_record",
    "arguments": {
      "base_id": "your_base_id",
      "table_name": "Projects",
      "fields": {
        "Project Name": "New Website",
        "Status": "Planning",
        "Due Date": "2024-03-01"
      }
    }
  }
  ```

- **Update Record**
  ```json
  {
    "name": "update_record",
    "arguments": {
      "base_id": "your_base_id",
      "table_name": "Projects",
      "record_id": "rec123abc",
      "fields": {
        "Status": "In Progress",
        "Last Updated": "2024-01-15"
      }
    }
  }
  ```

- **Delete Record**
  ```json
  {
    "name": "delete_record",
    "arguments": {
      "base_id": "your_base_id",
      "table_name": "Projects",
      "record_id": "rec123abc"
    }
  }
  ```

- **Search Records**
  ```json
  {
    "name": "search_records",
    "arguments": {
      "base_id": "your_base_id",
      "table_name": "Projects",
      "field_name": "Status",
      "value": "In Progress"
    }
  }
  ```

### Supported Field Types

#### Basic Fields (No Options Required)
- `singleLineText`: Single line text field
- `multilineText`: Multi-line text area
- `email`: Email address field
- `phoneNumber`: Phone number field

#### Number Fields
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

#### Currency Fields
```json
{
  "name": "Budget",
  "type": "currency",
  "description": "Project budget",
  "options": {
    "precision": 2,
    "symbol": "$"
  }
}
```

#### Date Fields
```json
{
  "name": "Due Date",
  "type": "date",
  "description": "Project deadline",
  "options": {
    "dateFormat": {
      "name": "local"
    }
  }
}
```

#### Select Fields
- **Single Select**
  ```json
  {
    "name": "Category",
    "type": "singleSelect",
    "description": "Project category",
    "options": {
      "choices": [
        {"name": "Development", "color": "blueBright"},
        {"name": "Design", "color": "purpleBright"},
        {"name": "Marketing", "color": "greenBright"}
      ]
    }
  }
  ```

- **Multi Select**
  ```json
  {
    "name": "Tags",
    "type": "multiSelect",
    "description": "Project tags",
    "options": {
      "choices": [
        {"name": "Urgent", "color": "redBright"},
        {"name": "Bug Fix", "color": "orangeBright"},
        {"name": "Feature", "color": "blueBright"}
      ]
    }
  }
  ```

### Field Colors
Available colors for select fields:
- `blueBright`
- `redBright`
- `greenBright`
- `yellowBright`
- `purpleBright`
- `pinkBright`
- `grayBright`
- `cyanBright`
- `orangeBright`
- `blueDark1`
- `greenDark1`

[Previous contributing section and rest remain the same...]
