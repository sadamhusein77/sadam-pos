import './globals.css'
import type { Metadata } from 'next'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Providers } from '@/redux/provider';
import ToastContainerWrapper from './ToastContainerWrapper';

export const metadata: Metadata = {
  title: 'Sadam POS',
  description: 'Web Sadam POS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <ToastContainerWrapper />
      </body>
    </html>
  )
}
