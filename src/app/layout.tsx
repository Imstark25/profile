import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Subash Chandra Bose A — Senior DevOps Engineer',
  description:
    'Portfolio of Subash Chandra Bose A, a Senior DevOps Engineer based in Chennai, India — specializing in Kubernetes, Terraform, CI/CD, and cloud-native infrastructure.',
  keywords: [
    'Senior DevOps Engineer', 'AWS Certified', 'Kubernetes',
    'Terraform', 'CI/CD', 'Cloud Engineering', 'Docker',
    'Subash Chandra Bose', 'Portfolio', 'Chennai India',
  ],
  authors: [{ name: 'Subash Chandra Bose A' }],
  openGraph: {
    title: 'Subash Chandra Bose A — Senior DevOps Engineer',
    description: 'Senior DevOps Engineer specializing in cloud-native infrastructure, CI/CD, and container orchestration.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
