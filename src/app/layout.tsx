import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subash Chandra Bose A — DevOps Engineer & AWS Certified",
  description:
    "Portfolio of Subash Chandra Bose A, a DevOps Engineer and AWS Certified developer specializing in CI/CD pipelines, Kubernetes, Flutter, and cloud-native infrastructure.",
  keywords: [
    "DevOps Engineer",
    "AWS Certified",
    "Flutter Developer",
    "CI/CD Pipelines",
    "Kubernetes",
    "Cloud Engineering",
    "Subash Chandra Bose",
    "Portfolio",
    "Tamil Nadu",
  ],
  authors: [{ name: "Subash Chandra Bose A" }],
  openGraph: {
    title: "Subash Chandra Bose A — DevOps Engineer",
    description: "AWS Certified DevOps Engineer & Flutter Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060914] text-white">
        {children}
      </body>
    </html>
  );
}
