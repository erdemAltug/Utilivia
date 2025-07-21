'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const SIMILAR_CHARS = 'il1Lo0O'

function generatePassword(options: PasswordOptions): string {
  let characters = ''
  
  if (options.includeUppercase) characters += UPPERCASE
  if (options.includeLowercase) characters += LOWERCASE
  if (options.includeNumbers) characters += NUMBERS
  if (options.includeSymbols) characters += SYMBOLS
  
  if (options.excludeSimilar) {
    characters = characters.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('')
  }
  
  if (characters === '') return ''
  
  let password = ''
  for (let i = 0; i < options.length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  
  return password
}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  if (score <= 2) return { score, label: 'Weak', color: 'text-red-600 bg-red-50' }
  if (score <= 4) return { score, label: 'Medium', color: 'text-yellow-600 bg-yellow-50' }
  return { score, label: 'Strong', color: 'text-green-600 bg-green-50' }
}

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false
  })
  
  const [passwords, setPasswords] = useState<string[]>([])
  const [passwordCount, setPasswordCount] = useState(1)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Password Generator', url: '/tools/password-generator', isLast: true }
  ]

  const handleGenerate = () => {
    const newPasswords = []
    for (let i = 0; i < passwordCount; i++) {
      newPasswords.push(generatePassword(options))
    }
    setPasswords(newPasswords)
  }

  const handleCopy = async (password: string) => {
    await navigator.clipboard.writeText(password)
  }

  const handleClear = () => {
    setPasswords([])
  }

  const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Password Generator - Strong & Secure Password Creator',
        'https://utilivia.com/tools/password-generator',
        'Generate strong, secure passwords instantly. Customizable length, character sets, and security options. Create unique passwords for all your accounts.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Password Generator
              </h1>
              <p className="text-xl text-gray-600">
                Create strong, secure passwords for your accounts
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Password Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Length: {options.length}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={options.length}
                    onChange={(e) => updateOption('length', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Passwords: {passwordCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={passwordCount}
                    onChange={(e) => setPasswordCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              {/* Character Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.includeUppercase}
                    onChange={(e) => updateOption('includeUppercase', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Uppercase letters (A-Z)
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.includeLowercase}
                    onChange={(e) => updateOption('includeLowercase', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Lowercase letters (a-z)
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.includeNumbers}
                    onChange={(e) => updateOption('includeNumbers', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Numbers (0-9)
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options.includeSymbols}
                    onChange={(e) => updateOption('includeSymbols', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Symbols (!@#$%^&*)
                  </span>
                </label>

                <label className="flex items-center space-x-3 md:col-span-2">
                  <input
                    type="checkbox"
                    checked={options.excludeSimilar}
                    onChange={(e) => updateOption('excludeSimilar', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Exclude similar characters (i, l, 1, L, o, 0, O)
                  </span>
                </label>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={handleGenerate}
                  disabled={!options.includeUppercase && !options.includeLowercase && !options.includeNumbers && !options.includeSymbols}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Generate Password{passwordCount > 1 ? 's' : ''}
                </button>
                {passwords.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Generated Passwords */}
              {passwords.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Passwords</h3>
                  {passwords.map((password, index) => {
                    const strength = getPasswordStrength(password)
                    return (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${strength.color}`}>
                            {strength.label}
                          </span>
                          <button
                            onClick={() => handleCopy(password)}
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <div className="font-mono text-lg break-all bg-white border rounded p-3">
                          {password}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {passwords.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">🔐</div>
                  <p className="text-lg">Configure options and generate secure passwords</p>
                </div>
              )}
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Password Security Tips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Strong Password Characteristics</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>At least 12 characters long</li>
                    <li>Mix of uppercase and lowercase letters</li>
                    <li>Include numbers and symbols</li>
                    <li>Avoid dictionary words</li>
                    <li>Don't use personal information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use unique passwords for each account</li>
                    <li>Enable two-factor authentication</li>
                    <li>Store passwords in a password manager</li>
                    <li>Update passwords regularly</li>
                    <li>Never share passwords</li>
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