import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "TaskFlow Pro - Professional Task Management",
  description: "The ultimate task management platform for modern teams. Streamline workflows, boost productivity, and collaborate seamlessly.",
  keywords: "task management, productivity, team collaboration, project management, workflow",
  authors: [{ name: "TaskFlow Pro Team" }],
  creator: "TaskFlow Pro",
  publisher: "TaskFlow Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://taskflow-pro.com'),
  openGraph: {
    title: "TaskFlow Pro - Professional Task Management",
    description: "The ultimate task management platform for modern teams",
    type: "website",
    locale: "en_US",
    siteName: "TaskFlow Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow Pro - Professional Task Management",
    description: "The ultimate task management platform for modern teams",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            {children}
          </Suspense>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
