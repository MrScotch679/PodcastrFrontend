import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type Props = {
	route: string
	label: string
	imgURL: string
	isActive: boolean
	justifyStart?: boolean
}

export function LeftSidebarLinkItem(props: Props) {
	const { route, label, imgURL, isActive, justifyStart } = props

	return (
		<Link
			key={route}
			href={route}
			className={cn('flex gap-3 items-center py-4 max-lg:px-4', {
				'bg-nav-focus border-r-4 border-orange-1': isActive,
				'justify-center lg:justify-start': !justifyStart,
			})}
		>
			<Image src={imgURL} alt={label} width={24} height={24} />
			<p>{label}</p>
		</Link>
	)
}
