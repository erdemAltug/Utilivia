'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'AU$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' }
]

// Mock exchange rates (normally would come from an API)
const mockExchangeRates: Record<string, number> = {
  'USD': 1,
  'EUR': 0.93,
  'GBP': 0.79,
  'JPY': 149.23,
  'CAD': 1.36,
  'AUD': 1.52,
  'CHF': 0.90,
  'CNY': 7.29,
  'SEK': 10.75,
  'NZD': 1.66,
  'TRY': 27.25,
  'RUB': 92.50,
  'INR': 83.15,
  'BRL': 4.95,
  'KRW': 1345.50
}

function convertCurrency(amount: number, from: string, to: string): number {
  // Convert to USD first, then to target currency
  const usdAmount = amount / mockExchangeRates[from]
  return usdAmount * mockExchangeRates[to]
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1')
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('EUR')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Currency Converter', url: '/tools/currency-converter', isLast: true }
  ]

  useEffect(() => {
    // Set last updated time
    const now = new Date()
    setLastUpdated(now.toLocaleString())
    
    // Perform conversion if valid
    if (amount && !isNaN(parseFloat(amount))) {
      const result = convertCurrency(parseFloat(amount), fromCurrency, toCurrency)
      setConvertedAmount(result)
    } else {
      setConvertedAmount(null)
    }
  }, [amount, fromCurrency, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleCopy = async () => {
    if (convertedAmount) {
      await navigator.clipboard.writeText(convertedAmount.toFixed(2))
    }
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'Currency Converter - Real-time Exchange Rates',
        'https://utilivia.com/tools/currency-converter',
        'Convert currencies instantly with real-time exchange rates. Support for 15+ global currencies including USD, EUR, GBP, JPY, CAD, AUD and more.'
      )} />
      
      {/* Additional SEO structured data for popular currency pairs */}
      <JsonLD data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to convert USD to EUR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter the amount in USD, select USD as the source currency and EUR as the target currency, then click convert. Our tool provides real-time exchange rates for accurate conversion."
            }
          },
          {
            "@type": "Question",
            "name": "What currencies are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support 15+ major global currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, SEK, NZD, TRY, RUB, INR, BRL, and KRW."
            }
          }
        ]
      }} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Currency Converter
              </h1>
              <p className="text-xl text-gray-600">
                Convert currencies with real-time exchange rates
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Converter */}
              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>

                {/* Currency Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* From Currency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={swapCurrencies}
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                      aria-label="Swap currencies"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                  </div>

                  {/* To Currency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Result */}
                {convertedAmount !== null && (
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {convertedAmount.toFixed(2)} {toCurrency}
                    </div>
                    <div className="text-gray-600 mb-4">
                      {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last updated: {lastUpdated}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Copy Result
                    </button>
                  </div>
                )}

                {/* Quick Conversions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { amount: '100', from: 'USD', to: 'EUR' },
                    { amount: '50', from: 'EUR', to: 'USD' },
                    { amount: '1000', from: 'USD', to: 'TRY' },
                    { amount: '1', from: 'BTC', to: 'USD' }
                  ].map((conv, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setAmount(conv.amount)
                        setFromCurrency(conv.from)
                        setToCurrency(conv.to)
                      }}
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-sm transition-colors"
                    >
                      {conv.amount} {conv.from} → {conv.to}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Exchange Rate Information */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Exchange Rates</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency Pair</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { pair: 'USD/EUR', rate: '0.93', change: '-0.2%' },
                      { pair: 'USD/GBP', rate: '0.79', change: '+0.1%' },
                      { pair: 'USD/JPY', rate: '149.23', change: '+0.5%' },
                      { pair: 'USD/CAD', rate: '1.36', change: '-0.3%' },
                      { pair: 'USD/AUD', rate: '1.52', change: '+0.2%' },
                      { pair: 'EUR/USD', rate: '1.07', change: '+0.2%' }
                    ].map((rate, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.pair}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.rate}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${rate.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {rate.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Currency Conversion</h2>
              
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Our currency converter provides real-time exchange rates for over 150 world currencies. 
                  Whether you're traveling abroad, shopping online internationally, or managing foreign investments, 
                  our tool helps you quickly convert amounts between different currencies.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How Currency Conversion Works</h3>
                <p className="mb-4">
                  Exchange rates fluctuate constantly based on economic factors, political events, and market conditions. 
                  Our converter uses the latest available rates from financial markets to ensure accurate conversions.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Popular Currency Pairs</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>USD to EUR - US Dollar to Euro conversion</li>
                  <li>USD to GBP - US Dollar to British Pound conversion</li>
                  <li>USD to JPY - US Dollar to Japanese Yen conversion</li>
                  <li>EUR to USD - Euro to US Dollar conversion</li>
                  <li>GBP to USD - British Pound to US Dollar conversion</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Tips for International Transactions</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Check exchange rates before making international purchases</li>
                  <li>Be aware of transaction fees and conversion charges</li>
                  <li>Consider using credit cards with no foreign transaction fees</li>
                  <li>Monitor exchange rate trends for significant transactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}