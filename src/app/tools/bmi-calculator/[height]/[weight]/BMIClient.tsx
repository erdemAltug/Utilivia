'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface BMIResult {
  bmi: number
  category: string
  categoryColor: string
  healthTips: string[]
}

interface Props {
  params: {
    height: string
    weight: string
  }
  parsedHeight: number
  parsedWeight: number
  unit: 'metric' | 'imperial'
  displayHeight: string
  displayWeight: string
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

export default function BMIClient({ params, parsedHeight, parsedWeight, unit, displayHeight, displayWeight }: Props) {
  const [customHeight, setCustomHeight] = useState('')
  const [customWeight, setCustomWeight] = useState('')

  const bmiResult = calculateBMI(parsedHeight, parsedWeight, unit)

  // Generate related BMI calculations
  const relatedCalculations = []
  const baseWeight = parsedWeight

  // Similar heights with different weights
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue
    const newWeight = Math.round(baseWeight + (i * (unit === 'imperial' ? 10 : 5)))
    if (newWeight > 30 && newWeight < 300) {
      relatedCalculations.push({
        height: params.height,
        weight: newWeight.toString(),
        displayHeight,
        displayWeight: unit === 'imperial' ? `${newWeight} lbs` : `${newWeight} kg`
      })
    }
  }

  const handleCustomCalculate = () => {
    const h = parseFloat(customHeight)
    const w = parseFloat(customWeight)

    if (h > 0 && w > 0) {
      const newUrl = unit === 'imperial'
        ? `/tools/bmi-calculator/${Math.round(h)}/${Math.round(w)}`
        : `/tools/bmi-calculator/${Math.round(h)}/${Math.round(w)}`
      window.location.href = newUrl
    }
  }

  return (
    <>
      {/* BMI Result */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-blue-600 mb-4">
            {bmiResult.bmi.toFixed(1)}
          </div>
          <div className={`inline-block px-6 py-3 rounded-full font-semibold text-lg ${bmiResult.categoryColor}`}>
            {bmiResult.category}
          </div>
          <p className="text-gray-600 mt-4 text-lg">
            BMI for {displayHeight} and {displayWeight}
          </p>
        </div>

        {/* Health Tips */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Recommendations</h3>
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

      {/* Custom Calculator */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Different BMI</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height {unit === 'imperial' ? '(inches)' : '(cm)'}
            </label>
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              placeholder={unit === 'imperial' ? '68' : '170'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight {unit === 'imperial' ? '(lbs)' : '(kg)'}
            </label>
            <input
              type="number"
              value={customWeight}
              onChange={(e) => setCustomWeight(e.target.value)}
              placeholder={unit === 'imperial' ? '150' : '70'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleCustomCalculate}
            disabled={!customHeight || !customWeight}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Calculate BMI
          </button>
        </div>
      </div>

      {/* Related Calculations */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related BMI Calculations for {displayHeight}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedCalculations.map((calc, index) => {
            const relatedBMI = calculateBMI(parsedHeight, parseFloat(calc.weight), unit)
            return (
              <Link
                key={index}
                href={`/tools/bmi-calculator/${calc.height}/${calc.weight}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {calc.displayHeight}, {calc.displayWeight}
                  </div>
                  <div className="text-lg font-bold text-blue-600 mt-1">
                    BMI: {relatedBMI.bmi.toFixed(1)}
                  </div>
                  <div className={`text-sm mt-1 px-2 py-1 rounded ${relatedBMI.categoryColor}`}>
                    {relatedBMI.category}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/tools/bmi-calculator"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to BMI Calculator
          </Link>
        </div>
      </div>
    </>
  )
} 