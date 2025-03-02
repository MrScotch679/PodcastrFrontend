'use client'

import { Empty } from '@/components/empty'
import { PodcastCard } from '@/components/podcast-card'
import { Searchbar } from '@/components/searchbar'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useSearchParams } from 'next/navigation'

export default function Discover() {
	const searchParams = useSearchParams()
	const search = searchParams.get('search') || ''

	const podcasts = useQuery(api.podcats.getPodcastBySearch, { search }) || []

	return (
		<div className='flex flex-col gap-9'>
			<Searchbar />

			<div className='flex flex-col gap-9'>
				<h1 className='text-20 font-bold text-white-1'>Discover Podcasts</h1>

				{podcasts?.length ? (
					<div className='podcast_grid'>
						{podcasts?.map(podcast => (
							<PodcastCard key={podcast._id} {...podcast} />
						))}
					</div>
				) : (
					<Empty title='No Podcasts Found' />
				)}
			</div>
		</div>
	)
}
