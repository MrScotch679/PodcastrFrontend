'use client'

import { PodcastCard } from '@/components/podcast-card'
import { podcastData } from '@/constants/podcast-data '

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function Home() {
	return (
		<div className='mt-9 flex flex-col gap-9'>
			<section className='flex flex-col gap-5'>
				<h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
				<div className='podcast_grid'>
					{podcastData.map(podcast => (
						<PodcastCard key={podcast.id} {...podcast} />
					))}
				</div>
			</section>
		</div>
	)
}
