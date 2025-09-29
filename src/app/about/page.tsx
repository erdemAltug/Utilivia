'use client'

import React from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo'

export default function AboutPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about', isLast: true }
  ]

  return (
    <>
      <JsonLD data={generateWebApplicationSchema()} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                About Utilivia
              </h1>
              <p className="text-xl text-gray-600">
                Your go-to destination for free, fast, and reliable online utility tools
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="prose max-w-none text-gray-600">
                <p className="mb-6 text-lg">
                  Welcome to Utilivia, where simplicity meets functionality. We're passionate about 
                  creating powerful, easy-to-use tools that make your daily tasks easier and more efficient.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
                <p className="mb-6">
                  Our mission is to provide high-quality, accessible utility tools that empower 
                  individuals and businesses to accomplish more with less effort. We believe that 
                  the right tools can transform complex tasks into simple actions.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Sets Us Apart</h2>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li><strong>100% Free</strong> - No hidden fees or premium features</li>
                  <li><strong>Privacy First</strong> - All calculations happen in your browser</li>
                  <li><strong>Lightning Fast</strong> - Instant results with optimized algorithms</li>
                  <li><strong>Mobile Friendly</strong> - Works perfectly on all devices</li>
                  <li><strong>Regular Updates</strong> - New tools and features added weekly</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Story</h2>
                <p className="mb-6">
                  Founded in 2024, Utilivia began as a personal project to solve everyday calculation 
                  and conversion needs. What started as a few simple tools quickly grew into a 
                  comprehensive suite of utilities used by thousands of people worldwide.
                </p>
                <p className="mb-6">
                  Today, we continue to expand our collection with new tools designed to address 
                  real-world challenges. Our team of developers and designers work tirelessly to 
                  ensure every tool is intuitive, accurate, and valuable.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Simplicity</h3>
                    <p>We believe the best tools are the simplest to use. Complexity should be 
                    invisible to users.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
                    <p>Accuracy and dependability are non-negotiable. You can count on our tools 
                    to deliver precise results every time.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
                    <p>Everyone deserves access to quality tools regardless of technical expertise 
                    or financial means.</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                    <p>We continuously explore new ways to solve problems and improve user experience.</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Join Our Community</h2>
                <p className="mb-6">
                  We're more than just a collection of tools - we're a community of users who share 
                  ideas, provide feedback, and help shape the future of Utilivia. Whether you're a 
                  student, professional, or hobbyist, there's a place for you here.
                </p>
                <p>
                  Have a suggestion for a new tool? Found a bug? Want to contribute? We'd love to
                  hear from you. Reach out through our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}