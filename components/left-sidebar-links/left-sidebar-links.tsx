'use client'

import { sidebarLinks } from '@/constants/sidebar-links'
import { usePathname } from 'next/navigation'
import { LeftSidebarLinkItem } from '../left-sidebar-link-item'

export function LeftSidebarLinks() {
	const pathname = usePathname()

	return (
		<>
			{sidebarLinks?.map(({ route, label, imgURL }) => {
				const isActive = pathname === route || pathname?.startsWith(`${route}/`)

				return (
					<LeftSidebarLinkItem
						key={route}
						route={route}
						label={label}
						imgURL={imgURL}
						isActive={isActive}
					/>
				)
			})}
		</>
	)
}
