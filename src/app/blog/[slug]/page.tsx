'use client'

import React from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo'

// Blog post data - normally this would come from a database or CMS
const blogPosts: Record<string, any> = {
  'ultimate-guide-online-calculators': {
    title: 'The Ultimate Guide to Online Calculators',
    date: '2024-01-15',
    category: 'Guides',
    readTime: '8 min read',
    author: 'Utilivia Team',
    content: `
      <p>In today's fast-paced digital world, online calculators have become indispensable tools that simplify complex calculations and save valuable time. Whether you're a student, professional, or simply someone who needs quick answers, online calculators offer unparalleled convenience and accuracy.</p>
      
      <h2>What Are Online Calculators?</h2>
      <p>Online calculators are web-based applications that perform mathematical computations, conversions, and other calculations through your internet browser. Unlike traditional handheld calculators, online calculators offer specialized functions tailored to specific needs, from simple arithmetic to complex financial modeling.</p>
      
      <h2>Benefits of Using Online Calculators</h2>
      <p>The advantages of online calculators extend far beyond basic computation:</p>
      <ul>
        <li><strong>Accessibility</strong>: Access from any device with internet connection</li>
        <li><strong>Variety</strong>: Hundreds of specialized calculators for different purposes</li>
        <li><strong>Updates</strong>: Automatic updates with the latest algorithms and data</li>
        <li><strong>Sharing</strong>: Easy sharing of results and calculations</li>
        <li><strong>No Installation</strong>: No software downloads or installations required</li>
      </ul>
      
      <h2>Types of Online Calculators</h2>
      <p>Modern online calculator platforms like Utilivia offer diverse categories:</p>
      
      <h3>Financial Calculators</h3>
      <p>Currency converters, loan calculators, investment tools, and budget planners help manage personal and business finances effectively.</p>
      
      <h3>Health and Fitness Calculators</h3>
      <p>BMI calculators, calorie counters, and workout planners support wellness goals and health monitoring.</p>
      
      <h3>Technical Calculators</h3>
      <p>Unit converters, programming tools, and development utilities streamline technical tasks.</p>
      
      <h3>Everyday Utilities</h3>
      <p>Date calculators, password generators, and text tools solve common daily challenges.</p>
      
      <h2>Choosing the Right Online Calculator</h2>
      <p>When selecting online calculators, consider these factors:</p>
      <ol>
        <li><strong>Accuracy</strong>: Verify calculations against trusted sources</li>
        <li><strong>User Interface</strong>: Clean, intuitive design enhances usability</li>
        <li><strong>Features</strong>: Look for additional helpful functionalities</li>
        <li><strong>Privacy</strong>: Ensure your data remains secure and private</li>
        <li><strong>Support</strong>: Access to help and documentation when needed</li>
      </ol>
      
      <h2>Future of Online Calculators</h2>
      <p>As technology advances, online calculators continue evolving with AI integration, voice commands, and enhanced mobile experiences. Platforms like Utilivia lead this innovation by combining powerful functionality with user-friendly design.</p>
      
      <h2>Conclusion</h2>
      <p>Online calculators represent a perfect blend of technology and practicality. By leveraging these tools effectively, you can enhance productivity, make informed decisions, and tackle complex problems with confidence. Whether you're calculating mortgage payments, converting measurements, or generating secure passwords, online calculators provide the precision and convenience needed in our digital age.</p>
    `
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blog" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${params.slug}`, isLast: true }
  ]

  return (
    <>
      <JsonLD data={generateWebApplicationSchema()} />
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">Utilivia Team</p>
                </div>
              </div>
              
              <div 
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            
            {/* Related Posts */}
            <div className="bg-gray-50 p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/blog/currency-conversion-best-practices" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">Currency Conversion Best Practices</h3>
                  <p className="text-sm text-gray-600">Essential tips for accurate currency conversion when traveling internationally.</p>
                </Link>
                
                <Link href="/blog/understanding-bmi-health" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">Understanding BMI and Health</h3>
                  <p className="text-sm text-gray-600">Everything you need to know about Body Mass Index and maintaining a healthy lifestyle.</p>
                </Link>
              </div>
            </div>
          </article>
          
          {/* Newsletter Signup */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get More Tips Like This
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter and receive exclusive guides, tool updates, and productivity tips.
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
    </>
  )
}