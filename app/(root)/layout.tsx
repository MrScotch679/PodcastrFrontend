import { LeftSidebar } from '@/components/left-sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { PodcastPlayer } from '@/components/podcast-player'
import { RightSibebar } from '@/components/right-sibebar'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'

import Image from 'next/image'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex flex-col relative'>
			<main className='flex relative bg-black-3'>
				<LeftSidebar />

				<section className='flex min-h-screen flex-1 flex-col px-4 sm:px-14'>
					<div className='flex justify-center w-full max-w-5xl flex-col max-sm:px-4'>
						<div className='flex h-16 items-center justify-between md:hidden'>
							<Image
								src='/icons/logo.svg'
								alt='menu icon'
								width={30}
								height={30}
							/>

							<MobileNav />
						</div>
						<div className='flex flex-col md:pb-14'>
							{children}
							<Toaster />
						</div>
					</div>
				</section>

				<RightSibebar />
			</main>

			<PodcastPlayer />
		</div>
	)
}
