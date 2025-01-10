# Airtable MCP Server

A Model Context Protocol server that provides tools for interacting with Airtable's API. This server enables programmatic management of Airtable bases, tables, fields, and records through Claude Desktop.

This MCP server has an special implementation that allows it to build tables in stages, leveraging the agentic capabilities of Claude and minimizing the failure rate present in other MCP servers for Airtable when building complex tables, also comes with system prompts to create projects inside Claude Desktop with even further guidance for the LLM. 

## Installation

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Git
- Claude Desktop or an MCP compatible IDE like [VS Code](https://code.visualstudio.com/download) + [Cline](https://github.com/cline/cline)

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/felores/airtable-mcp.git
cd airtable-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

### Obtaining Airtable API Key

1. Log in to your Airtable account at [airtable.com](https://airtable.com)
2. Create a personal access token at [Airtable's Builder Hub](https://airtable.com/create/tokens)
3. In the Personal access token section select these scopes: 
     - data.records:read
     - data.records:write
     - schema.bases:read
     - schema.bases:write
4. Select the workspace or bases you want to give access to the personal access token
5. Keep this key secure - you'll need it for configuration

### Configuring Claude Desktop

#### Windows
1. Open File Explorer and navigate to:
```
%APPDATA%\Roaming\Claude
```
2. Create or edit `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "airtable": {
      "command": "node",
      "args": ["C:/path/to/airtable-mcp/build/index.js"],
      "env": {
        "AIRTABLE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

#### macOS
1. Open Terminal and navigate to:
```bash
~/Library/Application Support/Claude/
```
2. Create or edit `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "airtable": {
      "command": "node",
      "args": ["/path/to/airtable-mcp/build/index.js"],
      "env": {
        "AIRTABLE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Verifying Installation

1. Start Claude Desktop
2. The Airtable MCP server should be listed in the "Connected MCP Servers" section
3. Test with a simple command:
```
List all bases
```

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

## Contributing

We welcome contributions to improve the Airtable MCP server! Here's how you can contribute:

1. Fork the Repository
   - Visit https://github.com/felores/airtable-mcp
   - Click the "Fork" button in the top right
   - Clone your fork locally:
     ```bash
     git clone https://github.com/your-username/airtable-mcp.git
     ```

2. Create a Feature Branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make Your Changes
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

4. Commit Your Changes
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. Push to Your Fork
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Describe your changes in detail

### Development Guidelines

- Use TypeScript for new code
- Follow semantic commit messages
- Update documentation for new features
- Add examples for new functionality
- Test your changes thoroughly

### Getting Help

- Open an issue for bugs or feature requests
- Join discussions in existing issues
- Ask questions in pull requests

Your contributions help make this tool better for everyone. Whether it's:
- Adding new features
- Fixing bugs
- Improving documentation
- Suggesting enhancements

We appreciate your help in making the Airtable MCP server more powerful and user-friendly!

## License

MIT

---

Made with ❤️ by the Airtable MCP community
