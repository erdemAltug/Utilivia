import React from 'react'

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    {children}
  </div>
}