import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Free Password Generator - Strong & Secure Password Creator',
  description: 'Generate strong, secure passwords instantly. Customizable length, character sets, and security options. Create unique passwords for all your accounts. Free online password generator.',
  keywords: [
    'password generator',
    'strong password generator',
    'secure password',
    'random password',
    'password creator',
    'unique password',
    'safe password',
    'password maker',
    'security password',
    'complex password'
  ],
  openGraph: {
    title: 'Free Password Generator - Strong & Secure Password Creator | Utilivia',
    description: 'Generate strong, secure passwords instantly. Customizable length, character sets, and security options. Create unique passwords for all your accounts.',
    type: 'website',
    url: 'https://utilivia.com/tools/password-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Password Generator - Strong & Secure Password Creator',
    description: 'Generate strong, secure passwords instantly. Customizable length, character sets, and security options. Create unique passwords for all your accounts.',
  },
  alternates: {
    canonical: '/tools/password-generator',
  },
}

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 