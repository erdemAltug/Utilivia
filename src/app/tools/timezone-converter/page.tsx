'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface TimeZone {
  id: string
  name: string
  offset: number
  city: string
  flag: string
}

const timezones: TimeZone[] = [
  { id: 'UTC', name: 'Coordinated Universal Time', offset: 0, city: 'London', flag: '🇬🇧' },
  { id: 'America/New_York', name: 'Eastern Time', offset: -5, city: 'New York', flag: '🇺🇸' },
  { id: 'America/Chicago', name: 'Central Time', offset: -6, city: 'Chicago', flag: '🇺🇸' },
  { id: 'America/Denver', name: 'Mountain Time', offset: -7, city: 'Denver', flag: '🇺🇸' },
  { id: 'America/Los_Angeles', name: 'Pacific Time', offset: -8, city: 'Los Angeles', flag: '🇺🇸' },
  { id: 'Europe/London', name: 'Greenwich Mean Time', offset: 0, city: 'London', flag: '🇬🇧' },
  { id: 'Europe/Paris', name: 'Central European Time', offset: 1, city: 'Paris', flag: '🇫🇷' },
  { id: 'Europe/Berlin', name: 'Central European Time', offset: 1, city: 'Berlin', flag: '🇩🇪' },
  { id: 'Europe/Moscow', name: 'Moscow Time', offset: 3, city: 'Moscow', flag: '🇷🇺' },
  { id: 'Asia/Dubai', name: 'Gulf Standard Time', offset: 4, city: 'Dubai', flag: '🇦🇪' },
  { id: 'Asia/Kolkata', name: 'India Standard Time', offset: 5.5, city: 'Mumbai', flag: '🇮🇳' },
  { id: 'Asia/Shanghai', name: 'China Standard Time', offset: 8, city: 'Shanghai', flag: '🇨🇳' },
  { id: 'Asia/Tokyo', name: 'Japan Standard Time', offset: 9, city: 'Tokyo', flag: '🇯🇵' },
  { id: 'Australia/Sydney', name: 'Australian Eastern Time', offset: 10, city: 'Sydney', flag: '🇦🇺' },
  { id: 'Pacific/Auckland', name: 'New Zealand Time', offset: 12, city: 'Auckland', flag: '🇳🇿' }
]

