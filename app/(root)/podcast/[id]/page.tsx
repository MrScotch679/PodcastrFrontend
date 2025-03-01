'use client'

import { Empty } from '@/components/empty'
import { LoaderSpinner } from '@/components/loader-spinner'
import { PodcastCard } from '@/components/podcast-card'
import { PodcastDetailPlayer } from '@/components/podcast-detail-player'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'

type Props = {
	params: {
		id: Id<'podcasts'>
	}
}

export default function PodcastDetails({ params }: Props) {
	const { user } = useUser()

	const podcast = useQuery(api.podcats.getPodcastById, { podcastId: params.id })
	const similarPodcasts = useQuery(api.podcats.getPodcastByVoiceType, {
		podcastId: params.id,
	})

	const isOwner = user?.id === podcast?.authorId

	if (!podcast || !similarPodcasts) {
		return <LoaderSpinner />
	}

	return (
		<section className='flex flex-col w-full'>
			<header className='mt-9 flex items-center justify-between'>
				<h1 className='text-20 font-bold text-white-1'>Currently playing</h1>

				<figure className='flex gap-3'>
					<Image
						src='/icons/headphone.svg'
						alt='headphone'
						width={24}
						height={24}
					/>

					<h2 className='text-16 font-bold text-white-1'>{podcast?.views}</h2>
				</figure>
			</header>

			<PodcastDetailPlayer
				podcastId={params.id}
				isOwner={isOwner}
				{...podcast}
			/>

			<p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>
				{podcast?.podcastDescription}
			</p>

			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-4'>
					<h1 className='text-18 font-bold text-white-1'>Transcription</h1>

					<p className='text-white-2 text-16 font-medium'>
						{podcast?.voicePrompt}
					</p>
				</div>

				<div className='flex flex-col gap-4'>
					<h1 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h1>

					<p className='text-white-2 text-16 font-medium'>
						{podcast?.imagePrompt}
					</p>
				</div>
			</div>

			<section className='mt-8 flex flex-col gap-5'>
				<h1 className='text-20 font-bold text-white-1'>Similar Podcasts</h1>

				{similarPodcasts?.length ? (
					<div className='podcast_grid'>
						{similarPodcasts?.map(podcast => (
							<PodcastCard key={podcast._id} {...podcast} />
						))}
					</div>
				) : (
					<Empty
						title='No similar podcasts'
						buttonText='Discover more podcasts'
						link='/discover'
					/>
				)}
			</section>
		</section>
	)
}
