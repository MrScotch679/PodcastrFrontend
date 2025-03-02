'use client'

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { LoaderSpinner } from '@/components/loader-spinner'
import { ProfileCard } from '@/components/profile-card'
import { PodcastCard } from '@/components/podcast-card'
import { Empty } from '@/components/empty'
import { ProfilePodcastProps } from '@/types'

export default function ProfilePage({
	params,
}: {
	params: {
		id: string
	}
}) {
	const user = useQuery(api.users.getUserById, {
		clerkId: params.id,
	})
	const podcastsData = useQuery(api.podcats.getPodcastByAuthorId, {
		authorId: params.id,
	})

	if (!user || !podcastsData) {
		return <LoaderSpinner />
	}

	return (
		<section className='mt-9 flex flex-col'>
			<h1 className='text-20 font-bold text-white-1 max-md:text-center'>
				Podcaster Profile
			</h1>
			<div className='mt-6 flex flex-col gap-6 max-md:items-center md:flex-row'>
				<ProfileCard
					podcastData={podcastsData as ProfilePodcastProps}
					imageUrl={user?.imageUrl}
					userFirstName={user?.name}
				/>
			</div>
			<section className='mt-9 flex flex-col gap-5'>
				<h1 className='text-20 font-bold text-white-1'>All Podcasts</h1>
				{podcastsData && podcastsData?.podcasts?.length > 0 ? (
					<div className='podcast_grid'>
						{podcastsData?.podcasts
							?.slice(0, 4)
							.map(podcast => (
								<PodcastCard
									key={podcast._id}
									imageUrl={podcast.imageUrl!}
									podcastTitle={podcast.podcastTitle!}
									podcastDescription={podcast.podcastDescription}
									_id={podcast._id}
								/>
							))}
					</div>
				) : (
					<Empty
						title='You have not created any podcasts yet'
						link='/create-podcast'
					/>
				)}
			</section>
		</section>
	)
}
