import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '救救2515 - 翻轉中工',
  description: '以實際行動翻轉經營，強化公司治理，並提升營運績效',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
