import { cn } from '@/lib/utils'
import { HeaderProps } from '@/types'
import Link from 'next/link'

export function Header(props: HeaderProps) {
	const { headerTitle, titleClassName } = props

	return (
		<header className='flex items-center justify-between'>
			{headerTitle ? (
				<h1 className={cn('text-18 font-bold text-white-1', titleClassName)}>
					{headerTitle}
				</h1>
			) : (
				<div />
			)}

			<Link href='/discover' className='text-16 font-semibold text-orange-1'>
				See all
			</Link>
		</header>
	)
}
