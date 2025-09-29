'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface IPLocationData {
  ip: string
  hostname?: string
  city: string
  region: string
  country: string
  country_code: string
  postal: string
  latitude: number
  longitude: number
  timezone: string
  isp: string
  org?: string
  asn?: string
  flag: string
}

// Mock data for demonstration
const mockIPData: Record<string, IPLocationData> = {
  '8.8.8.8': {
    ip: '8.8.8.8',
    hostname: 'dns.google',
    city: 'Mountain View',
    region: 'California',
    country: 'United States',
    country_code: 'US',
    postal: '94043',
    latitude: 37.4056,
    longitude: -122.0775,
    timezone: 'America/Los_Angeles',
    isp: 'Google LLC',
    org: 'Google LLC',
    asn: 'AS15169',
    flag: '🇺🇸'
  },
  '1.1.1.1': {
    ip: '1.1.1.1',
    hostname: 'one.one.one.one',
    city: 'Los Angeles',
    region: 'California',
    country: 'United States',
    country_code: 'US',
    postal: '90009',
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: 'America/Los_Angeles',
    isp: 'Cloudflare, Inc.',
    org: 'APNIC and Cloudflare DNS Resolver project',
    asn: 'AS13335',
    flag: '🇺🇸'
  },
  '216.58.214.14': {
    ip: '216.58.214.14',
    hostname: 'sea30s08-in-f14.1e100.net',
    city: 'Mountain View',
    region: 'California',
    country: 'United States',
    country_code: 'US',
    postal: '94043',
    latitude: 37.4056,
    longitude: -122.0775,
    timezone: 'America/Los_Angeles',
    isp: 'Google LLC',
    org: 'Google LLC',
    asn: 'AS15169',
    flag: '🇺🇸'
  }
}

export default function IPLookup() {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [locationData, setLocationData] = useState<IPLocationData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'IP Address Lookup', url: '/tools/ip-lookup', isLast: true }
  ]

  const lookupIP = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Use mock data for demonstration
      const ip = ipAddress || '8.8.8.8' // Default to Google DNS
      const data = mockIPData[ip] || mockIPData['8.8.8.8']
      
      setLocationData(data)
    } catch (err: any) {
      setError('Failed to lookup IP address. Please try again.')
      setLocationData(null)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentIP = async () => {
    try {
      setLoading(true)
      setError('')
      setIpAddress('')
      
      // Simulate getting current IP
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Use default mock data
      const data = mockIPData['8.8.8.8']
      setLocationData(data)
    } catch (err: any) {
      setError('Failed to get current IP address. Please try again.')
      setLocationData(null)
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setLocationData(null)
    setError('')
    setIpAddress('')
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'IP Address Lookup - Find Location & ISP Information',
        'https://utilivia.com/tools/ip-lookup',
        'Find geographic location, ISP, and network information for any IP address. Free IP lookup tool with detailed location data.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                IP Address Lookup
              </h1>
              <p className="text-xl text-gray-600">
                Find location and ISP information for any IP address
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* IP Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IP Address
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    placeholder="Enter IP address (e.g., 8.8.8.8)"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={lookupIP}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Looking up...' : 'Lookup IP'}
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={getCurrentIP}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  My Current IP
                </button>
                <button
                  onClick={clearResults}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear Results
                </button>
                <button
                  onClick={() => setIpAddress('8.8.8.8')}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Google DNS (8.8.8.8)
                </button>
                <button
                  onClick={() => setIpAddress('1.1.1.1')}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Cloudflare (1.1.1.1)
                </button>
              </div>

              {/* Results */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {locationData && (
                <div className="space-y-6">
                  {/* IP Overview */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {locationData.ip}
                        </h3>
                        <p className="text-gray-600">
                          {locationData.hostname && `Hostname: ${locationData.hostname}`}
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {locationData.flag} {locationData.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Location</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">City</span>
                          <span className="font-medium">{locationData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Region</span>
                          <span className="font-medium">{locationData.region}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Country</span>
                          <span className="font-medium">{locationData.country} ({locationData.country_code})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Postal Code</span>
                          <span className="font-medium">{locationData.postal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coordinates</span>
                          <span className="font-medium">{locationData.latitude}, {locationData.longitude}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timezone</span>
                          <span className="font-medium">{locationData.timezone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Network</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ISP</span>
                          <span className="font-medium">{locationData.isp}</span>
                        </div>
                        {locationData.org && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Organization</span>
                            <span className="font-medium">{locationData.org}</span>
                          </div>
                        )}
                        {locationData.asn && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">ASN</span>
                            <span className="font-medium">{locationData.asn}</span>
                          </div>
                        )}
                        <div className="pt-4">
                          <button
                            onClick={() => {
                              // In a real app, this would open a map
                              alert(`Opening map for coordinates: ${locationData.latitude}, ${locationData.longitude}`)
                            }}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            View on Map
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!locationData && !error && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌐</div>
                  <p className="text-lg text-gray-600">
                    Enter an IP address above to lookup location information
                  </p>
                </div>
              )}
            </div>

            {/* IP Information */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About IP Addresses</h2>
              
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  An Internet Protocol (IP) address is a numerical label assigned to each device 
                  connected to a computer network that uses the Internet Protocol for communication. 
                  IP addresses serve two main functions: host or network interface identification 
                  and location addressing.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Types of IP Addresses</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>IPv4</strong>: 32-bit address (e.g., 192.168.1.1) - Most common</li>
                  <li><strong>IPv6</strong>: 128-bit address (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334) - Future standard</li>
                  <li><strong>Public IP</strong>: Unique address visible on the internet</li>
                  <li><strong>Private IP</strong>: Internal address used within networks</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Why Lookup IP Addresses?</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Troubleshoot network connectivity issues</li>
                  <li>Identify geographic location of visitors</li>
                  <li>Analyze website traffic sources</li>
                  <li>Detect suspicious or malicious activity</li>
                  <li>Verify CDN or proxy configurations</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Privacy Considerations</h3>
                <p>
                  While IP address lookup can provide useful information, it's important to respect 
                  privacy and comply with applicable laws. IP addresses can reveal approximate 
                  geographic locations but do not identify specific individuals.
                </p>
              </div>
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">IP Address Lookup Guide</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Use Cases</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Website analytics and visitor tracking</li>
                    <li>Network diagnostics and troubleshooting</li>
                    <li>Security monitoring and threat detection</li>
                    <li>Content delivery optimization</li>
                    <li>Geographic content restriction testing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>IPv4 addresses are 32-bit numbers</li>
                    <li>IPv6 addresses are 128-bit numbers</li>
                    <li>Dynamic IPs change periodically</li>
                    <li>Static IPs remain constant</li>
                    <li>NAT allows multiple devices to share one public IP</li>
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