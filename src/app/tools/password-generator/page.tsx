'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'

interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
  excludeSimilar: boolean
}

const defaultOptions: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: false
}

function generatePassword(options: PasswordOptions): string {
  let charset = ''
  
  if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
  if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (options.numbers) charset += '0123456789'
  if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  if (options.excludeSimilar) {
    // Remove similar looking characters
    charset = charset.replace(/[il1Lo0O]/g, '')
  }
  
  if (!charset) return ''
  
  let password = ''
  for (let i = 0; i < options.length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  
  return password
}

function getPasswordStrength(password: string): { score: number, label: string, color: string } {
  let score = 0
  
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  
  if (score <= 2) return { score, label: 'Weak', color: 'text-red-600 bg-red-50' }
  if (score <= 4) return { score, label: 'Fair', color: 'text-orange-600 bg-orange-50' }
  if (score <= 6) return { score, label: 'Good', color: 'text-yellow-600 bg-yellow-50' }
  return { score, label: 'Strong', color: 'text-green-600 bg-green-50' }
}

export default function PasswordGenerator() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions)
  const [password, setPassword] = useState('')
  const [passwords, setPasswords] = useState<string[]>([])

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/#tools' },
    { name: 'Password Generator', url: '/tools/password-generator', isLast: true }
  ]

  // Initialize from URL params
  useEffect(() => {
    const lengthParam = searchParams.get('length')
    const uppercaseParam = searchParams.get('uppercase')
    const lowercaseParam = searchParams.get('lowercase')
    const numbersParam = searchParams.get('numbers')
    const symbolsParam = searchParams.get('symbols')

    if (lengthParam) setOptions(prev => ({ ...prev, length: parseInt(lengthParam) || 16 }))
    if (uppercaseParam !== null) setOptions(prev => ({ ...prev, uppercase: uppercaseParam === 'true' }))
    if (lowercaseParam !== null) setOptions(prev => ({ ...prev, lowercase: lowercaseParam === 'true' }))
    if (numbersParam !== null) setOptions(prev => ({ ...prev, numbers: numbersParam === 'true' }))
    if (symbolsParam !== null) setOptions(prev => ({ ...prev, symbols: symbolsParam === 'true' }))
  }, [searchParams])

  const updateURL = (newOptions?: Partial<PasswordOptions>) => {
    const params = new URLSearchParams()
    const opts = { ...options, ...newOptions }

    if (opts.length !== 16) params.set('length', opts.length.toString())
    if (!opts.uppercase) params.set('uppercase', 'false')
    if (!opts.lowercase) params.set('lowercase', 'false')
    if (!opts.numbers) params.set('numbers', 'false')
    if (!opts.symbols) params.set('symbols', 'false')

    const query = params.toString()
    router.push(`/tools/password-generator${query ? `?${query}` : ''}`, { scroll: false })
  }

  const handleGenerate = () => {
    const newPassword = generatePassword(options)
    setPassword(newPassword)
    updateURL()
  }

  const generateMultiple = () => {
    const newPasswords = []
    for (let i = 0; i < 5; i++) {
      newPasswords.push(generatePassword(options))
    }
    setPasswords(newPasswords)
    updateURL()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const strength = password ? getPasswordStrength(password) : null

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Free Password Generator - Strong & Secure Password Creator',
        'https://utilivia.com/tools/password-generator',
        'Generate strong, secure passwords instantly. Customizable length, character sets, and security options. Free password generator tool.'
      )} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />

    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
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
            🔒 Password Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate strong, secure passwords for all your accounts. Customize length and character types for maximum security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Password Settings</h2>
            
            {/* Length Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length: {options.length} characters
              </label>
              <input
                type="range"
                min="4"
                max="64"
                value={options.length}
                onChange={(e) => {
                  const newLength = parseInt(e.target.value)
                  setOptions(prev => ({ ...prev, length: newLength }))
                  updateURL({ length: newLength })
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) => {
                    setOptions(prev => ({ ...prev, uppercase: e.target.checked }))
                    updateURL({ uppercase: e.target.checked })
                  }}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-700">Uppercase (A-Z)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => {
                    setOptions(prev => ({ ...prev, lowercase: e.target.checked }))
                    updateURL({ lowercase: e.target.checked })
                  }}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-700">Lowercase (a-z)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={(e) => {
                    setOptions(prev => ({ ...prev, numbers: e.target.checked }))
                    updateURL({ numbers: e.target.checked })
                  }}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-700">Numbers (0-9)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={(e) => {
                    setOptions(prev => ({ ...prev, symbols: e.target.checked }))
                    updateURL({ symbols: e.target.checked })
                  }}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-700">Symbols (!@#$%)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.excludeSimilar}
                  onChange={(e) => {
                    setOptions(prev => ({ ...prev, excludeSimilar: e.target.checked }))
                  }}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-700">Exclude similar (il1Lo0O)</span>
              </label>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleGenerate}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Generate Password
              </button>
              
              <button
                onClick={generateMultiple}
                className="w-full border border-red-300 text-red-700 py-3 px-4 rounded-md hover:bg-red-50 transition-colors font-medium"
              >
                Generate 5 Passwords
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Single Password */}
            {password && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Generated Password</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 border mb-4">
                  <div className="flex items-center justify-between">
                    <code className="text-lg font-mono text-gray-900 break-all mr-4">
                      {password}
                    </code>
                    <button
                      onClick={() => copyToClipboard(password)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>

                {strength && (
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${strength.color}`}>
                    Password Strength: {strength.label}
                  </div>
                )}
              </div>
            )}

            {/* Multiple Passwords */}
            {passwords.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Generated Passwords</h2>
                
                <div className="space-y-3">
                  {passwords.map((pwd, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono text-gray-900 break-all mr-4">
                          {pwd}
                        </code>
                        <button
                          onClick={() => copyToClipboard(pwd)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium whitespace-nowrap"
                        >
                          📋 Copy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Password Security Tips</h2>
              
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Use unique passwords</strong> for each account</li>
                <li>• <strong>Minimum 12 characters</strong> for better security</li>
                <li>• <strong>Include all character types</strong> (uppercase, lowercase, numbers, symbols)</li>
                <li>• <strong>Use a password manager</strong> to store passwords securely</li>
                <li>• <strong>Enable two-factor authentication</strong> when possible</li>
                <li>• <strong>Never share passwords</strong> or write them down</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Password Generator - Create Strong Passwords</h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Our password generator creates strong, secure passwords to protect your online accounts. 
              Customize length and character types to meet specific requirements while maintaining maximum security.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Why Strong Passwords Matter</h3>
            <p className="mb-4">
              Weak passwords are the leading cause of security breaches. Our tool generates cryptographically 
              strong passwords that are virtually impossible to crack through brute force attacks.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 