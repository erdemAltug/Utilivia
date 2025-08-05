import React from 'react'
import { notFound } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'
import AgeCalculatorClient from './AgeCalculatorClient'

// Generate popular birth date combinations for SEO
export async function generateStaticParams() {
  const params: { year: string; month: string; day: string }[] = []
  
  const popularYears = [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020]
  const popularMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const popularDays = [1, 15, 30]
  
  for (const year of popularYears) {
    for (const month of popularMonths) {
      for (const day of popularDays) {
        params.push({
          year: year.toString(),
          month: month.toString(),
          day: day.toString()
        })
      }
    }
  }
  
  return params
}

interface PageProps {
  params: {
    year: string
    month: string
    day: string
  }
}

export default function AgeSpecificPage({ params }: PageProps) {
  const year = parseInt(params.year)
  const month = parseInt(params.month)
  const day = parseInt(params.day)
  
  // Validate date
  if (isNaN(year) || isNaN(month) || isNaN(day) || 
      year < 1900 || year > new Date().getFullYear() ||
      month < 1 || month > 12 || day < 1 || day > 31) {
    notFound()
  }
  
  const birthDate = new Date(year, month - 1, day)
  const now = new Date()
  
  if (birthDate > now) {
    notFound()
  }
  
  const pageTitle = `Age Calculator ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Age Calculator', url: '/tools/age-calculator' },
    { name: pageTitle, url: `/tools/age-calculator/${params.year}/${params.month}/${params.day}`, isLast: true }
  ]

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        `Age Calculator ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} - Calculate Age from Birth Date`,
        `https://utilivia.com/tools/age-calculator/${params.year}/${params.month}/${params.day}`,
        `Calculate exact age for birth date ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}. Free age calculator with zodiac sign and fun facts.`
      )} />

      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Age Calculator for {year}-{month.toString().padStart(2, '0')}-{day.toString().padStart(2, '0')}
              </h1>
              <p className="text-xl text-gray-600">
                Calculate exact age for birth date {year}-{month.toString().padStart(2, '0')}-{day.toString().padStart(2, '0')}
              </p>
            </div>

            <AgeCalculatorClient
              params={params}
              birthDate={birthDate}
            />
          </div>
        </div>
      </div>
    </>
  )
} 