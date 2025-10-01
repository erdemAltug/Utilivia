'use client'

import React from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo'

// Blog yazıları
const blogPosts = [
  {
    id: 'ultimate-guide-online-calculators',
    title: 'The Ultimate Guide to Online Calculators',
    excerpt: 'Discover how online calculators can simplify your daily tasks and boost productivity.',
    date: '2024-01-15',
    category: 'Guides',
    readTime: '8 min read',
    image: '/images/blog/calculators-guide.jpg'
  },
  {
    id: 'currency-conversion-best-practices',
    title: 'Currency Conversion Best Practices for Travelers',
    excerpt: 'Learn essential tips for accurate currency conversion when traveling internationally.',
    date: '2024-01-10',
    category: 'Finance',
    readTime: '6 min read',
    image: '/images/blog/currency-travel.jpg'
  },
  {
    id: 'understanding-bmi-health',
    title: 'Understanding BMI and Its Impact on Your Health',
    excerpt: 'Everything you need to know about Body Mass Index and maintaining a healthy lifestyle.',
    date: '2024-01-05',
    category: 'Health',
    readTime: '10 min read',
    image: '/images/blog/bmi-health.jpg'
  },
  {
    id: 'password-security-best-practices',
    title: 'Password Security Best Practices in 2024',
    excerpt: 'Protect your digital life with these essential password security tips.',
    date: '2023-12-28',
    category: 'Security',
    readTime: '7 min read',
    image: '/images/blog/password-security.jpg'
  },
  {
    id: 'time-zone-management-remote-work',
    title: 'Mastering Time Zone Management for Remote Teams',
    excerpt: 'Effective strategies for coordinating across multiple time zones in remote work environments.',
    date: '2023-12-20',
    category: 'Productivity',
    readTime: '9 min read',
    image: '/images/blog/timezone-remote.jpg'
  },
  {
    id: 'json-formatting-developers',
    title: 'JSON Formatting Essentials for Developers',
    excerpt: 'A comprehensive guide to formatting and validating JSON data effectively.',
    date: '2023-12-15',
    category: 'Development',
    readTime: '12 min read',
    image: '/images/blog/json-developers.jpg'
  }
]

export default function BlogPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog', isLast: true }
  ]

  return (
    <>
      <JsonLD data={generateWebApplicationSchema()} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Utilivia Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Insights, tips, and guides to help you make the most of our utility tools
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['All', 'Guides', 'Finance', 'Health', 'Security', 'Productivity', 'Development'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === 'All' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="h-48 bg-gray-200 border-2 border-dashed rounded-t-xl w-full" />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Stay Updated with Our Latest Tips
                </h2>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter and get the latest articles, tool updates, and exclusive tips delivered to your inbox.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}