// Field type definitions for Airtable - Comprehensive Web API Support

export type FieldType =
  // Basic Fields (No Options Required)
  | 'singleLineText'
  | 'multilineText'
  | 'email'
  | 'phoneNumber'
  | 'richText'
  | 'url'
  
  // Numeric Fields
  | 'number'
  | 'currency'
  | 'percent'
  
  // Date/Time Fields
  | 'date'
  | 'dateTime'
  | 'duration'
  
  // Selection Fields
  | 'singleSelect'
  | 'multipleSelects'
  
  // Interactive Fields
  | 'rating'
  | 'checkbox'
  
  // Advanced Fields
  | 'formula'
  | 'rollup'
  | 'lookup'
  | 'multipleRecordLinks'
  
  // Specialized Fields
  | 'attachment'
  | 'barcode'
  | 'button'
  | 'count'
  | 'autoNumber'
  
  // Legacy/Alternative names
  | 'multiSelect'; // Alternative name for multipleSelects

export interface FieldOption {
  name: string;
  type: FieldType;
  description?: string;
  options?: Record<string, any>;
}

// Enhanced field validation
export const fieldRequiresOptions = (type: FieldType): boolean => {
  switch (type) {
    // Numeric fields
    case 'number':
    case 'currency':
    case 'percent':
    
    // Date/Time fields
    case 'date':
    case 'dateTime':
    case 'duration':
    
    // Selection fields
    case 'singleSelect':
    case 'multipleSelects':
    case 'multiSelect':
    
    // Interactive fields
    case 'rating':
    case 'checkbox':
    
    // Advanced fields
    case 'formula':
    case 'rollup':
    case 'lookup':
    case 'multipleRecordLinks':
    
    // Specialized fields
    case 'barcode':
    case 'button':
    case 'count':
      return true;
      
    // Basic fields and auto fields
    case 'singleLineText':
    case 'multilineText':
    case 'email':
    case 'phoneNumber':
    case 'richText':
    case 'url':
    case 'attachment':
    case 'autoNumber':
    default:
      return false;
  }
};

// Comprehensive default options for each field type
export const getDefaultOptions = (type: FieldType): Record<string, any> | undefined => {
  switch (type) {
    case 'number':
      return { precision: 0 };
      
    case 'currency':
      return { precision: 2, symbol: '$' };
      
    case 'percent':
      return { precision: 2 };
      
    case 'date':
      return { 
        dateFormat: { name: 'local' }
      };
      
    case 'dateTime':
      return { 
        dateFormat: { name: 'local' },
        timeFormat: { name: '12hour' },
        timeZone: 'client'
      };
      
    case 'duration':
      return { 
        durationFormat: 'h:mm'
      };
      
    case 'singleSelect':
    case 'multipleSelects':
    case 'multiSelect':
      return { 
        choices: [
          { name: 'Option 1', color: 'blueBright' },
          { name: 'Option 2', color: 'greenBright' }
        ]
      };
      
    case 'rating':
      return { 
        max: 5,
        color: 'yellowBright',
        icon: 'star'
      };
      
    case 'checkbox':
      return { 
        color: 'greenBright',
        icon: 'check'
      };
      
    case 'barcode':
      return { 
        result: { type: 'text' }
      };
      
    case 'button':
      return { 
        label: 'Click Me',
        url: 'https://example.com'
      };
      
    case 'autoNumber':
      return {};
      
    default:
      return undefined;
  }
};

// Field validation helpers
export const validateFieldOptions = (type: FieldType, options: Record<string, any>): boolean => {
  switch (type) {
    case 'number':
    case 'currency':
    case 'percent':
      return options.precision !== undefined && 
             typeof options.precision === 'number' && 
             options.precision >= 0 && 
             options.precision <= 8;
             
    case 'currency':
      return options.symbol !== undefined && typeof options.symbol === 'string';
      
    case 'rating':
      return options.max !== undefined && 
             typeof options.max === 'number' && 
             options.max >= 1 && 
             options.max <= 10;
             
    case 'singleSelect':
    case 'multipleSelects':
    case 'multiSelect':
      return options.choices !== undefined && 
             Array.isArray(options.choices) && 
             options.choices.length > 0;
             
    case 'formula':
      return options.formula !== undefined && typeof options.formula === 'string';
      
    case 'rollup':
      return options.linkedRecordFieldId !== undefined && 
             options.recordLinkFieldId !== undefined &&
             options.aggregationFunction !== undefined;
             
    case 'lookup':
      return options.linkedRecordFieldId !== undefined && 
             options.recordLinkFieldId !== undefined;
             
    case 'multipleRecordLinks':
      return options.linkedTableId !== undefined;
      
    case 'count':
      return options.linkedRecordFieldId !== undefined;
      
    default:
      return true;
  }
};

// Available colors for choice fields
export const AIRTABLE_COLORS = [
  'blueBright', 'greenBright', 'redBright', 'yellowBright', 
  'pinkBright', 'purpleBright', 'cyanBright', 'grayBright',
  'blueLight', 'greenLight', 'redLight', 'yellowLight',
  'pinkLight', 'purpleLight', 'cyanLight', 'grayLight'
] as const;

// Available icons for rating fields
export const RATING_ICONS = ['star', 'heart', 'thumbsUp', 'flag', 'dot'] as const;

// Available date formats
export const DATE_FORMATS = ['local', 'friendly', 'us', 'european', 'iso'] as const;

// Available time formats
export const TIME_FORMATS = ['12hour', '24hour'] as const;

// Available duration formats
export const DURATION_FORMATS = [
  'h:mm', 'h:mm:ss', 'h:mm:ss.s', 'h:mm:ss.ss', 'h:mm:ss.sss'
] as const;

// Rollup aggregation functions
export const ROLLUP_FUNCTIONS = [
  'SUM', 'COUNT', 'MAX', 'MIN', 'AVERAGE', 'MEDIAN', 'MODE',
  'CONCATENATE', 'ARRAYUNIQUE', 'ARRAYJOIN', 'ARRAYCOMPACT'
] as const;
