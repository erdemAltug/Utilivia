import { MetadataRoute } from 'next';
import { generateAllSEOURLs } from '@/lib/seo-urls';

// Statik sayfalar
const STATIC_PAGES = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms'
];

// Araç sayfaları
const TOOL_PAGES = [
  '/tools/bmi-calculator',
  '/tools/age-calculator',
  '/tools/unit-converter',
  '/tools/text-case-converter',
  '/tools/password-generator',
  '/tools/base64-encoder',
  '/tools/lorem-generator',
  '/tools/currency-converter',
  '/tools/timezone-converter',
  '/tools/json-formatter',
  '/tools/ip-lookup',
  '/tools/qr-generator'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://utilivia.com';
  
  // Statik sayfalar için sitemap entry'leri
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '/' ? 'daily' : 'monthly',
    priority: page === '/' ? 1.0 : 0.8
  }));
  
  // Araç sayfaları için sitemap entry'leri
  const toolEntries: MetadataRoute.Sitemap = TOOL_PAGES.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9
  }));
  
  // Dinamik SEO URL'leri için entry'ler
  const dynamicEntries: MetadataRoute.Sitemap = [];
  
  // SEO URL yapılandırmasından dinamik URL'leri al
  const seoURLs = generateAllSEOURLs(20);
  
  // Her araç için popüler URL'leri ekle
  Object.entries(seoURLs).forEach(([toolId, urls]) => {
    urls.forEach(url => {
      dynamicEntries.push({
        url: `${baseUrl}${url}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      });
    });
  });
  
  // BMI hesaplayıcı için özel URL'ler
  for (let height = 150; height <= 200; height += 5) {
    for (let weight = 50; weight <= 120; weight += 5) {
      dynamicEntries.push({
        url: `${baseUrl}/tools/bmi-calculator/${height}/${weight}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      });
      
      // Metrik format
      dynamicEntries.push({
        url: `${baseUrl}/tools/bmi-calculator/${height}-cm-${weight}-kg`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      });
    }
  }
  
  // Yaş hesaplayıcı için özel URL'ler
  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 100; year <= currentYear; year += 2) {
    for (let month = 1; month <= 12; month += 2) {
      for (let day = 1; day <= 28; day += 7) {
        dynamicEntries.push({
          url: `${baseUrl}/tools/age-calculator/${year}/${month}/${day}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6
        });
        
        // Tarih formatı
        dynamicEntries.push({
          url: `${baseUrl}/tools/age-calculator/${year}-${month}-${day}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6
        });
      }
    }
  }
  
  // Birim çevirici için özel URL'ler
  const units = [
    { from: 'meter', to: 'foot' },
    { from: 'kilogram', to: 'pound' },
    { from: 'celsius', to: 'fahrenheit' },
    { from: 'centimeter', to: 'inch' }
  ];
  
  for (const unit of units) {
    for (let value = 1; value <= 1000; value *= 2) {
      dynamicEntries.push({
        url: `${baseUrl}/tools/unit-converter/${unit.from}/to/${unit.to}/${value}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      });
    }
  }
  
  // Tüm entry'leri birleştir
  return [...staticEntries, ...toolEntries, ...dynamicEntries];
}