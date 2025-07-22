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

  // Generate BMI Calculator URLs
  const bmiUrls: MetadataRoute.Sitemap = []
  
  // Metric combinations (cm/kg)
  const metricHeights = [150, 155, 160, 165, 170, 175, 180, 185, 190, 195]
  const metricWeights = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110]
  
  for (const height of metricHeights) {
    for (const weight of metricWeights) {
      bmiUrls.push({
        url: `${baseUrl}/tools/bmi-calculator/${height}/${weight}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8
      })
    }
  }

  // Imperial combinations (feet-inches/lbs)
  const imperialHeights = [
    '4-10', '4-11', '5-0', '5-1', '5-2', '5-3', '5-4', '5-5', 
    '5-6', '5-7', '5-8', '5-9', '5-10', '5-11', '6-0', '6-1', 
    '6-2', '6-3', '6-4'
  ]
  const imperialWeights = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250]
  
  for (const height of imperialHeights) {
    for (const weight of imperialWeights) {
      bmiUrls.push({
        url: `${baseUrl}/tools/bmi-calculator/${height}/${weight}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8
      })
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
    ...conversionUrls,
    ...bmiUrls
  ]
} 