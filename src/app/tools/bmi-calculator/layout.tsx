import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Free BMI Calculator - Calculate Body Mass Index Online',
  description: 'Calculate your BMI (Body Mass Index) instantly with our free online calculator. Get personalized health insights, tips, and understand your weight category. Supports metric and imperial units.',
  keywords: [
    'BMI calculator',
    'body mass index',
    'weight calculator',
    'health calculator',
    'BMI chart',
    'obesity calculator',
    'fitness calculator',
    'health assessment',
    'weight categories',
    'healthy weight'
  ],
  openGraph: {
    title: 'Free BMI Calculator - Calculate Body Mass Index Online | Utilivia',
    description: 'Calculate your BMI (Body Mass Index) instantly with our free online calculator. Get personalized health insights and recommendations.',
    type: 'website',
    url: 'https://utilivia.com/tools/bmi-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free BMI Calculator - Calculate Body Mass Index Online',
    description: 'Calculate your BMI (Body Mass Index) instantly with our free online calculator. Get personalized health insights and recommendations.',
  },
  alternates: {
    canonical: '/tools/bmi-calculator',
  },
}

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 