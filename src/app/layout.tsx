import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from './components/ui/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Subash Chandra Bose A — Salesforce Admin · AWS Cloud Engineer · Flutter Dev',
  description:
    'Portfolio of Subash Chandra Bose A — MCA graduate and AWS Certified Solutions Architect specializing in Salesforce CRM administration, AWS cloud infrastructure, and Flutter mobile development. Available for 2026 graduate roles.',
  keywords: [
    'Salesforce Administrator', 'AWS Cloud Engineer', 'Flutter Developer',
    'MCA Graduate', 'AWS Certified Solutions Architect', 'Salesforce CRM',
    'Flow Builder', 'Custom Objects', 'Docker', 'Kubernetes', 'Terraform',
    'GitHub Actions', 'CI/CD', 'Dart', 'Firebase', 'Python',
    'Subash Chandra Bose', 'Portfolio', 'Chennai', '2026 Graduate',
  ],
  authors: [{ name: 'Subash Chandra Bose A' }],
  openGraph: {
    title: 'Subash Chandra Bose A — Salesforce Admin · AWS Cloud Engineer · Flutter Dev',
    description: 'MCA graduate building Salesforce CRM solutions, AWS cloud infrastructure, and Flutter apps. AWS Certified Solutions Architect.',
    type: 'website',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="noise" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
