import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Vidhya Kendra - Teacher Management System',
  description: 'Vidhya Kendra Teacher Management System - Manage classes, attendance, homework, marks, and notices with ease',
  keywords: 'school management, teacher portal, attendance tracking, marks management, education',
  authors: [{ name: 'Vidhya Kendra' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      {
        url: '/VidhyaKendra-logo.png',
      },
    ],
  },
  openGraph: {
    title: 'Vidhya Kendra Teacher Management System',
    description: 'Manage your classes and students efficiently',
    type: 'website',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.className} font-sans antialiased bg-[#FEFEFE] text-[#535359]`}>
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
