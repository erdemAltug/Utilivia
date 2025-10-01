'use client'

import React from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo'

export default function ResourcesPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources', isLast: true }
  ]

  const resourceCategories = [
    {
      title: 'Ultimate Guide to Online Calculators',
      description: 'Comprehensive resource covering all aspects of online calculators',
      url: '/blog/ultimate-guide-online-calculators',
      category: 'Guide'
    },
    {
      title: 'Complete Currency Conversion Resource',
      description: 'Everything you need to know about currency conversion tools',
      url: '#',
      category: 'Financial'
    },
    {
      title: 'Developer Tools Encyclopedia',
      description: 'Extensive collection of developer utilities and resources',
      url: '#',
      category: 'Technical'
    },
    {
      title: 'Health and Wellness Calculators',
      description: 'Collection of health-related calculation tools and guides',
      url: '#',
      category: 'Health'
    }
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
                Resources Hub
              </h1>
              <p className="text-xl text-gray-600">
                Comprehensive guides, tools, and resources to maximize your productivity
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resourceCategories.map((resource, index) => (
                  <Link
                    key={index}
                    href={resource.url}
                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                        {resource.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      {resource.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resource Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Financial Tools', count: 12, icon: '💰' },
                  { title: 'Health Calculators', count: 8, icon: '❤️' },
                  { title: 'Developer Utilities', count: 15, icon: '💻' },
                  { title: 'Productivity Helpers', count: 10, icon: '📈' },
                  { title: 'Educational Resources', count: 7, icon: '📚' },
                  { title: 'Business Tools', count: 9, icon: '🏢' }
                ].map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.count} resources</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contribute Resources</h2>
              
              <p className="text-gray-600 mb-6">
                Have a valuable resource to share? We're always looking for high-quality content 
                to add to our collection. Submit your resources and help our community grow.
              </p>
              
              <Link 
                href="/contact" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit a Resource
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}