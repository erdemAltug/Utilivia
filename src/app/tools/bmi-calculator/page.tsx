'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface BMIResult {
  bmi: number
  category: string
  categoryColor: string
  healthTips: string[]
}

function calculateBMI(height: number, weight: number, unit: 'metric' | 'imperial'): BMIResult {
  let heightInMeters: number
  let weightInKg: number

  if (unit === 'imperial') {
    heightInMeters = height * 0.0254
    weightInKg = weight * 0.453592
  } else {
    heightInMeters = height / 100
    weightInKg = weight
  }

  const bmi = weightInKg / (heightInMeters * heightInMeters)
  
  let category: string
  let categoryColor: string
  let healthTips: string[]

  if (bmi < 18.5) {
    category = 'Underweight'
    categoryColor = 'text-blue-600 bg-blue-50'
    healthTips = [
      'Consider consulting a healthcare provider about healthy weight gain',
      'Focus on nutrient-dense foods to increase caloric intake',
      'Include strength training exercises to build muscle mass'
    ]
  } else if (bmi < 25) {
    category = 'Normal weight'
    categoryColor = 'text-green-600 bg-green-50'
    healthTips = [
      'Maintain your current healthy weight with balanced diet',
      'Continue regular physical activity',
      'Focus on overall wellness and healthy habits'
    ]
  } else if (bmi < 30) {
    category = 'Overweight'
    categoryColor = 'text-yellow-600 bg-yellow-50'
    healthTips = [
      'Consider adopting a balanced, calorie-controlled diet',
      'Increase physical activity to at least 150 minutes per week',
      'Focus on sustainable lifestyle changes rather than quick fixes'
    ]
  } else {
    category = 'Obese'
    categoryColor = 'text-red-600 bg-red-50'
    healthTips = [
      'Consult with a healthcare provider for personalized weight management',
      'Consider working with a registered dietitian',
      'Start with moderate physical activity and gradually increase intensity'
    ]
  }

  return { bmi, category, categoryColor, healthTips }
}

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [bmiResult, setBMIResult] = useState<BMIResult | null>(null)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'BMI Calculator', url: '/tools/bmi-calculator', isLast: true }
  ]

  const handleCalculate = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    
    if (h > 0 && w > 0) {
      const result = calculateBMI(h, w, unit)
      setBMIResult(result)
    }
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'BMI Calculator - Body Mass Index Calculator',
        'https://utilivia.com/tools/bmi-calculator',
        'Calculate your BMI (Body Mass Index) instantly with our free online calculator. Get personalized health insights and recommendations.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                BMI Calculator
              </h1>
              <p className="text-xl text-gray-600">
                Calculate your Body Mass Index and get personalized health insights
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Unit Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit System
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'metric' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Metric (cm/kg)
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === 'imperial' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Imperial (in/lbs)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Height Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height {unit === 'metric' ? '(cm)' : '(inches)'}
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'metric' ? '170' : '68'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Weight Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? '70' : '154'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                disabled={!height || !weight}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Calculate BMI
              </button>

              {/* Results */}
              {bmiResult && (
                <div className="mt-8">
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {bmiResult.bmi.toFixed(1)}
                      </div>
                      <div className={`inline-block px-4 py-2 rounded-full font-medium ${bmiResult.categoryColor}`}>
                        {bmiResult.category}
                      </div>
                    </div>
                  </div>

                  {/* Health Tips */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Tips</h3>
                    <ul className="space-y-2">
                      {bmiResult.healthTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

                    {/* Popular BMI Combinations - SEO Link Building */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular BMI Calculations</h2>
          <p className="text-gray-600 mb-6">
            Quick access to common height and weight BMI calculations:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metric Combinations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Metric (cm/kg)</h3>
              <div className="space-y-2">
                <Link href="/tools/bmi-calculator/170/70" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 170cm, 70kg →
                </Link>
                <Link href="/tools/bmi-calculator/175/80" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 175cm, 80kg →
                </Link>
                <Link href="/tools/bmi-calculator/165/60" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 165cm, 60kg →
                </Link>
                <Link href="/tools/bmi-calculator/180/85" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 180cm, 85kg →
                </Link>
                <Link href="/tools/bmi-calculator/160/55" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 160cm, 55kg →
                </Link>
                <Link href="/tools/bmi-calculator/185/90" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 185cm, 90kg →
                </Link>
              </div>
            </div>

            {/* Imperial Combinations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Imperial (ft'in"/lbs)</h3>
              <div className="space-y-2">
                <Link href="/tools/bmi-calculator/5-8/150" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 5'8", 150 lbs →
                </Link>
                <Link href="/tools/bmi-calculator/5-6/140" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 5'6", 140 lbs →
                </Link>
                <Link href="/tools/bmi-calculator/6-0/180" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 6'0", 180 lbs →
                </Link>
                <Link href="/tools/bmi-calculator/5-4/130" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 5'4", 130 lbs →
                </Link>
                <Link href="/tools/bmi-calculator/5-10/170" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 5'10", 170 lbs →
                </Link>
                <Link href="/tools/bmi-calculator/5-5/135" className="block text-blue-600 hover:text-blue-800 text-sm">
                  BMI for 5'5", 135 lbs →
                </Link>
              </div>
            </div>

            {/* BMI Ranges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">BMI Categories</h3>
              <div className="space-y-2">
                <Link href="/tools/bmi-calculator/170/55" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Underweight BMI Example →
                </Link>
                <Link href="/tools/bmi-calculator/170/65" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Normal Weight BMI Example →
                </Link>
                <Link href="/tools/bmi-calculator/170/85" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Overweight BMI Example →
                </Link>
                <Link href="/tools/bmi-calculator/170/100" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Obese BMI Example →
                </Link>
                <Link href="/tools/bmi-calculator/5-8/120" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Low BMI 5'8" 120lbs →
                </Link>
                <Link href="/tools/bmi-calculator/5-8/200" className="block text-blue-600 hover:text-blue-800 text-sm">
                  High BMI 5'8" 200lbs →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About BMI Calculator</h2>
          
          <p className="text-gray-600 mb-4">
            Body Mass Index (BMI) is a simple calculation using a person's height and weight. 
            The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">BMI Categories</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Underweight:</strong> BMI less than 18.5</li>
            <li><strong>Normal weight:</strong> BMI 18.5-24.9</li>
            <li><strong>Overweight:</strong> BMI 25-29.9</li>
            <li><strong>Obese:</strong> BMI 30 or greater</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Limitations of BMI</h3>
          <p className="mb-4">
            While BMI is a useful screening tool, it has limitations. It doesn't distinguish between muscle mass and fat mass, 
            so athletes with high muscle mass may have a high BMI despite being healthy.
          </p>
        </div>
          </div>
        </div>
      </div>
    </>
  )
} 