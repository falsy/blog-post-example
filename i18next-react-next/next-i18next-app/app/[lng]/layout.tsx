import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { ReactNode } from 'react'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({ 
  children, 
  params: { 
    lng 
  }
}: { 
  children: ReactNode
  params: {
    lng: string
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}