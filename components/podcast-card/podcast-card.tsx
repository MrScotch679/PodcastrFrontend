import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'

export function PodcastCard(props: {
	_id: Id<'podcasts'>
	podcastTitle: string
	podcastDescription: string
	imageUrl?: string
}) {
	const { podcastTitle, podcastDescription, imageUrl } = props

	return (
		<div className='cursor-pointer'>
			<figure className='flex flex-col gap-2'>
				<Image
					src={imageUrl || ''}
					alt={podcastTitle}
					width={174}
					height={174}
					priority={false}
					className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'
				/>

				<div className='flex flex-col'>
					<h1 className='text-16 truncate font-bold text-white-1'>
						{podcastTitle}
					</h1>
					<h2 className='text-12 truncate font-normal capitalize text-white-4'>
						{podcastDescription}
					</h2>
				</div>
			</figure>
		</div>
	)
}
