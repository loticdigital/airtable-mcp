#!/usr/bin/env node

// Polyfill for AbortController if not available
if (typeof globalThis.AbortController === 'undefined') {
  // @ts-ignore
  globalThis.AbortController = (await import('abort-controller')).AbortController;
}

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios, { AxiosInstance } from "axios";
import { FieldOption, fieldRequiresOptions, getDefaultOptions, FieldType, validateFieldOptions } from "./types.js";

const API_KEY = process.env.AIRTABLE_API_KEY;
if (!API_KEY) {
  throw new Error("AIRTABLE_API_KEY environment variable is required");
}

class AirtableServer {
  private server: Server;
  private axiosInstance: AxiosInstance;
  private requestCount: Map<string, number> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: "airtable-server",
        version: "0.5.1",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.axiosInstance = axios.create({
      baseURL: "https://api.airtable.com/v0",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private validateField(field: FieldOption): FieldOption {
    const { type } = field;

    // Remove options for fields that don't need them
    if (!fieldRequiresOptions(type as FieldType)) {
      const { options, ...rest } = field;
      return rest;
    }

    // Add default options for fields that require them
    if (!field.options) {
      return {
        ...field,
        options: getDefaultOptions(type as FieldType),
      };
    }

    // Validate field options
    if (!validateFieldOptions(type as FieldType, field.options)) {
      throw new Error(`Invalid options for field type ${type}: ${JSON.stringify(field.options)}`);
    }

    return field;
  }

  private truncateResponse(data: any, maxLength: number = 5000): string {
    const jsonString = JSON.stringify(data, null, 2);
    if (jsonString.length <= maxLength) {
      return jsonString;
    }
    
    // If it's an array, try to show first few items
    if (Array.isArray(data)) {
      const truncatedArray = data.slice(0, 3);
      const truncatedString = JSON.stringify(truncatedArray, null, 2);
      return `${truncatedString.slice(0, -1)}\n  ... (${data.length - 3} more items truncated)\n]`;
    }
    
    // For objects, truncate the string
    return jsonString.slice(0, maxLength) + '\n... (response truncated due to size)';
  }

  private formatSuccessResponse(data: any, operation: string): any {
    return {
      content: [{
        type: "text",
        text: `✅ ${operation} completed successfully:\n\n${this.truncateResponse(data)}`,
      }],
    };
  }

  private formatErrorResponse(error: any, operation: string): any {
    return {
      isError: true,
      content: [{
        type: "text",
        text: `❌ ${operation} failed: ${error.message || error}`,
      }],
    };
  }

  private formatListResponse(items: any[], operation: string, itemType: string, baseId?: string): any {
    if (!Array.isArray(items) || items.length === 0) {
      return {
        content: [{
          type: "text",
          text: `✅ ${operation} completed: No ${itemType} found.`,
        }],
      };
    }

    // Always show ALL items with their essential info for discoverability
    const allItemsSummary = items.map((item, index) => {
      const name = item.name || item.title || `${itemType} ${index + 1}`;
      const id = item.id || '';
      return `${name} (${id})`;
    }).join(', ');

    // Show detailed info for first few items
    const detailedItems = items.slice(0, 3);
    const detailedInfo = this.truncateResponse(detailedItems, 3000);

    // Generate next steps based on operation type
    let nextSteps = '';
    if (operation === 'list_tables' && baseId) {
      nextSteps = `\n\n📋 Next Steps:\n- Use list_fields with base_id="${baseId}" and table_id="<table_id>" to see fields\n- Use list_records with base_id="${baseId}" and table_name="<table_name>" to see data\n- Use get_base_schema with base_id="${baseId}" for complete schema`;
    } else if (operation === 'list_records') {
      nextSteps = `\n\n📋 Next Steps:\n- Use get_record with record_id="<record_id>" for full record details\n- Use search_records to filter by specific criteria\n- Use advanced_list_records for pagination and filtering`;
    } else if (operation === 'list_fields' && baseId) {
      nextSteps = `\n\n📋 Next Steps:\n- Use create_field to add new fields\n- Use update_field to modify existing fields\n- Use list_records to see how these fields are used`;
    } else if (operation === 'list_bases') {
      nextSteps = `\n\n📋 Next Steps:\n- Use list_tables with base_id="<base_id>" to see tables in each base\n- Use get_base_schema with base_id="<base_id>" for complete base structure`;
    }

    return {
      content: [{
        type: "text",
        text: `✅ ${operation} completed: Found ${items.length} ${itemType}(s)\n\n🔍 All ${itemType}s: ${allItemsSummary}\n\n📊 Detailed info for first ${Math.min(3, items.length)}:\n${detailedInfo}${nextSteps}`,
      }],
    };
  }

  private formatRecordsResponse(data: any, operation: string, baseId: string, tableName: string): any {
    const records = data.records || [];
    const offset = data.offset;
    
    if (records.length === 0) {
      return {
        content: [{
          type: "text",
          text: `✅ ${operation} completed: No records found in table "${tableName}".`,
        }],
      };
    }

    // Show all record IDs for discoverability
    const allRecordIds = records.map((record: any) => record.id).join(', ');
    
    // Show detailed info for first few records
    const detailedRecords = records.slice(0, 3);
    const detailedInfo = this.truncateResponse(detailedRecords, 3000);

    // Pagination info
    const paginationInfo = offset ? `\n\n📄 Pagination: More records available. Use advanced_list_records with offset="${offset}" to get next page.` : '\n\n📄 Pagination: All records shown (no more pages).';

    const nextSteps = `\n\n📋 Next Steps:\n- Use get_record with base_id="${baseId}", table_name="${tableName}", record_id="<record_id>" for full details\n- Use search_records to filter by field values\n- Use update_record or delete_record to modify data${paginationInfo}`;

    return {
      content: [{
        type: "text",
        text: `✅ ${operation} completed: Found ${records.length} record(s) in "${tableName}"\n\n🔍 All record IDs: ${allRecordIds}\n\n📊 Detailed info for first ${Math.min(3, records.length)} records:\n${detailedInfo}${nextSteps}`,
      }],
    };
  }

  private setupToolHandlers() {
    // Register available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "list_bases",
          description: "List all accessible Airtable bases",
          inputSchema: {
            type: "object",
            properties: {},
            required: [],
          },
        },
        {
          name: "list_tables",
          description: "List all tables in a base",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
            },
            required: ["base_id"],
          },
        },
        {
          name: "create_table",
          description: "Create a new table in a base",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the new table",
              },
              description: {
                type: "string",
                description: "Description of the table",
              },
              fields: {
                type: "array",
                description: "Initial fields for the table",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Name of the field",
                    },
                    type: {
                      type: "string",
                      description: "Type of the field (e.g., singleLineText, multilineText, number, etc.)",
                    },
                    description: {
                      type: "string",
                      description: "Description of the field",
                    },
                    options: {
                      type: "object",
                      description: "Field-specific options",
                    },
                  },
                  required: ["name", "type"],
                },
              },
            },
            required: ["base_id", "table_name"],
          },
        },
        {
          name: "update_table",
          description: "Update a table's schema",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table to update",
              },
              name: {
                type: "string",
                description: "New name for the table",
              },
              description: {
                type: "string",
                description: "New description for the table",
              },
            },
            required: ["base_id", "table_id"],
          },
        },
        {
          name: "create_field",
          description: "Create a new field in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
              field: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Name of the field",
                  },
                  type: {
                    type: "string",
                    description: "Type of the field",
                  },
                  description: {
                    type: "string",
                    description: "Description of the field",
                  },
                  options: {
                    type: "object",
                    description: "Field-specific options",
                  },
                },
                required: ["name", "type"],
              },
            },
            required: ["base_id", "table_id", "field"],
          },
        },
        {
          name: "update_field",
          description: "Update a field in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
              field_id: {
                type: "string",
                description: "ID of the field to update",
              },
              updates: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "New name for the field",
                  },
                  description: {
                    type: "string",
                    description: "New description for the field",
                  },
                  options: {
                    type: "object",
                    description: "New field-specific options",
                  },
                },
              },
            },
            required: ["base_id", "table_id", "field_id", "updates"],
          },
        },
        {
          name: "list_records",
          description: "List records in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              max_records: {
                type: "number",
                description: "Maximum number of records to return",
              },
            },
            required: ["base_id", "table_name"],
          },
        },
        {
          name: "create_record",
          description: "Create a new record in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              fields: {
                type: "object",
                description: "Record fields as key-value pairs",
              },
            },
            required: ["base_id", "table_name", "fields"],
          },
        },
        {
          name: "update_record",
          description: "Update an existing record in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              record_id: {
                type: "string",
                description: "ID of the record to update",
              },
              fields: {
                type: "object",
                description: "Record fields to update as key-value pairs",
              },
            },
            required: ["base_id", "table_name", "record_id", "fields"],
          },
        },
        {
          name: "delete_record",
          description: "Delete a record from a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              record_id: {
                type: "string",
                description: "ID of the record to delete",
              },
            },
            required: ["base_id", "table_name", "record_id"],
          },
        },
        {
          name: "search_records",
          description: "Search for records in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              field_name: {
                type: "string",
                description: "Name of the field to search in",
              },
              value: {
                type: "string",
                description: "Value to search for",
              },
            },
            required: ["base_id", "table_name", "field_name", "value"],
          },
        },
        {
          name: "get_record",
          description: "Get a single record by its ID",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              record_id: {
                type: "string",
                description: "ID of the record to retrieve",
              },
            },
            required: ["base_id", "table_name", "record_id"],
          },
        },
        // Base Schema Operations
        {
          name: "get_base_schema",
          description: "Get complete base schema including all tables and fields",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
            },
            required: ["base_id"],
          },
        },
        {
          name: "delete_base",
          description: "Delete a base (Enterprise only)",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base to delete",
              },
            },
            required: ["base_id"],
          },
        },
        // Advanced Record Operations
        {
          name: "batch_create_records",
          description: "Create multiple records in a single request",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              records: {
                type: "array",
                description: "Array of records to create",
                items: {
                  type: "object",
                  properties: {
                    fields: {
                      type: "object",
                      description: "Record fields as key-value pairs",
                    },
                  },
                  required: ["fields"],
                },
              },
              typecast: {
                type: "boolean",
                description: "Automatically convert field types",
              },
            },
            required: ["base_id", "table_name", "records"],
          },
        },
        {
          name: "batch_update_records",
          description: "Update multiple records in a single request",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              records: {
                type: "array",
                description: "Array of records to update",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Record ID",
                    },
                    fields: {
                      type: "object",
                      description: "Record fields to update",
                    },
                  },
                  required: ["id", "fields"],
                },
              },
              typecast: {
                type: "boolean",
                description: "Automatically convert field types",
              },
            },
            required: ["base_id", "table_name", "records"],
          },
        },
        {
          name: "batch_delete_records",
          description: "Delete multiple records in a single request",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              record_ids: {
                type: "array",
                description: "Array of record IDs to delete",
                items: {
                  type: "string",
                },
              },
            },
            required: ["base_id", "table_name", "record_ids"],
          },
        },
        {
          name: "advanced_list_records",
          description: "List records with advanced filtering, sorting, and pagination",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_name: {
                type: "string",
                description: "Name of the table",
              },
              filter_by_formula: {
                type: "string",
                description: "Airtable formula to filter records",
              },
              sort: {
                type: "array",
                description: "Sort configuration",
                items: {
                  type: "object",
                  properties: {
                    field: {
                      type: "string",
                      description: "Field name to sort by",
                    },
                    direction: {
                      type: "string",
                      enum: ["asc", "desc"],
                      description: "Sort direction",
                    },
                  },
                  required: ["field"],
                },
              },
              max_records: {
                type: "number",
                description: "Maximum number of records to return",
              },
              page_size: {
                type: "number",
                description: "Number of records per page (max 100)",
              },
              view: {
                type: "string",
                description: "Name or ID of view to use",
              },
              fields: {
                type: "array",
                description: "Specific fields to return",
                items: {
                  type: "string",
                },
              },
              cell_format: {
                type: "string",
                enum: ["json", "string"],
                description: "Format for cell values",
              },
              time_zone: {
                type: "string",
                description: "Time zone for date/time fields",
              },
              user_locale: {
                type: "string",
                description: "User locale for formatting",
              },
              offset: {
                type: "string",
                description: "Pagination offset token",
              },
            },
            required: ["base_id", "table_name"],
          },
        },
        // View Management
        {
          name: "list_views",
          description: "List all views in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
            },
            required: ["base_id", "table_id"],
          },
        },
        {
          name: "get_view",
          description: "Get view configuration",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
              view_id: {
                type: "string",
                description: "ID of the view",
              },
            },
            required: ["base_id", "table_id", "view_id"],
          },
        },
        {
          name: "create_view",
          description: "Create a new view in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
              view: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Name of the view",
                  },
                  type: {
                    type: "string",
                    enum: ["grid", "form", "calendar", "gallery", "kanban", "timeline", "gantt"],
                    description: "Type of view",
                  },
                  visible_field_ids: {
                    type: "array",
                    description: "Array of field IDs to show in view",
                    items: {
                      type: "string",
                    },
                  },
                  filter_by_formula: {
                    type: "string",
                    description: "Formula to filter records in view",
                  },
                  sort_fields: {
                    type: "array",
                    description: "Sort configuration for view",
                    items: {
                      type: "object",
                      properties: {
                        field_id: {
                          type: "string",
                          description: "Field ID to sort by",
                        },
                        direction: {
                          type: "string",
                          enum: ["asc", "desc"],
                          description: "Sort direction",
                        },
                      },
                      required: ["field_id"],
                    },
                  },
                },
                required: ["name", "type"],
              },
            },
            required: ["base_id", "table_id", "view"],
          },
        },
        {
          name: "update_view",
          description: "Update an existing view",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
              view_id: {
                type: "string",
                description: "ID of the view to update",
              },
              updates: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "New name for the view",
                  },
                  visible_field_ids: {
                    type: "array",
                    description: "Array of field IDs to show in view",
                    items: {
                      type: "string",
                    },
                  },
                  filter_by_formula: {
                    type: "string",
                    description: "Formula to filter records in view",
                  },
                  sort_fields: {
                    type: "array",
                    description: "Sort configuration for view",
                    items: {
                      type: "object",
                      properties: {
                        field_id: {
                          type: "string",
                          description: "Field ID to sort by",
                        },
                        direction: {
                          type: "string",
                          enum: ["asc", "desc"],
                          description: "Sort direction",
                        },
                      },
                      required: ["field_id"],
                    },
                  },
                },
              },
            },
            required: ["base_id", "table_id", "view_id", "updates"],
          },
        },
        {
          name: "delete_view",
          description: "Delete a view from a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
              view_id: {
                type: "string",
                description: "ID of the view to delete",
              },
            },
            required: ["base_id", "table_id", "view_id"],
          },
        },
        // Field Management
        {
          name: "list_fields",
          description: "List all fields in a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
            },
            required: ["base_id", "table_id"],
          },
        },
        {
          name: "delete_field",
          description: "Delete a field from a table",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              table_id: {
                type: "string",
                description: "ID of the table",
              },
              field_id: {
                type: "string",
                description: "ID of the field to delete",
              },
            },
            required: ["base_id", "table_id", "field_id"],
          },
        },
        // Webhook Management
        {
          name: "list_webhooks",
          description: "List all webhooks for a base",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
            },
            required: ["base_id"],
          },
        },
        {
          name: "create_webhook",
          description: "Create a new webhook for real-time notifications",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              notification_url: {
                type: "string",
                description: "URL to receive webhook notifications",
              },
              specification: {
                type: "object",
                properties: {
                  options: {
                    type: "object",
                    properties: {
                      filters: {
                        type: "object",
                        properties: {
                          data_types: {
                            type: "array",
                            description: "Types of data changes to monitor",
                            items: {
                              type: "string",
                              enum: ["tableData", "tableSchema", "tableMetadata"],
                            },
                          },
                          record_change_scope: {
                            type: "string",
                            description: "Table ID to monitor for record changes",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            required: ["base_id", "notification_url", "specification"],
          },
        },
        {
          name: "update_webhook",
          description: "Update an existing webhook",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              webhook_id: {
                type: "string",
                description: "ID of the webhook to update",
              },
              updates: {
                type: "object",
                properties: {
                  notification_url: {
                    type: "string",
                    description: "New URL to receive webhook notifications",
                  },
                  specification: {
                    type: "object",
                    description: "Updated webhook specification",
                  },
                },
              },
            },
            required: ["base_id", "webhook_id", "updates"],
          },
        },
        {
          name: "delete_webhook",
          description: "Delete a webhook",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              webhook_id: {
                type: "string",
                description: "ID of the webhook to delete",
              },
            },
            required: ["base_id", "webhook_id"],
          },
        },
        {
          name: "get_webhook_payloads",
          description: "Get webhook notification history",
          inputSchema: {
            type: "object",
            properties: {
              base_id: {
                type: "string",
                description: "ID of the base",
              },
              webhook_id: {
                type: "string",
                description: "ID of the webhook",
              },
              cursor: {
                type: "string",
                description: "Pagination cursor",
              },
              limit: {
                type: "number",
                description: "Number of payloads to return",
              },
            },
            required: ["base_id", "webhook_id"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const toolName = request.params.name;
      const requestKey = `${toolName}_${JSON.stringify(request.params.arguments)}`;
      
      // Track request count to detect potential infinite loops
      const currentCount = this.requestCount.get(requestKey) || 0;
      this.requestCount.set(requestKey, currentCount + 1);
      
      // Log the request for debugging (to stderr to avoid interfering with JSON-RPC)
      console.error(`[MCP] Tool called: ${toolName} (count: ${currentCount + 1})`);
      
      // Clear old request counts periodically
      if (this.requestCount.size > 100) {
        this.requestCount.clear();
      }

      try {
        switch (request.params.name) {
          case "list_bases": {
            const response = await this.axiosInstance.get("/meta/bases");
            return this.formatListResponse(response.data.bases, "list_bases", "base");
          }

          case "list_tables": {
            const { base_id } = request.params.arguments as { base_id: string };
            const response = await this.axiosInstance.get(`/meta/bases/${base_id}/tables`);
            return this.formatListResponse(response.data.tables, "list_tables", "table", base_id);
          }

          case "create_table": {
            const { base_id, table_name, description, fields } = request.params.arguments as {
              base_id: string;
              table_name: string;
              description?: string;
              fields?: FieldOption[];
            };
            
            // Validate and prepare fields
            const validatedFields = fields?.map(field => this.validateField(field));
            
            const response = await this.axiosInstance.post(`/meta/bases/${base_id}/tables`, {
              name: table_name,
              description,
              fields: validatedFields,
            });
            
            return this.formatSuccessResponse(response.data, "create_table");
          }

          case "update_table": {
            const { base_id, table_id, name, description } = request.params.arguments as {
              base_id: string;
              table_id: string;
              name?: string;
              description?: string;
            };
            
            const response = await this.axiosInstance.patch(`/meta/bases/${base_id}/tables/${table_id}`, {
              name,
              description,
            });
            
            return this.formatSuccessResponse(response.data, "update_table");
          }

          case "create_field": {
            const { base_id, table_id, field } = request.params.arguments as {
              base_id: string;
              table_id: string;
              field: FieldOption;
            };
            
            // Validate field before creation
            const validatedField = this.validateField(field);
            
            const response = await this.axiosInstance.post(
              `/meta/bases/${base_id}/tables/${table_id}/fields`,
              validatedField
            );
            
            return this.formatSuccessResponse(response.data, "create_field");
          }

          case "update_field": {
            const { base_id, table_id, field_id, updates } = request.params.arguments as {
              base_id: string;
              table_id: string;
              field_id: string;
              updates: Partial<FieldOption>;
            };
            
            const response = await this.axiosInstance.patch(
              `/meta/bases/${base_id}/tables/${table_id}/fields/${field_id}`,
              updates
            );
            
            return this.formatSuccessResponse(response.data, "update_field");
          }

          case "list_records": {
            const { base_id, table_name, max_records } = request.params.arguments as {
              base_id: string;
              table_name: string;
              max_records?: number;
            };
            const response = await this.axiosInstance.get(`/${base_id}/${table_name}`, {
              params: max_records ? { maxRecords: max_records } : undefined,
            });
            return this.formatRecordsResponse(response.data, "list_records", base_id, table_name);
          }

          case "create_record": {
            const { base_id, table_name, fields } = request.params.arguments as {
              base_id: string;
              table_name: string;
              fields: Record<string, any>;
            };
            const response = await this.axiosInstance.post(`/${base_id}/${table_name}`, {
              fields,
            });
            return this.formatSuccessResponse(response.data, "create_record");
          }

          case "update_record": {
            const { base_id, table_name, record_id, fields } = request.params.arguments as {
              base_id: string;
              table_name: string;
              record_id: string;
              fields: Record<string, any>;
            };
            const response = await this.axiosInstance.patch(
              `/${base_id}/${table_name}/${record_id}`,
              { fields }
            );
            return this.formatSuccessResponse(response.data, "update_record");
          }

          case "delete_record": {
            const { base_id, table_name, record_id } = request.params.arguments as {
              base_id: string;
              table_name: string;
              record_id: string;
            };
            const response = await this.axiosInstance.delete(
              `/${base_id}/${table_name}/${record_id}`
            );
            return this.formatSuccessResponse(response.data, "delete_record");
          }

          case "search_records": {
            const { base_id, table_name, field_name, value } = request.params.arguments as {
              base_id: string;
              table_name: string;
              field_name: string;
              value: string;
            };
            const response = await this.axiosInstance.get(`/${base_id}/${table_name}`, {
              params: {
                filterByFormula: `{${field_name}} = "${value}"`,
              },
            });
            return this.formatRecordsResponse(response.data, "search_records", base_id, table_name);
          }

          case "get_record": {
            const { base_id, table_name, record_id } = request.params.arguments as {
              base_id: string;
              table_name: string;
              record_id: string;
            };
            const response = await this.axiosInstance.get(
              `/${base_id}/${table_name}/${record_id}`
            );
            return this.formatSuccessResponse(response.data, "get_record");
          }

          // Base Schema Operations
          case "get_base_schema": {
            const { base_id } = request.params.arguments as { base_id: string };
            const response = await this.axiosInstance.get(`/meta/bases/${base_id}/tables`);
            return this.formatListResponse(response.data, "get_base_schema", "table");
          }

          case "delete_base": {
            const { base_id } = request.params.arguments as { base_id: string };
            const response = await this.axiosInstance.delete(`/meta/bases/${base_id}`);
            return this.formatSuccessResponse(response.data, "delete_base");
          }

          // Advanced Record Operations
          case "batch_create_records": {
            const { base_id, table_name, records, typecast } = request.params.arguments as {
              base_id: string;
              table_name: string;
              records: Array<{ fields: Record<string, any> }>;
              typecast?: boolean;
            };
            const response = await this.axiosInstance.post(`/${base_id}/${table_name}`, {
              records,
              typecast,
            });
            return this.formatSuccessResponse(response.data, "batch_create_records");
          }

          case "batch_update_records": {
            const { base_id, table_name, records, typecast } = request.params.arguments as {
              base_id: string;
              table_name: string;
              records: Array<{ id: string; fields: Record<string, any> }>;
              typecast?: boolean;
            };
            const response = await this.axiosInstance.patch(`/${base_id}/${table_name}`, {
              records,
              typecast,
            });
            return this.formatSuccessResponse(response.data, "batch_update_records");
          }

          case "batch_delete_records": {
            const { base_id, table_name, record_ids } = request.params.arguments as {
              base_id: string;
              table_name: string;
              record_ids: string[];
            };
            const response = await this.axiosInstance.delete(`/${base_id}/${table_name}`, {
              params: { records: record_ids },
            });
            return this.formatSuccessResponse(response.data, "batch_delete_records");
          }

          case "advanced_list_records": {
            const { 
              base_id, 
              table_name, 
              filter_by_formula,
              sort,
              max_records,
              page_size,
              view,
              fields,
              cell_format,
              time_zone,
              user_locale,
              offset
            } = request.params.arguments as {
              base_id: string;
              table_name: string;
              filter_by_formula?: string;
              sort?: Array<{ field: string; direction?: string }>;
              max_records?: number;
              page_size?: number;
              view?: string;
              fields?: string[];
              cell_format?: string;
              time_zone?: string;
              user_locale?: string;
              offset?: string;
            };

            const params: Record<string, any> = {};
            if (filter_by_formula) params.filterByFormula = filter_by_formula;
            if (sort) params.sort = sort;
            if (max_records) params.maxRecords = max_records;
            if (page_size) params.pageSize = page_size;
            if (view) params.view = view;
            if (fields) params.fields = fields;
            if (cell_format) params.cellFormat = cell_format;
            if (time_zone) params.timeZone = time_zone;
            if (user_locale) params.userLocale = user_locale;
            if (offset) params.offset = offset;

            const response = await this.axiosInstance.get(`/${base_id}/${table_name}`, { params });
            return this.formatRecordsResponse(response.data, "advanced_list_records", base_id, table_name);
          }

          // View Management
          case "list_views": {
            const { base_id, table_id } = request.params.arguments as {
              base_id: string;
              table_id: string;
            };
            const response = await this.axiosInstance.get(`/meta/bases/${base_id}/tables/${table_id}/views`);
            return this.formatListResponse(response.data, "list_views", "view");
          }

          case "get_view": {
            const { base_id, table_id, view_id } = request.params.arguments as {
              base_id: string;
              table_id: string;
              view_id: string;
            };
            const response = await this.axiosInstance.get(`/meta/bases/${base_id}/tables/${table_id}/views/${view_id}`);
            return this.formatSuccessResponse(response.data, "get_view");
          }

          case "create_view": {
            const { base_id, table_id, view } = request.params.arguments as {
              base_id: string;
              table_id: string;
              view: Record<string, any>;
            };
            const response = await this.axiosInstance.post(`/meta/bases/${base_id}/tables/${table_id}/views`, view);
            return this.formatSuccessResponse(response.data, "create_view");
          }

          case "update_view": {
            const { base_id, table_id, view_id, updates } = request.params.arguments as {
              base_id: string;
              table_id: string;
              view_id: string;
              updates: Record<string, any>;
            };
            const response = await this.axiosInstance.patch(`/meta/bases/${base_id}/tables/${table_id}/views/${view_id}`, updates);
            return this.formatSuccessResponse(response.data, "update_view");
          }

          case "delete_view": {
            const { base_id, table_id, view_id } = request.params.arguments as {
              base_id: string;
              table_id: string;
              view_id: string;
            };
            const response = await this.axiosInstance.delete(`/meta/bases/${base_id}/tables/${table_id}/views/${view_id}`);
            return this.formatSuccessResponse(response.data, "delete_view");
          }

          // Field Management
          case "list_fields": {
            const { base_id, table_id } = request.params.arguments as {
              base_id: string;
              table_id: string;
            };
            const response = await this.axiosInstance.get(`/meta/bases/${base_id}/tables/${table_id}/fields`);
            return this.formatListResponse(response.data, "list_fields", "field", base_id);
          }

          case "delete_field": {
            const { base_id, table_id, field_id } = request.params.arguments as {
              base_id: string;
              table_id: string;
              field_id: string;
            };
            const response = await this.axiosInstance.delete(`/meta/bases/${base_id}/tables/${table_id}/fields/${field_id}`);
            return this.formatSuccessResponse(response.data, "delete_field");
          }

          // Webhook Management
          case "list_webhooks": {
            const { base_id } = request.params.arguments as { base_id: string };
            const response = await this.axiosInstance.get(`/bases/${base_id}/webhooks`);
            return this.formatListResponse(response.data, "list_webhooks", "webhook");
          }

          case "create_webhook": {
            const { base_id, notification_url, specification } = request.params.arguments as {
              base_id: string;
              notification_url: string;
              specification: Record<string, any>;
            };
            const response = await this.axiosInstance.post(`/bases/${base_id}/webhooks`, {
              notificationUrl: notification_url,
              specification,
            });
            return this.formatSuccessResponse(response.data, "create_webhook");
          }

          case "update_webhook": {
            const { base_id, webhook_id, updates } = request.params.arguments as {
              base_id: string;
              webhook_id: string;
              updates: Record<string, any>;
            };
            const response = await this.axiosInstance.patch(`/bases/${base_id}/webhooks/${webhook_id}`, updates);
            return this.formatSuccessResponse(response.data, "update_webhook");
          }

          case "delete_webhook": {
            const { base_id, webhook_id } = request.params.arguments as {
              base_id: string;
              webhook_id: string;
            };
            const response = await this.axiosInstance.delete(`/bases/${base_id}/webhooks/${webhook_id}`);
            return this.formatSuccessResponse(response.data, "delete_webhook");
          }

          case "get_webhook_payloads": {
            const { base_id, webhook_id, cursor, limit } = request.params.arguments as {
              base_id: string;
              webhook_id: string;
              cursor?: string;
              limit?: number;
            };
            const params: Record<string, any> = {};
            if (cursor) params.cursor = cursor;
            if (limit) params.limit = limit;

            const response = await this.axiosInstance.get(`/bases/${base_id}/webhooks/${webhook_id}/payloads`, { params });
            return this.formatListResponse(response.data, "get_webhook_payloads", "payload");
          }

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return this.formatErrorResponse(
            error.response?.data?.error?.message ?? error.message,
            request.params.name
          );
        }
        return this.formatErrorResponse(error, request.params.name);
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Airtable MCP server running on stdio");
  }
}

const server = new AirtableServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
