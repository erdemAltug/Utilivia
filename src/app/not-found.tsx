import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Utilivia',
  description: 'Sorry, the page you are looking for does not exist. Explore our free online utility tools instead.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            🏠 Go Home
          </Link>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Link href="/tools/bmi-calculator" className="text-blue-600 hover:text-blue-800">
              BMI Calculator
            </Link>
            <Link href="/tools/age-calculator" className="text-blue-600 hover:text-blue-800">
              Age Calculator
            </Link>
            <Link href="/tools/unit-converter" className="text-blue-600 hover:text-blue-800">
              Unit Converter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 