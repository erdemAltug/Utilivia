'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalHours: number
  totalMinutes: number
  nextBirthday: {
    date: Date
    daysUntil: number
  }
  zodiacSign: string
  fun_facts: string[]
}

function calculateAge(birthDate: Date): AgeResult {
  const now = new Date()
  const birth = new Date(birthDate)
  
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += lastDayOfPreviousMonth
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalHours = totalDays * 24
  const totalMinutes = totalHours * 60

  // Next birthday calculation
  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday < now) {
    nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate())
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  // Zodiac sign calculation
  const month = birth.getMonth() + 1
  const day = birth.getDate()
  let zodiacSign = ''
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = 'Aries ♈'
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = 'Taurus ♉'
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = 'Gemini ♊'
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = 'Cancer ♋'
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = 'Leo ♌'
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = 'Virgo ♍'
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = 'Libra ♎'
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = 'Scorpio ♏'
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = 'Sagittarius ♐'
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = 'Capricorn ♑'
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = 'Aquarius ♒'
  else zodiacSign = 'Pisces ♓'

  // Fun facts
  const fun_facts = [
    `You have lived approximately ${totalDays.toLocaleString()} days`,
    `That's about ${totalWeeks.toLocaleString()} weeks of life experience`,
    `You've experienced approximately ${totalHours.toLocaleString()} hours`,
    `Your heart has beaten roughly ${(totalDays * 100000).toLocaleString()} times`,
    `You've taken about ${(totalDays * 23000).toLocaleString()} breaths`
  ]

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    nextBirthday: {
      date: nextBirthday,
      daysUntil: daysUntilBirthday
    },
    zodiacSign,
    fun_facts
  }
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [result, setResult] = useState<AgeResult | null>(null)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Age Calculator', url: '/tools/age-calculator', isLast: true }
  ]

  const handleCalculate = () => {
    if (!birthDate) return

    const fullDateTime = birthTime ? `${birthDate}T${birthTime}` : birthDate
    const ageResult = calculateAge(new Date(fullDateTime))
    setResult(ageResult)
  }

  const handleReset = () => {
    setBirthDate('')
    setBirthTime('')
    setResult(null)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Age Calculator - Calculate Your Exact Age',
        'https://utilivia.com/tools/age-calculator',
        'Calculate your exact age in years, months, and days. Find out your zodiac sign, next birthday countdown, and discover fun facts about your life.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Age Calculator
              </h1>
              <p className="text-xl text-gray-600">
                Calculate your exact age and discover fun facts about your life
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Birth Date Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Birth Time Input (Optional) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Time (optional)
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Adding birth time provides more precise calculations
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleCalculate}
                  disabled={!birthDate}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Calculate Age
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Results */}
              {result ? (
                <div className="space-y-6">
                  {/* Main Age Display */}
                  <div className="text-center bg-blue-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.years} years, {result.months} months, {result.days} days
                    </div>
                    <div className="text-lg text-gray-600">
                      {result.zodiacSign}
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.totalDays.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Days</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.totalWeeks.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Weeks</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.totalHours.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Hours</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.totalMinutes.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Minutes</div>
                    </div>
                  </div>

                  {/* Next Birthday */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">🎂 Next Birthday</h3>
                    <p className="text-gray-600 mb-1">
                      {formatDate(result.nextBirthday.date)}
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      {result.nextBirthday.daysUntil} days to go!
                    </p>
                  </div>

                  {/* Fun Facts */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🎉 Fun Facts</h3>
                    <ul className="space-y-2">
                      {result.fun_facts.map((fact, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-lg">Enter your birth date to calculate your age</p>
                </div>
              )}
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Age Calculator</h2>
              
              <p className="text-gray-600 mb-4">
                Our age calculator helps you determine your exact age in years, months, and days from your birth date. 
                Whether you need to know your age for official documents, birthday planning, or simple curiosity, 
                this tool provides accurate calculations down to the day.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Features</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Zodiac Sign:</strong> Discover your astrological sign based on your birth date</li>
                <li><strong>Next Birthday:</strong> Find out exactly when your next birthday is</li>
                <li><strong>Fun Statistics:</strong> Learn interesting facts about your life duration</li>
                <li><strong>Multiple Time Units:</strong> See your age in days, weeks, hours, and minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 