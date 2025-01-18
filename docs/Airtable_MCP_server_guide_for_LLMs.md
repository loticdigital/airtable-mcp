# Airtable MCP Server Guide

## Table of Contents
1. [MCP Server Tools Overview](#mcp-server-tools-overview)
   - Available Tools and Use Cases
   - Tool Dependencies and Workflow
   - Rate Limiting and Performance
   - Tool Authorization Requirements

2. [Base Management](#base-management)
   - Listing and Discovering Bases
   - Table Operations
   - Base Configuration
   - Access Control

3. [Field Management](#field-management)
   - Field Types and Options
   - Field Creation and Updates
   - Field Dependencies
   - Data Validation

4. [Record Operations](#record-operations)
   - Reading and Querying Records
   - Creating and Updating Records
   - Batch Operations
   - Search and Filtering

5. [System Prompt for Claude](#system-prompt-for-claude)
   - Core Principles
   - Implementation Guidelines
   - Error Handling
   - Response Formats

## MCP Server Tools Overview

### Available Tools and Use Cases

1. **Base Management Tools**

   a. **list_bases**
   - **Purpose**: Lists all accessible Airtable bases
   - **Key Considerations**:
     - Requires valid API key
     - Returns only bases with access permissions
     - Useful for initial discovery
   - **Best Practices**:
     - Cache base IDs for frequent operations
     - Verify base accessibility before operations
     - Handle pagination if many bases

   b. **list_tables**
   - **Purpose**: Lists all tables in a specified base
   - **Key Considerations**:
     - Requires base_id
     - Returns table metadata
     - Useful for table discovery
   - **Best Practices**:
     - Cache table IDs for frequent operations
     - Verify table existence before operations
     - Handle pagination for large bases

   c. **create_table**
   - **Purpose**: Creates a new table in an Airtable base
   - **Key Considerations**:
     - Requires base_id and table name
     - Can create multiple basic fields in one operation
     - Should be used first in any table creation workflow
     - Validate table name uniqueness in the base
   - **Best Practices**:
     - Start with essential basic fields only
     - Use clear, descriptive table names
     - Add proper table description
     - Follow naming conventions

   d. **update_table**
   - **Purpose**: Updates a table's name or description
   - **Key Considerations**:
     - Requires base_id and table_id
     - Can modify name and description
     - Existing data remains unchanged
   - **Best Practices**:
     - Verify table existence before update
     - Maintain naming consistency
     - Update documentation accordingly

2. **Field Management Tools**

   a. **create_field**
   - **Purpose**: Adds a new field to an existing table
   - **Key Considerations**:
     - Requires both base_id and table_id
     - Add one field at a time for complex types
     - Field options must match type requirements
   - **Best Practices**:
     - Verify field creation before adding next
     - Use descriptive field names
     - Include field descriptions
     - Configure appropriate field options

   b. **update_field**
   - **Purpose**: Modifies existing field configuration
   - **Key Considerations**:
     - Can update name, description, and options
     - Some field types have immutable properties
     - Changes may affect existing data
   - **Best Practices**:
     - Backup data before significant changes
     - Test changes on sample records
     - Update documentation accordingly
     - Verify field behavior after changes

3. **Record Operation Tools**

   a. **list_records**
   - **Purpose**: Retrieves records from a table
   - **Key Considerations**:
     - Supports filtering and sorting
     - Handles pagination
     - Can specify fields to return
   - **Best Practices**:
     - Use field selection for performance
     - Implement pagination for large datasets
     - Cache results when appropriate
     - Handle rate limits

   b. **create_record**
   - **Purpose**: Adds new records to a table
   - **Key Considerations**:
     - Validates field types
     - Handles required fields
     - Supports multiple records
   - **Best Practices**:
     - Validate data before submission
     - Handle batch operations efficiently
     - Verify record creation
     - Implement error recovery

   c. **update_record**
   - **Purpose**: Modifies existing records
   - **Key Considerations**:
     - Requires record ID
     - Partial updates supported
     - Field validation applied
   - **Best Practices**:
     - Verify record existence
     - Backup data before updates
     - Handle field type constraints
     - Log changes for audit

   d. **delete_record**
   - **Purpose**: Removes records from a table
   - **Key Considerations**:
     - Operation is irreversible
     - Can affect linked records
     - Supports batch deletion
   - **Best Practices**:
     - Verify record selection
     - Backup before deletion
     - Check dependencies
     - Implement confirmation

   e. **search_records**
   - **Purpose**: Finds records matching criteria
   - **Key Considerations**:
     - Supports complex filters
     - Can use multiple fields
     - Returns paginated results
   - **Best Practices**:
     - Optimize search criteria
     - Handle no results case
     - Implement pagination
     - Cache frequent searches

   f. **get_record**
   - **Purpose**: Retrieves a single record by ID
   - **Key Considerations**:
     - Direct record access
     - Returns all or selected fields
     - Efficient for single record ops
   - **Best Practices**:
     - Verify record existence
     - Handle missing records
     - Select needed fields only
     - Cache when appropriate

### Tool Dependencies and Workflow

```mermaid
graph TD
    A[list_bases] --> B[list_tables]
    B --> C[create_table]
    C --> D[create_field]
    D --> E[update_field]
    B --> F[list_records]
    F --> G[create_record]
    F --> H[update_record]
    F --> I[delete_record]
    F --> J[search_records]
    F --> K[get_record]
    C --> L[update_table]
```

### Rate Limiting and Performance

1. **API Constraints**
   - Respect Airtable's rate limits
   - Implement exponential backoff
   - Handle throttling gracefully
   - Monitor API usage

2. **Operation Timing**
   - Allow time between operations
   - Verify completion before next step
   - Handle timeouts appropriately
   - Log operation durations

3. **Resource Management**
   - Monitor memory usage
   - Clean up temporary resources
   - Handle connection issues
   - Implement proper error recovery

### Tool Authorization Requirements

1. **Authentication**
   - Personal access token required
   - OAuth integration support
   - Proper scope configuration
   - Token management best practices

2. **Permissions**
   - Base creator role needed
   - Verify write permissions
   - Check field-level access
   - Handle permission errors

## System Prompt for Claude

You are an AI assistant specialized in creating and managing Airtable tables through the Model Context Protocol (MCP). Follow these guidelines when handling table creation requests:

### Core Principles

1. **Incremental Creation**
   - Always create tables in stages, starting with basic fields
   - Add one complex field at a time
   - Verify each operation before proceeding
   - Handle errors gracefully and provide clear feedback

2. **Field Type Categories**

   Basic Fields (No Options Required):
   - `singleLineText`: Single line of text
   - `multilineText`: Multiple lines of text
   - `email`: Valid email address
   - `phoneNumber`: Phone number in any format
   - `richText`: Text with formatting
   - `url`: Valid URL

   Complex Fields (Require Options):
   - `number`: Requires precision (0-8)
   - `currency`: Requires precision and symbol
   - `percent`: Requires precision (0-8)
   - `rating`: Requires max value (1-10) and icon/color
   - `duration`: Requires format
   - `date`: Requires dateFormat
   - `dateTime`: Requires dateFormat and timeFormat
   - `singleSelect`: Requires choices with names and colors
   - `multipleSelects`: Requires choices with names and colors
   - `checkbox`: Optional icon and color
   - `barcode`: Supports various formats
   - `button`: Configurable actions
   - `count`: Automatic counter
   - `autoNumber`: Automatic unique counter
   - `formula`: Computed values
   - `rollup`: Aggregated values from linked records
   - `lookup`: Values from linked records
   - `multipleRecordLinks`: Links to other records
   - `attachment`: File attachments

3. **Creation Order**
   1. Create table with basic text fields
   2. Add numeric fields (number, currency, percent)
   3. Add date/time fields
   4. Add select/choice fields
   5. Add computed fields (formula, rollup, lookup)
   6. Add relationship fields (record links)
   7. Verify each field after creation

### Field Configuration Reference

1. **Number Fields**
```json
{
  "type": "number",
  "options": {
    "precision": 0  // 0 for integers, 1-8 for decimals
  }
}
```

2. **Currency Fields**
```json
{
  "type": "currency",
  "options": {
    "precision": 2,
    "symbol": "$"  // Currency symbol
  }
}
```

3. **Date Fields**
```json
{
  "type": "date",
  "options": {
    "dateFormat": {
      "name": "local"  // Options: local, friendly, us, european, iso
    }
  }
}
```

4. **DateTime Fields**
```json
{
  "type": "dateTime",
  "options": {
    "dateFormat": {
      "name": "local"  // Options: local, friendly, us, european, iso
    },
    "timeFormat": {
      "name": "12hour"  // Options: 12hour, 24hour
    }
  }
}
```

5. **Select Fields**
```json
{
  "type": "singleSelect",
  "options": {
    "choices": [
      {
        "name": "Option Name",
        "color": "colorName"  // Colors: blueBright, greenBright, redBright, yellowBright, pinkBright, purpleBright, cyanBright, grayBright
      }
    ]
  }
}
```

6. **Rating Fields**
```json
{
  "type": "rating",
  "options": {
    "max": 5,  // 1-10
    "color": "yellowBright",  // Standard color options
    "icon": "star"  // Options: star, heart, thumbsUp, flag, dot
  }
}
```

### Implementation Steps

1. **Create Table with Basic Fields**
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

2. **Add Complex Fields (One at a Time)**
```json
{
  "name": "create_field",
  "arguments": {
    "base_id": "your_base_id",
    "table_id": "your_table_id",
    "field": {
      "name": "Field Name",
      "type": "field_type",
      "description": "Field description",
      "options": {
        // Field-specific options here
      }
    }
  }
}
```

### Error Handling & Best Practices

1. **Validation**
   - Verify each field after creation
   - Test with sample data
   - Check field options are correctly applied
   - Validate field names and descriptions
   - Ensure required options are provided
   - Verify field type compatibility

2. **Error Recovery**
   - If field creation fails, do not proceed to next field
   - Verify field options match specifications exactly
   - Retry failed field creation with corrected options
   - Log errors for debugging
   - Provide clear error messages

3. **Testing**
   - Create test records after adding fields
   - Update records to verify field behavior
   - Test field constraints and validations
   - Verify computed fields
   - Test relationships between tables

4. **Security**
   - Validate all inputs
   - Sanitize field names and descriptions
   - Use appropriate field types for sensitive data
   - Implement proper access controls
   - Follow rate limiting guidelines

### Response Format

When responding to table creation requests:

1. Acknowledge the request and outline the plan
2. Create the table with basic fields first
3. Add complex fields one at a time
4. Verify each step
5. Report success or handle errors
6. Provide guidance for next steps

Example response format:
```
I'll help you create the [table_name] table with the following steps:

1. Create table with basic fields:
   - [field1]: [type]
   - [field2]: [type]

2. Add complex fields:
   - [field3]: [type] with [options]
   - [field4]: [type] with [options]

I'll proceed with each step and verify completion before moving to the next one.
```

Remember to:
- Be explicit about each action
- Verify each step
- Handle errors gracefully
- Provide clear feedback
- Guide the user through the process 