'use client'

import React, { useState } from 'react'

interface BMIResult {
  bmi: number
  category: string
  color: string
  description: string
  healthRisks: string[]
  recommendations: string[]
}

function calculateBMI(height: number, weight: number): BMIResult {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  
  let category = ''
  let color = ''
  let description = ''
  let healthRisks: string[] = []
  let recommendations: string[] = []

  if (bmi < 18.5) {
    category = 'Underweight'
    color = 'text-blue-600'
    description = 'Your BMI indicates you are underweight. Consider consulting with a healthcare provider.'
    healthRisks = [
      'Weakened immune system',
      'Nutritional deficiencies',
      'Osteoporosis risk',
      'Fertility issues'
    ]
    recommendations = [
      'Increase caloric intake with healthy foods',
      'Include protein-rich foods in your diet',
      'Consider strength training exercises',
      'Consult with a nutritionist'
    ]
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal Weight'
    color = 'text-green-600'
    description = 'Congratulations! Your BMI is in the healthy range. Keep up the good work!'
    healthRisks = [
      'Low risk of weight-related health problems',
      'Good overall health indicators',
      'Optimal energy levels',
      'Better sleep quality'
    ]
    recommendations = [
      'Maintain current healthy lifestyle',
      'Regular exercise and balanced diet',
      'Stay hydrated and get adequate sleep',
      'Regular health check-ups'
    ]
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight'
    color = 'text-yellow-600'
    description = 'Your BMI indicates you are overweight. Small lifestyle changes can make a big difference.'
    healthRisks = [
      'Increased risk of heart disease',
      'Type 2 diabetes risk',
      'High blood pressure',
      'Joint problems'
    ]
    recommendations = [
      'Gradual weight loss through diet and exercise',
      'Reduce processed foods and added sugars',
      'Increase physical activity',
      'Monitor portion sizes'
    ]
  } else {
    category = 'Obese'
    color = 'text-red-600'
    description = 'Your BMI indicates obesity. Consider consulting with healthcare professionals for guidance.'
    healthRisks = [
      'High risk of cardiovascular disease',
      'Type 2 diabetes',
      'Sleep apnea',
      'Joint and mobility issues'
    ]
    recommendations = [
      'Consult with healthcare provider',
      'Structured weight loss program',
      'Regular medical monitoring',
      'Lifestyle modification support'
    ]
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    color,
    description,
    healthRisks,
    recommendations
  }
}

interface BMIClientProps {
  height: number
  weight: number
}

export default function BMIClient({ height, weight }: BMIClientProps) {
  const [customHeight, setCustomHeight] = useState(height.toString())
  const [customWeight, setCustomWeight] = useState(weight.toString())
  const [result, setResult] = useState<BMIResult | null>(null)

  const handleCalculate = () => {
    const heightNum = parseFloat(customHeight)
    const weightNum = parseFloat(customWeight)
    
    if (heightNum > 0 && weightNum > 0) {
      const bmiResult = calculateBMI(heightNum, weightNum)
      setResult(bmiResult)
    }
  }

  const handleReset = () => {
    setCustomHeight(height.toString())
    setCustomWeight(weight.toString())
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full mb-6">
              <span className="text-xl">⚖️</span>
              <span className="font-medium">BMI Calculator</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Calculate Your BMI
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover your Body Mass Index and understand what it means for your health. 
              Get personalized insights and recommendations for a healthier lifestyle!
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    📏 Height (cm)
                  </label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your height in cm"
                    min="50"
                    max="300"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    ⚖️ Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={customWeight}
                    onChange={(e) => setCustomWeight(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your weight in kg"
                    min="20"
                    max="500"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleCalculate}
                    disabled={!customHeight || !customWeight}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    🧮 Calculate BMI
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-lg"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
                {result ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {result.bmi}
                    </div>
                    <div className={`text-xl font-semibold ${result.color}`}>
                      {result.category}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-8xl mb-6">⚖️</div>
                    <p className="text-xl font-medium">Enter your height and weight to calculate BMI</p>
                    <p className="text-gray-400 mt-2">Get personalized health insights!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-8">
              {/* Main BMI Display */}
              <div className="bg-gradient-to-br from-green-600 via-blue-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                
                <div className="relative">
                  <div className="text-6xl lg:text-8xl font-bold mb-4">
                    {result.bmi}
                  </div>
                  <div className="text-3xl lg:text-4xl font-semibold text-green-100 mb-4">
                    {result.category}
                  </div>
                  <div className="text-xl text-green-200 max-w-2xl mx-auto">
                    {result.description}
                  </div>
                </div>
              </div>

              {/* BMI Scale */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">BMI Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-2xl bg-blue-50 border-2 border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">Under 18.5</div>
                    <div className="text-blue-700 font-medium">Underweight</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-green-50 border-2 border-green-200">
                    <div className="text-2xl font-bold text-green-600">18.5 - 24.9</div>
                    <div className="text-green-700 font-medium">Normal Weight</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">25.0 - 29.9</div>
                    <div className="text-yellow-700 font-medium">Overweight</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-red-50 border-2 border-red-200">
                    <div className="text-2xl font-bold text-red-600">30.0+</div>
                    <div className="text-red-700 font-medium">Obese</div>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Health Risks */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 border border-red-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl text-white">
                      ⚠️
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Health Risks</h3>
                      <p className="text-gray-600">Important considerations for your BMI category</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {result.healthRisks.map((risk, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-start space-x-3">
                          <span className="text-red-500 text-xl">•</span>
                          <span className="text-gray-700">{risk}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl text-white">
                      💡
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Recommendations</h3>
                      <p className="text-gray-600">Actionable steps for better health</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-start space-x-3">
                          <span className="text-green-500 text-xl">✓</span>
                          <span className="text-gray-700">{rec}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEO Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 mt-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              About BMI Calculator
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  Body Mass Index (BMI) is a simple calculation using your height and weight to estimate body fat. 
                  While BMI doesn't directly measure body fat, it's a useful screening tool for weight categories 
                  that may lead to health problems.
                </p>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  Our BMI calculator provides instant results with personalized insights, health risks, 
                  and actionable recommendations based on your BMI category. Remember, BMI is just one 
                  of many health indicators and should be discussed with healthcare professionals.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">⭐</span>
                    <span className="text-gray-700"><strong>Instant Calculation:</strong> Get your BMI result immediately</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">⭐</span>
                    <span className="text-gray-700"><strong>Health Insights:</strong> Understand what your BMI means</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">⭐</span>
                    <span className="text-gray-700"><strong>Personalized Recommendations:</strong> Get actionable health advice</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">⭐</span>
                    <span className="text-gray-700"><strong>Risk Assessment:</strong> Learn about potential health risks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
