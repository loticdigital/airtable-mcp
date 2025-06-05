#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

async function testMCPServer() {
  console.log('🧪 Testing MCP Airtable Server...');
  
  const serverPath = path.join(__dirname, 'build', 'index.js');
  const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env }
  });

  let responseCount = 0;
  const maxResponses = 3;

  server.stdout.on('data', (data) => {
    const message = data.toString();
    console.log('📤 Server response:', message.slice(0, 200) + (message.length > 200 ? '...' : ''));
    responseCount++;
    
    if (responseCount >= maxResponses) {
      console.log('✅ Server responded appropriately, terminating test');
      server.kill();
    }
  });

  server.stderr.on('data', (data) => {
    console.log('🔍 Server log:', data.toString());
  });

  // Test list_bases request
  const listBasesRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "list_bases",
      arguments: {}
    }
  };

  console.log('📨 Sending list_bases request...');
  server.stdin.write(JSON.stringify(listBasesRequest) + '\n');

  // Test list_tables request after a delay
  setTimeout(() => {
    const listTablesRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "list_tables",
        arguments: { base_id: "appMvHJR4zVhsT7to" }
      }
    };

    console.log('📨 Sending list_tables request...');
    server.stdin.write(JSON.stringify(listTablesRequest) + '\n');
  }, 1000);

  // Cleanup after 10 seconds
  setTimeout(() => {
    console.log('⏰ Test timeout, cleaning up...');
    server.kill();
    process.exit(0);
  }, 10000);
}

testMCPServer().catch(console.error); 