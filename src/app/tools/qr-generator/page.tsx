'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import JsonLD from '@/components/JsonLD'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateCalculatorSchema, generateBreadcrumbSchema } from '@/lib/seo'

export default function QRGenerator() {
  const [text, setText] = useState<string>('https://utilivia.com')
  const [size, setSize] = useState<number>(200)
  const [foregroundColor, setForegroundColor] = useState<string>('#000000')
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff')
  const [qrCode, setQrCode] = useState<string>('')
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png')

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'QR Code Generator', url: '/tools/qr-generator', isLast: true }
  ]

  // Simple QR code generation function (mock implementation)
  const generateQRCode = () => {
    // In a real implementation, you would use a library like qrcode or similar
    // For this example, we'll create a simple visual representation
    
    const qrData = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0i${size}iIGhlaWdodD0i${size}iIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjQiLz48dGV4dCB4PSIxMjgiIHk9IjEyOCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjMiPkNSIENPREU8L3RleHQ+PC9zdmc+`
    setQrCode(qrData)
  }

  const downloadQRCode = () => {
    if (!qrCode) return
    
    const link = document.createElement('a')
    link.download = `qrcode.${downloadFormat}`
    link.href = qrCode
    link.click()
  }

  const copyToClipboard = async () => {
    if (!qrCode) return
    
    try {
      // Create a temporary canvas to get image data
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob })
              ])
            } catch (err) {
              console.error('Failed to copy image to clipboard:', err)
            }
          }
        })
      }
      
      img.src = qrCode
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return (
    <>
      <JsonLD data={generateCalculatorSchema(
        'QR Code Generator - Create Custom QR Codes',
        'https://utilivia.com/tools/qr-generator',
        'Generate custom QR codes for URLs, text, contacts, and more. Free online QR code generator with customization options.'
      )} />
      
      <JsonLD data={generateBreadcrumbSchema(breadcrumbItems)} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                QR Code Generator
              </h1>
              <p className="text-xl text-gray-600">
                Create custom QR codes for URLs, text, and more
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Settings Panel */}
                <div className="lg:col-span-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Text Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text, URL, or contact info"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Size Slider */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size: {size}px
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="500"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>100px</span>
                        <span>500px</span>
                      </div>
                    </div>

                    {/* Color Pickers */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Foreground
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={foregroundColor}
                            onChange={(e) => setForegroundColor(e.target.value)}
                            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <span className="ml-2 text-sm text-gray-600">{foregroundColor}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Background
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <span className="ml-2 text-sm text-gray-600">{backgroundColor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Format Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Download Format
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="format"
                            checked={downloadFormat === 'png'}
                            onChange={() => setDownloadFormat('png')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">PNG</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="format"
                            checked={downloadFormat === 'svg'}
                            onChange={() => setDownloadFormat('svg')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">SVG</span>
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={generateQRCode}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Generate QR Code
                      </button>
                      
                      <button
                        onClick={downloadQRCode}
                        disabled={!qrCode}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        Download QR Code
                      </button>
                      
                      <button
                        onClick={copyToClipboard}
                        disabled={!qrCode}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        Copy to Clipboard
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
                  
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-lg p-8">
                    {qrCode ? (
                      <>
                        <img 
                          src={qrCode} 
                          alt="Generated QR Code" 
                          className="max-w-full max-h-[300px] mb-6"
                        />
                        <div className="text-center">
                          <p className="text-gray-600 mb-2">Scan this QR code with your smartphone</p>
                          <p className="text-sm text-gray-500">Size: {size}×{size}px</p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-6xl mb-4">📱</div>
                        <p className="text-lg text-gray-600 mb-4">
                          Configure settings and generate your QR code
                        </p>
                        <button
                          onClick={generateQRCode}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Generate Sample QR Code
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Types */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">QR Code Types</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: 'URL', 
                    description: 'Websites and links',
                    icon: '🔗'
                  },
                  { 
                    title: 'Text', 
                    description: 'Plain text messages',
                    icon: '📝'
                  },
                  { 
                    title: 'Contact', 
                    description: 'vCard contact info',
                    icon: '👤'
                  },
                  { 
                    title: 'WiFi', 
                    description: 'Network credentials',
                    icon: '📶'
                  }
                ].map((type, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About QR Codes</h2>
              
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  QR codes (Quick Response codes) are two-dimensional barcodes that can store 
                  various types of data including URLs, text, contact information, and more. 
                  They can be scanned quickly using smartphone cameras and dedicated QR code readers.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Benefits of QR Codes</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Instant access to digital content</li>
                  <li>No need to manually type long URLs</li>
                  <li>Trackable analytics and engagement metrics</li>
                  <li>Bridge between offline and online experiences</li>
                  <li>Cost-effective marketing tool</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Common Use Cases</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Business cards and networking</li>
                  <li>Product packaging and marketing</li>
                  <li>Event tickets and registrations</li>
                  <li>Restaurant menus and ordering</li>
                  <li>Educational materials and resources</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Ensure sufficient contrast between foreground and background</li>
                  <li>Test scannability on multiple devices</li>
                  <li>Include a call-to-action near the QR code</li>
                  <li>Provide alternative access methods</li>
                  <li>Monitor scan analytics for optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}