export default function TimezoneConverter() {
  const [sourceTimezone, setSourceTimezone] = useState<string>('America/New_York')
  const [targetTimezone, setTargetTimezone] = useState<string>('Europe/London')
  const [sourceDate, setSourceDate] = useState<string>('')
  const [sourceTime, setSourceTime] = useState<string>('')
  const [convertedTimes, setConvertedTimes] = useState<any[]>([])

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Timezone Converter', url: '/tools/timezone-converter', isLast: true }
  ]

  useEffect(() => {
    // Initialize with current date and time
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const timeStr = now.toTimeString().substring(0, 5)
    
    setSourceDate(dateStr)
    setSourceTime(timeStr)
  }, [])

  useEffect(() => {
    if (sourceDate && sourceTime) {
      convertTime()
    }
  }, [sourceDate, sourceTime, sourceTimezone, targetTimezone])

  const convertTime = () => {
    try {
      // Create date object from source timezone
      const dateTimeString = `${sourceDate}T${sourceTime}:00`
      const sourceTZ = timezones.find(tz => tz.id === sourceTimezone)
      const targetTZ = timezones.find(tz => tz.id === targetTimezone)
      
      if (!sourceTZ || !targetTZ) return
      
      // Calculate time difference
      const offsetDifference = targetTZ.offset - sourceTZ.offset
      
      // Create date and apply offset
      const sourceDateObj = new Date(dateTimeString)
      const targetDateObj = new Date(sourceDateObj.getTime() + (offsetDifference * 60 * 60 * 1000))
      
      // Format times
      const sourceFormatted = sourceDateObj.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: sourceTZ.id
      })
      
      const targetFormatted = targetDateObj.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: targetTZ.id
      })
      
      setConvertedTimes([
        {
          timezone: sourceTZ,
          time: sourceFormatted,
          raw: sourceDateObj
        },
        {
          timezone: targetTZ,
          time: targetFormatted,
          raw: targetDateObj
        }
      ])
    } catch (error) {
      console.error('Error converting time:', error)
    }
  }

  const swapTimezones = () => {
    setSourceTimezone(targetTimezone)
    setTargetTimezone(sourceTimezone)
  }

  const setCurrentTime = () => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const timeStr = now.toTimeString().substring(0, 5)
    
    setSourceDate(dateStr)
    setSourceTime(timeStr)
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Timezone Converter - World Clock Comparison',
        'https://utilivia.com/tools/timezone-converter',
        'Compare time zones worldwide. Convert time between different cities and countries instantly. Perfect for international meetings and travel planning.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Timezone Converter
              </h1>
              <p className="text-xl text-gray-600">
                Compare time zones around the world
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Timezone Converter */}
              <div className="space-y-6">
                {/* Date and Time Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={sourceDate}
                      onChange={(e) => setSourceDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time (24-hour)
                    </label>
                    <input
                      type="time"
                      value={sourceTime}
                      onChange={(e) => setSourceTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Set Current Time Button */}
                <div className="text-center">
                  <button
                    onClick={setCurrentTime}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Use Current Time
                  </button>
                </div>

                {/* Timezone Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Source Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Timezone
                    </label>
                    <select
                      value={sourceTimezone}
                      onChange={(e) => setSourceTimezone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {timezones.map(tz => (
                        <option key={tz.id} value={tz.id}>
                          {tz.flag} {tz.city} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={swapTimezones}
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                      aria-label="Swap timezones"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                  </div>

                  {/* Target Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Timezone
                    </label>
                    <select
                      value={targetTimezone}
                      onChange={(e) => setTargetTimezone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {timezones.map(tz => (
                        <option key={tz.id} value={tz.id}>
                          {tz.flag} {tz.city} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results */}
                {convertedTimes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {convertedTimes.map((timeInfo, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                          <span className="text-2xl mr-3">{timeInfo.timezone.flag}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{timeInfo.timezone.city}</h3>
                            <p className="text-sm text-gray-600">UTC{timeInfo.timezone.offset >= 0 ? '+' : ''}{timeInfo.timezone.offset}</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-2">
                          {timeInfo.time.split(', ')[1]}
                        </div>
                        <div className="text-gray-600">
                          {timeInfo.time.split(', ')[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* World Clock Reference */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">World Clock Reference</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {timezones.slice(0, 6).map((tz, index) => {
                  const now = new Date()
                  const utcOffset = now.getTimezoneOffset() / 60
                  const localTime = new Date(now.getTime() + (tz.offset + utcOffset) * 60 * 60 * 1000)
                  
                  return (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">{tz.flag}</span>
                        <h3 className="font-semibold text-gray-900">{tz.city}</h3>
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        {localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-sm text-gray-600">
                        UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Timezone Conversion</h2>
              
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Our timezone converter helps you compare time zones around the world. 
                  Whether you're scheduling international meetings, planning travel, or 
                  coordinating with colleagues in different countries, our tool makes 
                  time conversion simple and accurate.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Understanding Time Zones</h3>
                <p className="mb-4">
                  The world is divided into 24 time zones, each representing a one-hour difference 
                  from Coordinated Universal Time (UTC). Some regions observe daylight saving time, 
                  which can temporarily shift their time zone by one hour.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Popular Time Zone Comparisons</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>New York to London - 5 hours difference</li>
                  <li>Los Angeles to Tokyo - 17 hours difference</li>
                  <li>London to Sydney - 10 hours difference</li>
                  <li>Dubai to Mumbai - 1.5 hours difference</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Tips for International Coordination</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use UTC as a reference point for global communication</li>
                  <li>Account for daylight saving time changes</li>
                  <li>Schedule meetings during overlapping business hours</li>
                  <li>Confirm time zones with participants to avoid confusion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}