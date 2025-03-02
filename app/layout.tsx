import type { Metadata } from 'next'
import { Geist, Manrope } from 'next/font/google'
import './globals.css'
import '@/styles/clerk-overrides.css'
import '@/styles/custom-classes.css'
import { ConvexClerkProvider } from '@/providers/convex-clerk-provider'
import { AudioProvider } from '@/providers/audio-provider'

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
})

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Podcastr',
	description: 'AI Podcast',
	icons: {
		icon: '/icons/logo.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ConvexClerkProvider>
			<html lang='en'>
				<AudioProvider>
					<body
						className={`${manrope.variable} ${geistSans.variable} antialiased`}
					>
						{children}
					</body>
				</AudioProvider>
			</html>
		</ConvexClerkProvider>
	)
}
