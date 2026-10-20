import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Roboto } from 'next/font/google'
import './globals.css'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'Antonio Trader',
  description: 'Painel de desempenho diário de trading: lucro, taxa de acerto e resultados do dia.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05070d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${roboto.variable} bg-[#05070d]`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
