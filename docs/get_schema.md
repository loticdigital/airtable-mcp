# get_base_schema - Handling Large Schemas with Caching

## Overview

The `get_base_schema` tool provides access to complete Airtable base schemas, including all tables and their fields. Due to MCP's 25,000 token response limit, large bases that exceed this limit are handled through an intelligent caching and chunking system.

## The Problem

Many Airtable bases contain extensive schemas with:
- Dozens or hundreds of tables
- Each table having numerous fields with detailed configurations
- Multiple views per table
- Complex field relationships

A single base schema can easily exceed 100,000+ tokens, far beyond MCP's 25,000 token limit. Direct retrieval would fail with:
```
Error: MCP tool response exceeds maximum allowed tokens (25000)
```

## The Solution: In-Memory Caching with Chunking

The `get_base_schema` tool now implements a two-phase approach:

1. **Phase 1: Fetch and Cache** - Retrieves the full schema and stores it in memory
2. **Phase 2: Chunked Retrieval** - Returns the schema in manageable chunks

## Usage Patterns

### Pattern 1: Simple Schema Retrieval (Small Bases)

For smaller bases or when fetching specific tables:

```typescript
// Get schema for specific tables only (no caching needed)
get_base_schema(
  base_id: "appXXXXXXXXXXXXXX",
  table_ids: ["tblUsers", "tblOrders"]
)
```

### Pattern 2: Large Schema Retrieval (Cached Approach)

For complete base schemas that may exceed token limits:

#### Step 1: Initial Fetch
```typescript
get_base_schema(base_id: "appXXXXXXXXXXXXXX")
```

**Response:**
```
✅ Schema fetched and cached successfully!

📊 Base: appXXXXXXXXXXXXXX
📋 Total tables: 47

Tables:
1. Users (tblUsers) - 15 fields, 3 views
2. Orders (tblOrders) - 22 fields, 5 views
... (first 10 tables shown)
... and 37 more tables

📦 Cache ID: appXXXXXXXXXXXXXX-1704123456789

💡 To retrieve the full schema:
- Use cache_id="appXXXXXXXXXXXXXX-1704123456789" with chunk_offset=0
- Continue incrementing chunk_offset to get all chunks

Example: get_base_schema(cache_id="appXXXXXXXXXXXXXX-1704123456789", chunk_offset=0)
```

#### Step 2: Retrieve Chunks
```typescript
// Get first chunk
get_base_schema(
  cache_id: "appXXXXXXXXXXXXXX-1704123456789",
  chunk_offset: 0
)
```

**Response:**
```
📄 Schema Chunk 1/8

{
  "tables": [
    {
      "id": "tblUsers",
      "name": "Users",
      "fields": [
        ...
      ]
    }
    ...
  ]
}

➡️ Next chunk: use chunk_offset=1
```

Continue retrieving chunks until you see:
```
✅ Complete schema retrieved
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base_id` | string | Sometimes* | The Airtable base ID |
| `cache_id` | string | Sometimes* | Cache ID from a previous fetch |
| `chunk_offset` | number | No | Chunk number to retrieve (0-based) |
| `table_ids` | string[] | No | Specific table IDs to fetch (bypasses caching) |
| `use_cache` | boolean | No | Force caching on/off (default: true for full schemas) |

*Either `base_id` OR `cache_id` must be provided

## Cache Management

### Cache Lifetime
- Cached schemas are kept in memory for **30 minutes**
- After 30 minutes, they are automatically removed
- Each new fetch creates a new cache entry

### Viewing Cached Schemas
Use the `list_cached_schemas` tool to see all cached schemas:

```typescript
list_cached_schemas()
```

**Response:**
```
📦 Cached Schemas (2):

1. Base: appXXXXXXXXXXXXXX
   Cache ID: appXXXXXXXXXXXXXX-1704123456789
   Tables: 47
   Age: 5 minutes
   Size: 245.3 KB

2. Base: appYYYYYYYYYYYYYY
   Cache ID: appYYYYYYYYYYYYYY-1704123356789
   Tables: 12
   Age: 15 minutes
   Size: 45.7 KB
```

