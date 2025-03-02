'use client'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/lib/use-debounce'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Searchbar() {
	const [search, setSearch] = useState('')
	const router = useRouter()
	const pathname = usePathname()

	const debouncedSearch = useDebounce(search, 500)

	useEffect(() => {
		if (debouncedSearch) {
			router.push(`/discover?search=${debouncedSearch}`)
		} else if (!debouncedSearch && pathname === '/discover') {
			router.push('/discover')
		}
	}, [debouncedSearch, router, pathname])

	return (
		<div className='relative mt-8 block'>
			<Input
				placeholder='Search for podcasts'
				className='input-class py-6 pl-12 focus-visible:ring-offset-orange-1'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>

			<Image
				src='/icons/search.svg'
				alt='search'
				width={20}
				height={20}
				className='absolute left-4 top-3.5'
			/>
		</div>
	)
}
