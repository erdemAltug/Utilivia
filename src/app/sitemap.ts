import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utilivia.com'
  
  const tools = [
    'bmi-calculator',
    'age-calculator',
    'unit-converter',
    'timezone-converter',
    'currency-converter',
    'text-case-converter',
    'json-formatter',
    'ip-lookup',
    'lorem-generator',
    'qr-generator',
    'password-generator',
    'base64-encoder'
  ]

  const toolUrls = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...toolUrls
  ]
} 