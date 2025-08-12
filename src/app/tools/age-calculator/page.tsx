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
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full mb-6">
                <span className="text-xl">📅</span>
                <span className="font-medium">Age Calculator</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
                Calculate Your Age
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover your exact age, zodiac sign, and fascinating life statistics. 
                Get ready to explore the incredible journey of your life!
              </p>
            </div>

            {/* Calculator Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      📅 Birth Date
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Select your birth date"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      ⏰ Birth Time (Optional)
                    </label>
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                    <p className="text-sm text-gray-500 mt-2 ml-2">
                      💡 Adding birth time provides more precise calculations
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleCalculate}
                      disabled={!birthDate}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                    >
                      🧮 Calculate Age
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
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 flex items-center justify-center">
                  {result ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎉</div>
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        {result.years} years, {result.months} months, {result.days} days
                      </div>
                      <div className="text-lg text-indigo-600 font-semibold">
                        {result.zodiacSign}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-8xl mb-6">📅</div>
                      <p className="text-xl font-medium">Enter your birth date to see your age</p>
                      <p className="text-gray-400 mt-2">Get ready for some amazing discoveries!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Section */}
            {result && (
              <div className="space-y-8">
                {/* Main Age Display */}
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                  
                  <div className="relative">
                    <div className="text-5xl lg:text-7xl font-bold mb-4">
                      {result.years} years, {result.months} months, {result.days} days
                    </div>
                    <div className="text-2xl lg:text-3xl font-semibold text-blue-100 mb-2">
                      {result.zodiacSign}
                    </div>
                    <div className="text-lg text-blue-200">
                      You've been on this amazing journey for quite some time!
                    </div>
                  </div>
                </div>

                {/* Detailed Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {result.totalDays.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Total Days</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-3xl mb-2">📅</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {result.totalWeeks.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Total Weeks</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-3xl mb-2">⏰</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {result.totalHours.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Total Hours</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-3xl mb-2">⏱️</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {result.totalMinutes.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Total Minutes</div>
                  </div>
                </div>

                {/* Next Birthday */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 border border-pink-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-3xl text-white">
                      🎂
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Next Birthday</h3>
                      <p className="text-gray-600">Mark your calendar!</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-lg font-semibold text-gray-800 mb-2">Date</div>
                      <div className="text-2xl font-bold text-pink-600">
                        {formatDate(result.nextBirthday.date)}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-lg font-semibold text-gray-800 mb-2">Countdown</div>
                      <div className="text-2xl font-bold text-pink-600">
                        {result.nextBirthday.daysUntil} days to go!
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl text-white">
                      🎉
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Fun Facts</h3>
                      <p className="text-gray-600">Amazing statistics about your life!</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.fun_facts.map((fact, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-3">
                          <span className="text-yellow-500 text-xl">✨</span>
                          <span className="text-gray-700 leading-relaxed">{fact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEO Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 mt-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
                About Age Calculator
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    Our age calculator helps you determine your exact age in years, months, and days from your birth date. 
                    Whether you need to know your age for official documents, birthday planning, or simple curiosity, 
                    this tool provides accurate calculations down to the day.
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Discover fascinating insights about your life journey, including your zodiac sign, 
                    next birthday countdown, and incredible statistics that will make you appreciate 
                    every moment of your existence.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">✨ Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 text-xl">⭐</span>
                      <span className="text-gray-700"><strong>Zodiac Sign:</strong> Discover your astrological sign based on your birth date</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 text-xl">⭐</span>
                      <span className="text-gray-700"><strong>Next Birthday:</strong> Find out exactly when your next birthday is</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 text-xl">⭐</span>
                      <span className="text-gray-700"><strong>Fun Statistics:</strong> Learn interesting facts about your life duration</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 text-xl">⭐</span>
                      <span className="text-gray-700"><strong>Multiple Time Units:</strong> See your age in days, weeks, hours, and minutes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 