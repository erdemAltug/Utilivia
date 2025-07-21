'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
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
    // Convert height from inches to meters and weight from pounds to kg
    heightInMeters = height * 0.0254
    weightInKg = weight * 0.453592
  } else {
    // Height in cm to meters
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
      'Focus on maintaining muscle mass and overall fitness'
    ]
  } else if (bmi < 30) {
    category = 'Overweight'
    categoryColor = 'text-orange-600 bg-orange-50'
    healthTips = [
      'Consider gradual weight loss through caloric deficit',
      'Increase physical activity and cardiovascular exercise',
      'Focus on whole foods and portion control'
    ]
  } else {
    category = 'Obese'
    categoryColor = 'text-red-600 bg-red-50'
    healthTips = [
      'Consult with healthcare provider for weight loss plan',
      'Consider working with a nutritionist or dietitian',
      'Start with low-impact exercises and gradually increase intensity'
    ]
  }

  return { bmi, category, categoryColor, healthTips }
}

function BMICalculatorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

  // Initialize from URL params
  useEffect(() => {
    const heightParam = searchParams.get('height')
    const weightParam = searchParams.get('weight')
    const unitParam = searchParams.get('unit') as 'metric' | 'imperial'
    const ageParam = searchParams.get('age')
    const genderParam = searchParams.get('gender')

    if (heightParam) setHeight(heightParam)
    if (weightParam) setWeight(weightParam)
    if (unitParam && ['metric', 'imperial'].includes(unitParam)) setUnit(unitParam)
    if (ageParam) setAge(ageParam)
    if (genderParam) setGender(genderParam)

    // Calculate if all params are present
    if (heightParam && weightParam) {
      const bmiResult = calculateBMI(parseFloat(heightParam), parseFloat(weightParam), unitParam || 'metric')
      setResult(bmiResult)
    }
  }, [searchParams])

  const updateURL = (newHeight?: string, newWeight?: string, newUnit?: string, newAge?: string, newGender?: string) => {
    const params = new URLSearchParams()
    
    const h = newHeight ?? height
    const w = newWeight ?? weight
    const u = newUnit ?? unit
    const a = newAge ?? age
    const g = newGender ?? gender

    if (h) params.set('height', h)
    if (w) params.set('weight', w)
    if (u) params.set('unit', u)
    if (a) params.set('age', a)
    if (g) params.set('gender', g)

    const query = params.toString()
    router.push(`/tools/bmi-calculator${query ? `?${query}` : ''}`, { scroll: false })
  }

  const handleCalculate = () => {
    if (!height || !weight) return

    const bmiResult = calculateBMI(parseFloat(height), parseFloat(weight), unit)
    setResult(bmiResult)
    updateURL()
  }

  const handleReset = () => {
    setHeight('')
    setWeight('')
    setAge('')
    setGender('')
    setResult(null)
    router.push('/tools/bmi-calculator', { scroll: false })
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/#tools' },
    { name: 'BMI Calculator', url: '/tools/bmi-calculator', isLast: true }
  ]

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'BMI Calculator - Free Body Mass Index Calculator',
        'https://utilivia.com/tools/bmi-calculator',
        'Calculate your BMI (Body Mass Index) instantly with our free online calculator. Supports metric and imperial units with personalized health insights.'
      )} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🛠️</span>
              <span className="text-xl font-bold text-gray-900">Utilivia</span>
            </Link>
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back to Tools
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ⚖️ BMI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) quickly and accurately. Get personalized health insights and recommendations based on your results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Enter Your Details</h2>
            
            {/* Unit Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit System
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => {
                    setUnit('metric')
                    updateURL(undefined, undefined, 'metric')
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    unit === 'metric' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Metric (cm, kg)
                </button>
                <button
                  onClick={() => {
                    setUnit('imperial')
                    updateURL(undefined, undefined, 'imperial')
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    unit === 'imperial' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Imperial (in, lbs)
                </button>
              </div>
            </div>

            {/* Height Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height {unit === 'metric' ? '(cm)' : '(inches)'}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value)
                  updateURL(e.target.value)
                }}
                placeholder={unit === 'metric' ? '170' : '68'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Weight Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value)
                  updateURL(undefined, e.target.value)
                }}
                placeholder={unit === 'metric' ? '70' : '154'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (optional)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value)
                    updateURL(undefined, undefined, undefined, e.target.value)
                  }}
                  placeholder="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender (optional)
                </label>
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)
                    updateURL(undefined, undefined, undefined, undefined, e.target.value)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                disabled={!height || !weight}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Calculate BMI
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Your Results</h2>
            
            {result ? (
              <div className="space-y-6">
                {/* BMI Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {result.bmi.toFixed(1)}
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${result.categoryColor}`}>
                    {result.category}
                  </div>
                </div>

                {/* BMI Scale */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">BMI Scale</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Underweight</span>
                      <span>&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Normal weight</span>
                      <span>18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-600">Overweight</span>
                      <span>25 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Obese</span>
                      <span>&gt; 30</span>
                    </div>
                  </div>
                </div>

                {/* Health Tips */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Health Tips</h3>
                  <ul className="space-y-2">
                    {result.healthTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Disclaimer:</strong> This BMI calculator is for informational purposes only. 
                    Consult with a healthcare professional for personalized medical advice.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-4">⚖️</div>
                <p>Enter your height and weight to calculate your BMI</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Body Mass Index (BMI)</h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Body Mass Index (BMI) is a widely used screening tool that estimates body fat based on height and weight. 
              It helps healthcare professionals assess whether a person has a healthy weight for their height.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How BMI is Calculated</h3>
            <p className="mb-4">
              BMI is calculated using the formula: <strong>BMI = weight (kg) / height (m)²</strong>
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
              so athletes with high muscle mass may have a high BMI despite being healthy. Age, gender, and ethnicity can also 
              affect the relationship between BMI and body fat.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default function BMICalculator() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'BMI Calculator', url: '/tools/bmi-calculator', isLast: true }
  ]

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

            <Suspense fallback={
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading calculator...</p>
              </div>
            }>
              <BMICalculatorContent />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
} 