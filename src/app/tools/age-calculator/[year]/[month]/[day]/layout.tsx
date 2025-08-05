import type { Metadata } from 'next'
import React from 'react'

interface Props {
  params: {
    year: string
    month: string
    day: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = parseInt(params.year)
  const month = parseInt(params.month)
  const day = parseInt(params.day)
  
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return {
      title: 'Invalid Date - Age Calculator'
    }
  }

  const birthDate = new Date(year, month - 1, day)
  const now = new Date()
  
  if (birthDate > now) {
    return {
      title: 'Future Date - Age Calculator'
    }
  }

  // Calculate age
  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  let days = now.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += lastDayOfPreviousMonth
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
  
  // Zodiac sign calculation
  const birthMonth = birthDate.getMonth() + 1
  const birthDay = birthDate.getDate()
  let zodiacSign = ''
  
  if ((birthMonth === 3 && birthDay >= 21) || (birthMonth === 4 && birthDay <= 19)) zodiacSign = 'Aries'
  else if ((birthMonth === 4 && birthDay >= 20) || (birthMonth === 5 && birthDay <= 20)) zodiacSign = 'Taurus'
  else if ((birthMonth === 5 && birthDay >= 21) || (birthMonth === 6 && birthDay <= 20)) zodiacSign = 'Gemini'
  else if ((birthMonth === 6 && birthDay >= 21) || (birthMonth === 7 && birthDay <= 22)) zodiacSign = 'Cancer'
  else if ((birthMonth === 7 && birthDay >= 23) || (birthMonth === 8 && birthDay <= 22)) zodiacSign = 'Leo'
  else if ((birthMonth === 8 && birthDay >= 23) || (birthMonth === 9 && birthDay <= 22)) zodiacSign = 'Virgo'
  else if ((birthMonth === 9 && birthDay >= 23) || (birthMonth === 10 && birthDay <= 22)) zodiacSign = 'Libra'
  else if ((birthMonth === 10 && birthDay >= 23) || (birthMonth === 11 && birthDay <= 21)) zodiacSign = 'Scorpio'
  else if ((birthMonth === 11 && birthDay >= 22) || (birthMonth === 12 && birthDay <= 21)) zodiacSign = 'Sagittarius'
  else if ((birthMonth === 12 && birthDay >= 22) || (birthMonth === 1 && birthDay <= 19)) zodiacSign = 'Capricorn'
  else if ((birthMonth === 1 && birthDay >= 20) || (birthMonth === 2 && birthDay <= 18)) zodiacSign = 'Aquarius'
  else zodiacSign = 'Pisces'

  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  const title = `Age Calculator ${formattedDate} - ${years} Years Old | ${zodiacSign} Zodiac Sign`

  return {
    title,
    description: `Calculate exact age for birth date ${formattedDate}. You are ${years} years, ${months} months, and ${days} days old. ${zodiacSign} zodiac sign. Free age calculator with fun facts and birthday countdown.`,
    keywords: [
      `age calculator ${formattedDate}`,
      `how old am i ${formattedDate}`,
      `birth date calculator ${year}`,
      `age finder ${month} ${day}`,
      `zodiac sign ${zodiacSign}`,
      `birthday calculator ${formattedDate}`,
      `${years} years old`,
      `age in days ${totalDays}`,
      `birth date ${formattedDate} age`,
      `calculate age from ${formattedDate}`
    ],
    authors: [{ name: 'Utilivia' }],
    creator: 'Utilivia',
    metadataBase: new URL('https://utilivia.com'),
    alternates: {
      canonical: `/tools/age-calculator/${params.year}/${params.month}/${params.day}`,
    },
    openGraph: {
      title: `Age Calculator ${formattedDate} - ${years} Years Old`,
      description: `Calculate exact age for birth date ${formattedDate}. You are ${years} years, ${months} months, and ${days} days old. ${zodiacSign} zodiac sign.`,
      type: 'website',
      url: `https://utilivia.com/tools/age-calculator/${params.year}/${params.month}/${params.day}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Age Calculator ${formattedDate} - ${years} Years Old`,
      description: `Calculate exact age for birth date ${formattedDate}. You are ${years} years, ${months} months, and ${days} days old. ${zodiacSign} zodiac sign.`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function AgeSpecificLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 