## For AI Assistants

When an AI assistant (like Claude) uses this tool, it should:

1. **Recognize the caching pattern** - The initial response with a cache ID is not the actual schema
2. **Follow the instructions** - Make subsequent calls with the cache ID and chunk offset
3. **Iterate through chunks** - Continue fetching chunks until the complete schema is retrieved
4. **Handle the data** - Assemble chunks if needed for processing

### Example AI Workflow

User: "Show me the complete schema for my Airtable base appXXX"

AI should:
```
1. Call: get_base_schema(base_id="appXXX")
2. Receive cache_id in response
3. Call: get_base_schema(cache_id="...", chunk_offset=0)
4. Process chunk 0
5. Call: get_base_schema(cache_id="...", chunk_offset=1)
6. Continue until all chunks retrieved
7. Present assembled schema to user
```

## Technical Details

### Chunk Size
- Each chunk is limited to ~15,000 characters
- This ensures token count stays well below the 25,000 limit
- Chunks are split at line boundaries to preserve JSON structure

### Memory Usage
- Large schemas are stored entirely in memory
- A 250KB schema uses approximately 250KB of RAM
- Multiple cached schemas can exist simultaneously

### Performance
- Initial fetch time depends on Airtable API response
- Chunk retrieval is instant (from memory)
- No disk I/O involved

## Error Handling

### Common Errors

1. **Cache not found**
   ```
   Error: Cache entry not found. Please fetch the schema first.
   ```
   Solution: Make a fresh call with base_id

2. **Invalid chunk offset**
   ```
   Error: Invalid chunk offset
   ```
   Solution: Use a valid offset (0 to totalChunks-1)

3. **Base not found**
   ```
   Error: Invalid permissions, or the requested model was not found
   ```
   Solution: Verify base_id and API key permissions

## Best Practices

1. **For Large Bases**: Always use the caching approach
2. **For Specific Tables**: Use `table_ids` parameter to avoid caching
3. **For Repeated Access**: Reuse the cache_id within 30 minutes
4. **For Fresh Data**: Make a new fetch if data might have changed

## Migration Notes

This feature is **backward compatible**. Existing code that calls `get_base_schema(base_id)` will automatically use caching for large schemas. The only change is that large schemas now succeed instead of failing with token limit errors.

## Examples

### Example 1: Get Specific Tables (No Caching)
```typescript
const result = await get_base_schema({
  base_id: "appMvHJR4zVhsT7to",
  table_ids: ["tblUsers", "tblOrders"]
});
// Returns: Direct response with just these two tables
```

### Example 2: Get Full Schema (With Caching)
```typescript
// First call
const initial = await get_base_schema({
  base_id: "appMvHJR4zVhsT7to"
});
// Returns: Summary and cache_id

// Retrieve chunks
let offset = 0;
let hasMore = true;
const chunks = [];

while (hasMore) {
  const chunk = await get_base_schema({
    cache_id: initial.cache_id,
    chunk_offset: offset
  });
  chunks.push(chunk.data);
  hasMore = chunk.hasMore;
  offset++;
}

// Now you have the complete schema in chunks array
```

### Example 3: Force No Caching (Small Schema)
```typescript
const result = await get_base_schema({
  base_id: "appSmallBase",
  use_cache: false
});
// Returns: Direct response if it fits within token limit
```

## Summary

The `get_base_schema` tool now handles schemas of any size through intelligent caching and chunking. This solution:

- ✅ Works with schemas exceeding 100,000+ tokens
- ✅ Maintains backward compatibility
- ✅ Requires no user configuration
- ✅ Provides transparent operation for AI assistants
- ✅ Manages memory automatically
- ✅ Delivers optimal performance

Users can now access complete schemas for even the largest Airtable bases without encountering token limit errors.