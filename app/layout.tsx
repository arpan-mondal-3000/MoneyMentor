import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Money Mentor',
  description: 'A expense management app for students.',
  generator: 'createX',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
