# Airtable MCP Server

A Model Context Protocol server that provides tools for interacting with Airtable's API. This server enables programmatic management of Airtable bases, tables, fields, and records through Claude Desktop.

This MCP server features a specialized implementation that allows it to build tables in stages, leveraging Claude's agentic capabilities and minimizing the failure rate typically seen in other MCP servers for Airtable when building complex tables. It also includes system prompts that provide additional guidance for the LLM when leveraging projects in Claude Desktop.

## Installation

⚠️ **Important**: Before running, make sure to:
1. Set up your Airtable API key (see [API Key Setup](#obtaining-airtable-api-key))
2. Configure Claude Desktop (see [Configuration](#configuring-claude-desktop))

### Method 1: Using npx (Recommended)
The easiest way to run the server is with npx:
```bash
# Run directly (will install latest version)
npx airtable-server

# Or specify a version
npx airtable-server@0.1.0
```

### Method 2: Global Installation
If you prefer a global installation:
```bash
# Install globally
npm install -g airtable-server

# Run from anywhere
airtable-server
```

### Method 3: Local Development Installation
If you want to contribute or modify the code:
```bash
# Clone the repository
git clone https://github.com/felores/airtable-mcp.git
cd airtable-mcp

# Install dependencies
npm install

# Build the server
npm run build

# Run locally
node build/index.js
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

1. Navigate to the Claude configuration directory:
   - Windows: `%APPDATA%\Claude`
   - macOS: `~/Library/Application Support/Claude/`

2. Create or edit `claude_desktop_config.json`:

For local installation:
```json
{
  "mcpServers": {
    "airtable": {
      "command": "node",
      "args": ["path/to/airtable-mcp/build/index.js"],
      "env": {
        "AIRTABLE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

For npx installation:
```json
{
  "mcpServers": {
    "airtable": {
      "command": "npx",
      "args": ["airtable-server"],
      "env": {
        "AIRTABLE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Note: For Windows paths, use double backslashes (\\) or forward slashes (/).

### Verifying Installation

1. Start Claude Desktop
2. The Airtable MCP server should be listed in the "Connected MCP Servers" section
3. Test with a simple command:
```
List all bases
```

## Features

### Available Operations

#### Base Management
- `list_bases`: List all accessible Airtable bases
- `list_tables`: List all tables in a base
- `create_table`: Create a new table with fields
- `update_table`: Update a table's name or description

#### Field Management
- `create_field`: Add a new field to a table
- `update_field`: Modify an existing field

#### Record Operations
- `list_records`: Retrieve records from a table
- `create_record`: Add a new record
- `update_record`: Modify an existing record
- `delete_record`: Remove a record
- `search_records`: Find records matching criteria

### Field Types
- `singleLineText`: Single line text field
- `multilineText`: Multi-line text area
- `email`: Email address field
- `phoneNumber`: Phone number field
- `number`: Numeric field with optional precision
- `currency`: Money field with currency symbol
- `date`: Date field with format options
- `singleSelect`: Single choice from options
- `multiSelect`: Multiple choices from options

### Field Colors
Available colors for select fields:
- `blueBright`, `redBright`, `greenBright`
- `yellowBright`, `purpleBright`, `pinkBright`
- `grayBright`, `cyanBright`, `orangeBright`
- `blueDark1`, `greenDark1`

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
