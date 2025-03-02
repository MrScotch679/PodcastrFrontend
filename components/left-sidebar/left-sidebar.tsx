'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LeftSidebarLinks } from '../left-sidebar-links'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAudio } from '@/providers/audio-provider'

export function LeftSidebar() {
	const router = useRouter()
	const { signOut } = useClerk()

	const onClickSignOut = () => signOut(() => router.push('/'))
	const { audio } = useAudio()

	return (
		<section
			className={cn('left_sidebar h-[calc(100vh-5px)]', {
				'h-[calc(100vh-140px)]': audio?.audioUrl,
			})}
		>
			<nav className='flex flex-col gap-6'>
				<Link
					href='/'
					className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'
				>
					<Image src='/icons/logo.svg' alt='logo' width={23} height={27} />
					<h1 className='text-24 font-extrabold text-white-1 max-lg:hidden'>
						Podcastr
					</h1>
				</Link>

				<LeftSidebarLinks />
			</nav>

			<SignedOut>
				<Link href='/sign-in'>
					<div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
						<Button className='text-16 w-full bg-orange-1 font-extrabold'>
							Sign In
						</Button>
					</div>
				</Link>
			</SignedOut>

			<SignedIn>
				<div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
					<Button
						className='text-16 w-full bg-orange-1 font-extrabold'
						onClick={onClickSignOut}
					>
						Log Out
					</Button>
				</div>
			</SignedIn>
		</section>
	)
}
