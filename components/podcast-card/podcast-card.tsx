import Image from 'next/image'

export function PodcastCard(props: {
	id: number
	title: string
	description: string
	imgURL: string
}) {
	const { title, description, imgURL } = props

	return (
		<div className='cursor-pointer'>
			<figure className='flex flex-col gap-2'>
				<Image
					src={imgURL}
					alt={title}
					width={174}
					height={174}
					priority={false}
					className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'
				/>

				<div className='flex flex-col'>
					<h1 className='text-16 truncate font-bold text-white-1'>{title}</h1>
					<h2 className='text-12 truncate font-normal capitalize text-white-4'>
						{description}
					</h2>
				</div>
			</figure>
		</div>
	)
}
