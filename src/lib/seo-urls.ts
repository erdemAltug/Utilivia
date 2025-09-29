// SEO URL yapılandırması ve yardımcı fonksiyonlar

interface URLTemplate {
  path: string;
  params: string[];
  description: string;
  category: string;
}

interface ToolConfig {
  id: string;
  name: string;
  category: string;
  urlTemplates: URLTemplate[];
  popularValues: Record<string, any[]>;
}

// Araç bazlı SEO URL yapılandırması
export const SEO_TOOL_CONFIGS: ToolConfig[] = [
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'Health',
    urlTemplates: [
      {
        path: '/tools/bmi-calculator/[height]/[weight]',
        params: ['height', 'weight'],
        description: 'Calculate BMI for specific height and weight',
        category: 'health'
      },
      {
        path: '/tools/bmi-calculator/[height]-cm-[weight]-kg',
        params: ['height', 'weight'],
        description: 'Calculate BMI with metric units in URL',
        category: 'health'
      },
      {
        path: '/tools/bmi-calculator/[height]-in-[weight]-lbs',
        params: ['height', 'weight'],
        description: 'Calculate BMI with imperial units in URL',
        category: 'health'
      }
    ],
    popularValues: {
      height: [150, 155, 160, 165, 170, 175, 180, 185, 190],
      weight: [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120]
    }
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    category: 'Date & Time',
    urlTemplates: [
      {
        path: '/tools/age-calculator/[year]/[month]/[day]',
        params: ['year', 'month', 'day'],
        description: 'Calculate age for specific birth date',
        category: 'date'
      },
      {
        path: '/tools/age-calculator/[year]-[month]-[day]',
        params: ['year', 'month', 'day'],
        description: 'Calculate age with dashed date format',
        category: 'date'
      }
    ],
    popularValues: {
      year: Array.from({ length: 100 }, (_, i) => 2025 - i),
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: [1, 5, 10, 15, 20, 25, 28, 30]
    }
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    category: 'Math & Conversion',
    urlTemplates: [
      {
        path: '/tools/unit-converter/[from]/to/[to]/[value]',
        params: ['from', 'to', 'value'],
        description: 'Convert value from one unit to another',
        category: 'conversion'
      },
      {
        path: '/tools/unit-converter/[value]-[from]-to-[to]',
        params: ['from', 'to', 'value'],
        description: 'Convert with readable format',
        category: 'conversion'
      }
    ],
    popularValues: {
      from: ['meter', 'centimeter', 'kilogram', 'gram', 'celsius', 'fahrenheit'],
      to: ['foot', 'inch', 'pound', 'ounce', 'fahrenheit', 'celsius'],
      value: [1, 5, 10, 25, 50, 100, 500, 1000]
    }
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    category: 'Finance',
    urlTemplates: [
      {
        path: '/tools/currency-converter/[from]/to/[to]/[amount]',
        params: ['from', 'to', 'amount'],
        description: 'Convert currency amount from one to another',
        category: 'finance'
      }
    ],
    popularValues: {
      from: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'],
      to: ['EUR', 'USD', 'GBP', 'JPY', 'CAD', 'AUD'],
      amount: [1, 10, 50, 100, 500, 1000, 5000]
    }
  },
  {
    id: 'timezone-converter',
    name: 'Timezone Converter',
    category: 'Date & Time',
    urlTemplates: [
      {
        path: '/tools/timezone-converter/[from]/to/[to]/[datetime]',
        params: ['from', 'to', 'datetime'],
        description: 'Convert datetime between timezones',
        category: 'date'
      }
    ],
    popularValues: {
      from: ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'],
      to: ['Europe/London', 'America/New_York', 'Asia/Tokyo', 'Australia/Sydney'],
      datetime: ['2023-01-01T12:00', '2023-06-15T18:30', '2023-12-25T09:00']
    }
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Developer Tools',
    urlTemplates: [
      {
        path: '/tools/json-formatter/format',
        params: [],
        description: 'Format JSON data',
        category: 'development'
      }
    ],
    popularValues: {}
  },
  {
    id: 'ip-lookup',
    name: 'IP Address Lookup',
    category: 'Network Tools',
    urlTemplates: [
      {
        path: '/tools/ip-lookup/[ip]',
        params: ['ip'],
        description: 'Lookup information for IP address',
        category: 'network'
      }
    ],
    popularValues: {
      ip: ['8.8.8.8', '1.1.1.1', '216.58.214.14']
    }
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    category: 'Marketing',
    urlTemplates: [
      {
        path: '/tools/qr-generator/create/[text]',
        params: ['text'],
        description: 'Generate QR code for text or URL',
        category: 'marketing'
      }
    ],
    popularValues: {
      text: ['https://utilivia.com', 'Hello World', 'Contact:vCard']
    }
  }
];

// Slug oluşturma fonksiyonu
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// SEO dostu URL oluşturma fonksiyonu
export function generateSEOURL(template: string, params: Record<string, string>): string {
  let url = template;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`[${key}]`, encodeURIComponent(value.toString()));
  }
  return url;
}

