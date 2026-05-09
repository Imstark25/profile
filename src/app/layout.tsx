import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Subash Chandra Bose A — Aspiring DevOps Engineer',
  description:
    'Portfolio of Subash Chandra Bose A, a fresher from Chennai, India — learning DevOps, cloud computing, Docker, CI/CD, and AWS through hands-on projects and certifications.',
  keywords: [
    'Aspiring DevOps Engineer', 'Fresher', 'AWS Certified', 'Docker',
    'CI/CD', 'Cloud Computing', 'GitHub Actions',
    'Subash Chandra Bose', 'Portfolio', 'Chennai India',
  ],
  authors: [{ name: 'Subash Chandra Bose A' }],
  openGraph: {
    title: 'Subash Chandra Bose A — Aspiring DevOps Engineer',
    description: 'Fresher exploring DevOps, cloud technologies, containers, and CI/CD automation.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        {children}
      </body>
    </html>
  )
}
