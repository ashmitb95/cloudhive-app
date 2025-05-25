import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import QueryProvider from '@/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'CloudHive',
    description: 'CloudHive - Your Cloud Management Platform',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>
                    <Theme>
                        {children}
                    </Theme>
                </QueryProvider>
            </body>
        </html>
    )
} 