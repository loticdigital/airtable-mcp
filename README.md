# Airtable MCP Server

A comprehensive Model Context Protocol (MCP) server that provides full access to the Airtable Web API, including enterprise features. This server enables AI assistants to create, manage, and interact with Airtable bases, tables, fields, records, views, and webhooks.

## Features

### 🏗️ **Base Management**
- **List Bases**: Get all accessible bases in a workspace
- **Get Base Schema**: Retrieve complete base structure with tables and fields
- **Delete Base**: Remove bases (Enterprise only)

### 📊 **Table Management**
- **List Tables**: Get all tables in a base
- **Create Table**: Create new tables with comprehensive field configurations
- **Update Table**: Modify table properties and metadata
- **Delete Table**: Remove tables (with proper permissions)

### 🔧 **Field Management**
- **List Fields**: Get all fields in a table
- **Create Field**: Add new fields with 25+ field types supported
- **Update Field**: Modify existing field properties and options
- **Delete Field**: Remove fields (with data considerations)

#### Supported Field Types
- **Basic Fields**: `singleLineText`, `multilineText`, `email`, `phoneNumber`, `richText`, `url`
- **Numeric Fields**: `number`, `currency`, `percent`
- **Date/Time Fields**: `date`, `dateTime`, `duration`
- **Selection Fields**: `singleSelect`, `multipleSelects`
- **Interactive Fields**: `rating`, `checkbox`
- **Advanced Fields**: `formula`, `rollup`, `lookup`, `multipleRecordLinks`
- **Specialized Fields**: `attachment`, `barcode`, `button`, `count`, `autoNumber`

### 📝 **Record Operations**
- **List Records**: Basic record retrieval
- **Advanced List Records**: Full filtering, sorting, pagination, and field selection
- **Get Record**: Fetch individual record details
- **Create Record**: Add single records
- **Update Record**: Modify existing records
- **Delete Record**: Remove records
- **Batch Create Records**: Create multiple records efficiently
- **Batch Update Records**: Update multiple records in one request
- **Batch Delete Records**: Delete multiple records efficiently
- **Search Records**: Find records using field-based search

### 👁️ **View Management**
- **List Views**: Get all views in a table
- **Get View**: Retrieve view configuration
- **Create View**: Create new views (grid, form, calendar, gallery, kanban, timeline, gantt)
- **Update View**: Modify view properties, filters, and sorting
- **Delete View**: Remove views

### 🔔 **Webhook Management**
- **List Webhooks**: Get all webhooks for a base
- **Create Webhook**: Set up real-time notifications
- **Update Webhook**: Modify webhook configuration
- **Delete Webhook**: Remove webhook subscriptions
- **Get Webhook Payloads**: Retrieve webhook notification history

### 🏢 **Enterprise Features** (Enterprise Scale Plans)
- **User Management**: Create, update, and deactivate users
- **Workspace Management**: Manage workspace access and permissions
- **Audit Logs**: Create and retrieve comprehensive audit logs
- **Share Link Management**: Control base sharing across organization
- **Collaborator Management**: Add/remove users from bases and workspaces
- **Bulk Operations**: Perform enterprise-scale batch operations

## Installation

```bash
npm install @loticdigital/airtable-mcp-server
```

## Configuration

Set your Airtable API key as an environment variable:

```bash
export AIRTABLE_API_KEY=your_airtable_api_key_here
```

## Usage

### With Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "airtable": {
      "command": "npx",
      "args": ["@loticdigital/airtable-mcp-server"],
      "env": {
        "AIRTABLE_API_KEY": "your_airtable_api_key_here"
      }
    }
  }
}
```

### With MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @loticdigital/airtable-mcp-server
```

## API Capabilities

### Rate Limits & Best Practices
- **Rate Limit**: 5 requests per second per base
- **API Call Limits**: 
  - Free: 1,000 calls per workspace per month
  - Team: 100,000 calls per workspace per month
  - Business/Enterprise: Unlimited calls
- **Pagination**: Automatic handling of paginated responses
- **Batch Operations**: Efficient bulk processing for multiple records
- **Error Handling**: Comprehensive error recovery with exponential backoff

### Advanced Features
- **External ID Mapping**: Support for upsert operations
- **Data Validation**: Comprehensive field validation
- **Conflict Resolution**: Handle concurrent updates gracefully
- **Change Tracking**: Monitor and log all data modifications
- **Performance Optimization**: Caching and selective field requests

### Security Features
- **Token Management**: Secure PAT handling
- **Data Protection**: Input validation and sanitization
- **Enterprise Security**: Audit logging and compliance support
- **Access Controls**: Proper permission handling

## Field Configuration Examples

### Basic Fields
```json
{
  "name": "Title",
  "type": "singleLineText",
  "description": "Main title field"
}
```

### Numeric Fields
```json
{
  "name": "Price",
  "type": "currency",
  "options": {
    "precision": 2,
    "symbol": "$"
  }
}
```

### Selection Fields
```json
{
  "name": "Status",
  "type": "singleSelect",
  "options": {
    "choices": [
      { "name": "Active", "color": "greenBright" },
      { "name": "Pending", "color": "yellowBright" },
      { "name": "Inactive", "color": "redBright" }
    ]
  }
}
```

### Advanced Fields
```json
{
  "name": "Full Name",
  "type": "formula",
  "options": {
    "formula": "CONCATENATE({First Name}, ' ', {Last Name})"
  }
}
```

## Webhook Configuration

```json
{
  "notificationUrl": "https://your-server.com/webhook",
  "specification": {
    "options": {
      "filters": {
        "dataTypes": ["tableData"],
        "recordChangeScope": "tblXXXXXXXXXXXXXX"
      }
    }
  }
}
```

## Error Handling

The server implements comprehensive error handling:

- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **422 Unprocessable Entity**: Invalid field configuration
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Airtable service issue

## Development

```bash
# Clone the repository
git clone https://github.com/loticdigital/airtable-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run with inspector
npm run inspector
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- GitHub Issues: [https://github.com/loticdigital/airtable-mcp/issues](https://github.com/loticdigital/airtable-mcp/issues)
- Documentation: [Airtable Web API](https://airtable.com/developers/web/api/introduction)

## Changelog

### v0.6.0 (Latest)
- ✨ **Major Feature Expansion**: Added comprehensive Airtable Web API support
- 🔧 **25+ Field Types**: Support for all Airtable field types including advanced fields
- 👁️ **View Management**: Complete view CRUD operations
- 🔔 **Webhook Support**: Real-time notifications and webhook management
- 📊 **Advanced Record Operations**: Batch operations, advanced filtering, pagination
- 🏢 **Enterprise Features**: User management, audit logs, workspace management
- 🛡️ **Enhanced Security**: Comprehensive validation and error handling
- ⚡ **Performance**: Optimized batch operations and caching strategies

### v0.5.1
- Basic table and field management
- Simple record CRUD operations
- Limited field type support
