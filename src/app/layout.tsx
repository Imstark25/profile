import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Subash Chandra Bose A — DevOps & Cloud Engineer',
  description:
    'Elite developer portfolio of Subash Chandra Bose A — MCA graduate specializing in DevOps, Cloud Architecture, Backend Development, and AI/ML. AWS certified, Docker proficient, CI/CD builder.',
  keywords: [
    'DevOps Engineer', 'Cloud Engineer', 'MCA Graduate', 'AWS Certified',
    'Docker', 'Kubernetes', 'CI/CD', 'Python', 'Node.js', 'Terraform',
    'GitHub Actions', 'Subash Chandra Bose', 'Portfolio', 'Chennai',
  ],
  authors: [{ name: 'Subash Chandra Bose A' }],
  openGraph: {
    title: 'Subash Chandra Bose A — DevOps & Cloud Engineer',
    description: 'MCA graduate building cloud-native systems, exploring AI, and shipping scalable solutions.',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        {children}
      </body>
    </html>
  )
}
