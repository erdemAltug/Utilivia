import React from 'react'
import { notFound } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'
import BMIClient from './BMIClient'

// Generate popular height/weight combinations for SEO
export async function generateStaticParams() {
  const params: { height: string; weight: string }[] = []
  
  // Metric combinations (cm/kg)
  const metricHeights = [150, 155, 160, 165, 170, 175, 180, 185, 190, 195]
  const metricWeights = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110]
  
  for (const height of metricHeights) {
    for (const weight of metricWeights) {
      params.push({
        height: height.toString(),
        weight: weight.toString()
      })
    }
  }

  // Imperial combinations (feet-inches/lbs) - convert common feet/inches
  const imperialData = [
    { feet: 4, inches: 10, totalInches: 58 }, // 4'10"
    { feet: 4, inches: 11, totalInches: 59 }, // 4'11"
    { feet: 5, inches: 0, totalInches: 60 },  // 5'0"
    { feet: 5, inches: 1, totalInches: 61 },  // 5'1"
    { feet: 5, inches: 2, totalInches: 62 },  // 5'2"
    { feet: 5, inches: 3, totalInches: 63 },  // 5'3"
    { feet: 5, inches: 4, totalInches: 64 },  // 5'4"
    { feet: 5, inches: 5, totalInches: 65 },  // 5'5"
    { feet: 5, inches: 6, totalInches: 66 },  // 5'6"
    { feet: 5, inches: 7, totalInches: 67 },  // 5'7"
    { feet: 5, inches: 8, totalInches: 68 },  // 5'8"
    { feet: 5, inches: 9, totalInches: 69 },  // 5'9"
    { feet: 5, inches: 10, totalInches: 70 }, // 5'10"
    { feet: 5, inches: 11, totalInches: 71 }, // 5'11"
    { feet: 6, inches: 0, totalInches: 72 },  // 6'0"
    { feet: 6, inches: 1, totalInches: 73 },  // 6'1"
    { feet: 6, inches: 2, totalInches: 74 },  // 6'2"
    { feet: 6, inches: 3, totalInches: 75 },  // 6'3"
    { feet: 6, inches: 4, totalInches: 76 }   // 6'4"
  ]
  
  const imperialWeights = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250]
  
  for (const heightData of imperialData) {
    for (const weight of imperialWeights) {
      params.push({
        height: `${heightData.feet}-${heightData.inches}`,  // Format: "5-8" for 5'8"
        weight: weight.toString()
      })
    }
  }
  
  return params
}

interface PageProps {
  params: {
    height: string
    weight: string
  }
}

export default function BMISpecificPage({ params }: PageProps) {
  // Parse height and weight from URL
  let parsedHeight: number
  let parsedWeight: number = parseFloat(params.weight)
  let unit: 'metric' | 'imperial' = 'metric'
  let displayHeight: string
  let displayWeight: string = params.weight

  // Check if height is in imperial format (e.g., "5-8" for 5'8")
  if (params.height.includes('-')) {
    const [feet, inches] = params.height.split('-').map(Number)
    if (isNaN(feet) || isNaN(inches) || feet < 3 || feet > 8 || inches < 0 || inches > 11) {
      notFound()
    }
    parsedHeight = (feet * 12) + inches // Convert to total inches
    unit = 'imperial'
    displayHeight = `${feet}'${inches}"`
    displayWeight = `${params.weight} lbs`
  } else {
    parsedHeight = parseFloat(params.height)
    if (isNaN(parsedHeight) || parsedHeight < 100 || parsedHeight > 250) {
      notFound()
    }
    displayHeight = `${params.height} cm`
    displayWeight = `${params.weight} kg`
  }

  if (isNaN(parsedWeight) || parsedWeight < 30 || parsedWeight > 300) {
    notFound()
  }

  const pageTitle = `BMI Calculator ${displayHeight} ${displayWeight}`
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'BMI Calculator', url: '/tools/bmi-calculator' },
    { name: pageTitle, url: `/tools/bmi-calculator/${params.height}/${params.weight}`, isLast: true }
  ]

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        `BMI Calculator ${displayHeight} ${displayWeight} - Body Mass Index`,
        `https://utilivia.com/tools/bmi-calculator/${params.height}/${params.weight}`,
        `Calculate BMI for ${displayHeight} and ${displayWeight}. Free BMI calculator with health tips and personalized recommendations.`
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                BMI for {displayHeight}, {displayWeight}
              </h1>
              <p className="text-xl text-gray-600">
                Body Mass Index calculation for {displayHeight} height and {displayWeight} weight
              </p>
            </div>

            <BMIClient 
              params={params}
              parsedHeight={parsedHeight}
              parsedWeight={parsedWeight}
              unit={unit}
              displayHeight={displayHeight}
              displayWeight={displayWeight}
            />
          </div>
        </div>
      </div>
    </>
  )
} 