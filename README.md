# Airtable MCP Server

A Model Context Protocol server that provides tools for interacting with Airtable's API. This server enables programmatic management of Airtable bases, tables, fields, and records through Claude Desktop.

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
3. In the Personal access token section select these scores: 
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
```json
{
  "name": "list_bases"
}
```

## Features

[Previous features section remains the same...]

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
