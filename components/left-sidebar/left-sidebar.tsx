import Image from 'next/image'
import Link from 'next/link'
import { LeftSidebarLinks } from '../left-sidebar-links'

export function LeftSidebar() {
	return (
		<section className='left_sidebar'>
			<nav className='flex flex-col gap-6'>
				<Link
					href='/'
					className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'
				>
					<Image src='/icons/logo.svg' alt='logo' width={23} height={27} />
					<h1 className='text-24 font-extrabold text-white-1 max-lg:hidden'>
						Podcast
					</h1>
				</Link>

				<LeftSidebarLinks />
			</nav>
		</section>
	)
}
