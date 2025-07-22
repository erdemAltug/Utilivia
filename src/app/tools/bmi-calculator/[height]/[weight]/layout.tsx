import type { Metadata } from 'next'
import React from 'react'

interface Props {
  params: {
    height: string
    weight: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Parse height and weight for display
  let displayHeight: string
  let displayWeight: string
  let unit: 'metric' | 'imperial' = 'metric'

  // Check if height is in imperial format (e.g., "5-8" for 5'8")
  if (params.height.includes('-')) {
    const [feet, inches] = params.height.split('-').map(Number)
    displayHeight = `${feet} feet ${inches} inches`
    displayWeight = `${params.weight} pounds`
    unit = 'imperial'
  } else {
    displayHeight = `${params.height} cm`
    displayWeight = `${params.weight} kg`
  }

  // Calculate BMI for metadata
  let parsedHeight: number
  let parsedWeight: number = parseFloat(params.weight)

  if (unit === 'imperial') {
    const [feet, inches] = params.height.split('-').map(Number)
    parsedHeight = (feet * 12) + inches // Convert to total inches
  } else {
    parsedHeight = parseFloat(params.height)
  }

  // BMI calculation
  let heightInMeters: number
  let weightInKg: number

  if (unit === 'imperial') {
    heightInMeters = parsedHeight * 0.0254
    weightInKg = parsedWeight * 0.453592
  } else {
    heightInMeters = parsedHeight / 100
    weightInKg = parsedWeight
  }

  const bmi = weightInKg / (heightInMeters * heightInMeters)
  
  let category: string
  if (bmi < 18.5) category = 'Underweight'
  else if (bmi < 25) category = 'Normal Weight'
  else if (bmi < 30) category = 'Overweight'
  else category = 'Obese'

  const title = `BMI Calculator ${displayHeight} ${displayWeight} - BMI ${bmi.toFixed(1)} (${category})`
  const shortTitle = unit === 'imperial' 
    ? `BMI ${params.height.replace('-', 'ft')}in ${params.weight}lbs`
    : `BMI ${params.height}cm ${params.weight}kg`

  return {
    title,
    description: `Calculate BMI for ${displayHeight} and ${displayWeight}. Your BMI is ${bmi.toFixed(1)} which is classified as ${category}. Free BMI calculator with health recommendations and tips.`,
    keywords: [
      `BMI ${params.height} ${params.weight}`,
      `BMI calculator ${displayHeight} ${displayWeight}`,
      `body mass index ${params.height} ${params.weight}`,
      `BMI ${bmi.toFixed(1)}`,
      `${category.toLowerCase()} BMI`,
      `weight calculator ${displayHeight}`,
      `height weight BMI`,
      shortTitle,
      `BMI for ${displayHeight}`,
      `BMI for ${displayWeight}`,
      'BMI calculator',
      'body mass index',
      'weight status',
      'health calculator',
      `BMI ${category}`,
    ],
    authors: [{ name: 'Utilivia' }],
    creator: 'Utilivia',
    metadataBase: new URL('https://utilivia.com'),
    alternates: {
      canonical: `/tools/bmi-calculator/${params.height}/${params.weight}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://utilivia.com/tools/bmi-calculator/${params.height}/${params.weight}`,
      title: `BMI Calculator: ${displayHeight}, ${displayWeight} = BMI ${bmi.toFixed(1)}`,
      description: `BMI calculation for ${displayHeight} and ${displayWeight}. Result: BMI ${bmi.toFixed(1)} (${category}). Get personalized health recommendations.`,
      siteName: 'Utilivia',
    },
    twitter: {
      card: 'summary_large_image',
      title: `BMI ${bmi.toFixed(1)} for ${displayHeight}, ${displayWeight}`,
      description: `BMI calculation result: ${bmi.toFixed(1)} (${category}). Free BMI calculator with health tips.`,
      creator: '@utilivia',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function BMISpecificLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 