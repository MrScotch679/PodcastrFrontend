import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { LeftSidebarLinks } from '@/components/left-sidebar-links'

export function MobileNav() {
	return (
		<section>
			<Sheet>
				<SheetTrigger>
					<Image
						src='/icons/hamburger.svg'
						width={30}
						height={30}
						alt='menu'
						className='cursor-pointer'
					/>
				</SheetTrigger>
				<SheetContent side='left' className='border-none bg-black-1'>
					<Link
						href='/'
						className='flex cursor-pointer items-center gap-1 pb-10 pl-4'
					>
						<Image src='/icons/logo.svg' alt='logo' width={23} height={27} />
						<h1 className='text-24 font-extrabold text-white-1 ml-2'>
							Podcastr
						</h1>
					</Link>
					<div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-auto'>
						<SheetClose asChild>
							<nav className='flex h-full flex-col gap-6 text-white-1'>
								<LeftSidebarLinks justifyStart />
							</nav>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	)
}