// Popüler URL kombinasyonları oluşturma
export function generatePopularURLs(toolId: string, limit: number = 50): string[] {
  const toolConfig = SEO_TOOL_CONFIGS.find(t => t.id === toolId);
  if (!toolConfig) return [];

  const urls: string[] = [];
  
  // Basit araçlar için doğrudan kombinasyon
  if (toolId === 'bmi-calculator') {
    const heights = toolConfig.popularValues.height.slice(0, 10);
    const weights = toolConfig.popularValues.weight.slice(0, 10);
    
    for (const height of heights) {
      for (const weight of weights) {
        if (urls.length >= limit) break;
        urls.push(`/tools/bmi-calculator/${height}/${weight}`);
        urls.push(`/tools/bmi-calculator/${height}-cm-${weight}-kg`);
      }
      if (urls.length >= limit) break;
    }
  }
  
  if (toolId === 'age-calculator') {
    const years = toolConfig.popularValues.year.slice(0, 20);
    const months = toolConfig.popularValues.month.slice(0, 6);
    const days = toolConfig.popularValues.day.slice(0, 4);
    
    for (const year of years) {
      for (const month of months) {
        for (const day of days) {
          if (urls.length >= limit) break;
          urls.push(`/tools/age-calculator/${year}/${month}/${day}`);
          urls.push(`/tools/age-calculator/${year}-${month}-${day}`);
        }
        if (urls.length >= limit) break;
      }
      if (urls.length >= limit) break;
    }
  }
  
  if (toolId === 'unit-converter') {
    const fromUnits = toolConfig.popularValues.from.slice(0, 4);
    const toUnits = toolConfig.popularValues.to.slice(0, 4);
    const values = toolConfig.popularValues.value.slice(0, 5);
    
    for (const from of fromUnits) {
      for (const to of toUnits) {
        for (const value of values) {
          if (urls.length >= limit) break;
          urls.push(`/tools/unit-converter/${from}/to/${to}/${value}`);
          urls.push(`/tools/unit-converter/${value}-${from}-to-${to}`);
        }
        if (urls.length >= limit) break;
      }
      if (urls.length >= limit) break;
    }
  }
  
  if (toolId === 'currency-converter') {
    const fromCurrencies = toolConfig.popularValues.from.slice(0, 4);
    const toCurrencies = toolConfig.popularValues.to.slice(0, 4);
    const amounts = toolConfig.popularValues.amount.slice(0, 5);
    
    for (const from of fromCurrencies) {
      for (const to of toCurrencies) {
        for (const amount of amounts) {
          if (urls.length >= limit) break;
          urls.push(`/tools/currency-converter/${from}/to/${to}/${amount}`);
        }
        if (urls.length >= limit) break;
      }
      if (urls.length >= limit) break;
    }
  }
  
  if (toolId === 'timezone-converter') {
    const fromTimezones = toolConfig.popularValues.from.slice(0, 3);
    const toTimezones = toolConfig.popularValues.to.slice(0, 3);
    const datetimes = toolConfig.popularValues.datetime.slice(0, 2);
    
    for (const from of fromTimezones) {
      for (const to of toTimezones) {
        for (const datetime of datetimes) {
          if (urls.length >= limit) break;
          urls.push(`/tools/timezone-converter/${from}/to/${to}/${encodeURIComponent(datetime)}`);
        }
        if (urls.length >= limit) break;
      }
      if (urls.length >= limit) break;
    }
  }
  
  if (toolId === 'ip-lookup') {
    const ips = toolConfig.popularValues.ip.slice(0, 3);
    
    for (const ip of ips) {
      if (urls.length >= limit) break;
      urls.push(`/tools/ip-lookup/${ip}`);
    }
  }
  
  if (toolId === 'qr-generator') {
    const texts = toolConfig.popularValues.text.slice(0, 3);
    
    for (const text of texts) {
      if (urls.length >= limit) break;
      urls.push(`/tools/qr-generator/create/${encodeURIComponent(text)}`);
    }
  }
  
  return urls.slice(0, limit);
}

// Kategori bazlı URL oluşturma
export function generateCategoryURLs(category: string, limit: number = 20): string[] {
  const urls: string[] = [];
  
  SEO_TOOL_CONFIGS
    .filter(tool => tool.category.toLowerCase().includes(category.toLowerCase()))
    .forEach(tool => {
      const toolUrls = generatePopularURLs(tool.id, Math.ceil(limit / 3));
      urls.push(...toolUrls);
    });
  
  return urls.slice(0, limit);
}

// Tüm araçlar için SEO URL'leri oluşturma
export function generateAllSEOURLs(limitPerTool: number = 30): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  
  SEO_TOOL_CONFIGS.forEach(tool => {
    result[tool.id] = generatePopularURLs(tool.id, limitPerTool);
  });
  
  return result;
}