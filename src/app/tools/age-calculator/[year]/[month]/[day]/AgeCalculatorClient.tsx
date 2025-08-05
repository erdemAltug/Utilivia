'use client'

import React, { useState } from 'react'
import Link from 'next/link'

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

interface Props {
  params: {
    year: string
    month: string
    day: string
  }
  birthDate: Date
}

export default function AgeCalculatorClient({ params, birthDate }: Props) {
  const [customBirthDate, setCustomBirthDate] = useState('')
  const [customBirthTime, setCustomBirthTime] = useState('')
  const [result, setResult] = useState<AgeResult | null>(null)

  // Calculate age for the specific date
  React.useEffect(() => {
    const ageResult = calculateAge(birthDate)
    setResult(ageResult)
  }, [birthDate])

  const handleCustomCalculate = () => {
    if (!customBirthDate) return
    const fullDateTime = customBirthTime ? `${customBirthDate}T${customBirthTime}` : customBirthDate
    const ageResult = calculateAge(new Date(fullDateTime))
    setResult(ageResult)
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
      {/* Age Result */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <div className={`inline-block px-6 py-3 rounded-full font-semibold text-lg bg-blue-100 text-blue-800`}>
              {result.zodiacSign}
            </div>
            <p className="text-gray-600 mt-4 text-lg">
              Age for {params.year}-{params.month.toString().padStart(2, '0')}-{params.day.toString().padStart(2, '0')}
            </p>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
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
      )}

      {/* Custom Calculator */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Different Age</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              value={customBirthDate}
              onChange={(e) => setCustomBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birth Time (optional)
            </label>
            <input
              type="time"
              value={customBirthTime}
              onChange={(e) => setCustomBirthTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleCustomCalculate}
            disabled={!customBirthDate}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Age
          </button>
        </div>
      </div>

      {/* Related Calculations */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Age Calculations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Popular years */}
          {[1980, 1990, 2000, 2010, 2020].map((year) => {
            if (year.toString() !== params.year) {
              const relatedBirthDate = new Date(year, parseInt(params.month) - 1, parseInt(params.day))
              const relatedAge = calculateAge(relatedBirthDate)
              return (
                <Link
                  key={year}
                  href={`/tools/age-calculator/${year}/${params.month}/${params.day}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {year}-{params.month.toString().padStart(2, '0')}-{params.day.toString().padStart(2, '0')}
                    </div>
                    <div className="text-lg font-bold text-blue-600 mt-1">
                      {relatedAge.years} years old
                    </div>
                    <div className="text-sm mt-1 px-2 py-1 rounded bg-blue-100 text-blue-800">
                      {relatedAge.zodiacSign}
                    </div>
                  </div>
                </Link>
              )
            }
            return null
          })}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/tools/age-calculator"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Age Calculator
          </Link>
        </div>
      </div>
    </>
  )
} 