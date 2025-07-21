import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Utilivia - Free Online Utility Tools',
    short_name: 'Utilivia',
    description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512.png', 
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'utilities', 'tools'],
    shortcuts: [
      {
        name: 'BMI Calculator',
        short_name: 'BMI',
        description: 'Calculate your Body Mass Index',
        url: '/tools/bmi-calculator',
      },
      {
        name: 'Age Calculator',
        short_name: 'Age',
        description: 'Calculate your exact age',
        url: '/tools/age-calculator',
      }
    ]
  }
} 