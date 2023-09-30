import './globals.css'
import type { Metadata } from 'next'
import RootLayoutCompo from '@/components/RootLayout/RootLayoutCompo'

export const metadata: Metadata = {
  title: 'Hassan Mostafa',
  description: "this is hassan mostafa's portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <RootLayoutCompo >
          {children}
        </RootLayoutCompo>
      </body>
    </html>
  )
}
