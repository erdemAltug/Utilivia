
import React from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import { generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utilivia - Free Online Utility Tools',
  description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator, age calculator and more useful tools.',
  keywords: ['utility tools', 'calculator', 'converter', 'BMI calculator', 'unit converter', 'password generator', 'free online tools'],
  openGraph: {
    title: 'Utilivia - Free Online Utility Tools',
    description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator and more.',
    url: 'https://utilivia.com',
    siteName: 'Utilivia',
    images: [
      {
        url: 'https://utilivia.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Utilivia - Free Online Utility Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utilivia - Free Online Utility Tools',
    description: 'Free online utility tools for everyday tasks. BMI calculator, unit converter, password generator and more.',
    images: ['https://utilivia.com/og-image.jpg'],
  },
}

const tools = [
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index with height and weight',
    icon: '⚖️',
    category: 'Health & Fitness',
    difficulty: 1,
    url: '/tools/bmi-calculator',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
    borderColor: 'border-pink-200'
  },
  {
    name: 'Age Calculator',
    description: 'Calculate age based on birth date with precision',
    icon: '📅',
    category: 'Date & Time',
    difficulty: 1,
    url: '/tools/age-calculator',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200'
  },
  {
    name: 'Unit Converter',
    description: 'Convert between cm↔inch, kg↔lb, L↔gallon and more',
    icon: '📏',
    category: 'Math & Conversion',
    difficulty: 2,
    url: '/tools/unit-converter',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    borderColor: 'border-green-200'
  },
  {
    name: 'Text Case Converter',
    description: 'Convert text to lowercase, UPPERCASE, camelCase formats',
    icon: '📝',
    category: 'Text Tools',
    difficulty: 1,
    url: '/tools/text-case-converter',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
    borderColor: 'border-purple-200'
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for web design and development',
    icon: '📄',
    category: 'Content Creation',
    difficulty: 1,
    url: '/tools/lorem-generator',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
    borderColor: 'border-orange-200'
  },
  {
    name: 'Password Generator',
    description: 'Generate strong, secure passwords for all your accounts',
    icon: '🔐',
    category: 'Security',
    difficulty: 1,
    url: '/tools/password-generator',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
    borderColor: 'border-red-200'
  },
  {
    name: 'Base64 Encode/Decode',
    description: 'Encode and decode text using Base64 encoding',
    icon: '🔓',
    category: 'Developer Tools',
    difficulty: 2,
    url: '/tools/base64-encoder',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
    borderColor: 'border-teal-200'
  }
]

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Instant calculations and conversions with no waiting time'
  },
  {
    icon: '🔒',
    title: '100% Secure',
    description: 'All calculations happen locally, your data never leaves your device'
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description: 'Perfect experience on all devices - desktop, tablet, and mobile'
  },
  {
    icon: '🎯',
    title: 'SEO Optimized',
    description: 'Thousands of dynamic URLs for maximum search engine visibility'
  }
]

const stats = [
  { number: '1000+', label: 'Dynamic URLs' },
  { number: '12+', label: 'Utility Tools' },
  { number: '100%', label: 'Free Forever' },
  { number: '24/7', label: 'Available' }
]

export default function Home() {
  return (
    <>
      <JsonLD data={generateWebApplicationSchema()} />
      <JsonLD data={generateFAQSchema()} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">U</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Utilivia
                  </h1>
                  <span className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 rounded-full">
                    Free Tools
                  </span>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Tools
                </Link>
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  About
                </Link>
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative container mx-auto px-4 py-20 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
                <span className="text-white text-sm">🚀</span>
                <span className="text-white text-sm font-medium">Free Online Utility Tools</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Powerful Tools for
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Everyday Tasks
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Calculate, convert, generate, and optimize - all in one place. 
                Professional-grade utilities designed for speed, accuracy, and ease of use.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#tools"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Explore Tools
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Choose Your Tool
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional-grade utilities designed for speed, accuracy, and ease of use. 
                Each tool is optimized for both beginners and professionals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <Link 
                  key={tool.name}
                  href={tool.url}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`absolute inset-0 ${tool.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 ${tool.bgColor} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                        {tool.icon}
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${tool.bgColor} ${tool.borderColor} border`}>
                        {tool.category}
                      </span>
                      
                      <div className="flex items-center space-x-1 text-gray-400">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${i < tool.difficulty ? 'bg-blue-500' : 'bg-gray-300'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      Try Now
                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Utilivia?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've built the most comprehensive collection of online utility tools 
                with a focus on speed, accuracy, and user experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of users who trust Utilivia for their daily utility needs. 
              Start using our tools today - completely free!
            </p>
            
            <Link 
              href="#tools"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Using Tools
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">U</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Utilivia</h3>
                    <p className="text-gray-400">Free Online Utility Tools</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Professional-grade utility tools designed for speed, accuracy, and ease of use. 
                  Calculate, convert, generate, and optimize - all in one place.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Tools</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/tools/bmi-calculator" className="hover:text-white transition-colors">BMI Calculator</Link></li>
                  <li><Link href="/tools/age-calculator" className="hover:text-white transition-colors">Age Calculator</Link></li>
                  <li><Link href="/tools/unit-converter" className="hover:text-white transition-colors">Unit Converter</Link></li>
                  <li><Link href="/tools/password-generator" className="hover:text-white transition-colors">Password Generator</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Utilivia. All rights reserved. Made with ❤️ for the community.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 