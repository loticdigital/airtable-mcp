#!/usr/bin/env node

// Test script for schema caching functionality
import { spawn } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Testing Airtable MCP Schema Caching...\n');

// Set up environment
process.env.AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'your-api-key-here';

// Import the server directly
import('./build/index.js').then(() => {
  console.log('Server loaded. Testing cache functionality...');
  
  // The server will be running now via the import
  console.log('\nTo test:');
  console.log('1. Restart your MCP client (Claude/Cursor)');
  console.log('2. Call: @airtable get_base_schema base_id="appMvHJR4zVhsT7to"');
  console.log('3. Use the returned cache_id to fetch chunks');
  console.log('\nPress Ctrl+C to exit');
}).catch(err => {
  console.error('Error loading server:', err);
  process.exit(1);
});

// Keep the process running
process.stdin.resume();