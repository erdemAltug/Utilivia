import { MetadataRoute } from 'next'

const allUnits = [
  // Length
  { symbol: 'mm', category: 'length' },
  { symbol: 'cm', category: 'length' },
  { symbol: 'meter', category: 'length' },
  { symbol: 'km', category: 'length' },
  { symbol: 'inch', category: 'length' },
  { symbol: 'ft', category: 'length' },
  { symbol: 'yard', category: 'length' },
  { symbol: 'mile', category: 'length' },
  
  // Weight  
  { symbol: 'gram', category: 'weight' },
  { symbol: 'kg', category: 'weight' },
  { symbol: 'oz', category: 'weight' },
  { symbol: 'lb', category: 'weight' },
  { symbol: 'stone', category: 'weight' },
  { symbol: 'ton', category: 'weight' },
  
  // Temperature
  { symbol: 'celsius', category: 'temperature' },
  { symbol: 'fahrenheit', category: 'temperature' },
  { symbol: 'kelvin', category: 'temperature' },
  
  // Volume
  { symbol: 'ml', category: 'volume' },
  { symbol: 'liter', category: 'volume' },
  { symbol: 'floz', category: 'volume' },
  { symbol: 'cup', category: 'volume' },
  { symbol: 'pint', category: 'volume' },
  { symbol: 'quart', category: 'volume' },
  { symbol: 'gallon', category: 'volume' }
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utilivia.com'
  
  const tools = [
    'bmi-calculator',
    'age-calculator',
    'unit-converter',
    'text-case-converter',
    'lorem-generator',
    'password-generator',
    'base64-encoder'
  ]

  const toolUrls = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Generate conversion URLs
  const conversionUrls: MetadataRoute.Sitemap = []
  
  for (const fromUnit of allUnits) {
    for (const toUnit of allUnits) {
      if (fromUnit.category === toUnit.category && fromUnit.symbol !== toUnit.symbol) {
        conversionUrls.push({
          url: `${baseUrl}/tools/unit-converter/${fromUnit.symbol}/to/${toUnit.symbol}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7
        })
      }
    }
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...toolUrls,
    ...conversionUrls
  ]
} 