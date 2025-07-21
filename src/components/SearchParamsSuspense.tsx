import React, { Suspense } from 'react'

interface SearchParamsSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function SearchParamsSuspense({ children, fallback = <div>Loading...</div> }: SearchParamsSuspenseProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
} 