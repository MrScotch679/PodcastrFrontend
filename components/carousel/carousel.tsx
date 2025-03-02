import React, { useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from '@/components/dot-button'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation'
import { CarouselProps } from '@/types'
import Image from 'next/image'

export function Carousel(props: CarouselProps) {
	const { fansLikeDetail } = props
	const router = useRouter()

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
		},
		[Autoplay()]
	)

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay
		if (!autoplay) return

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop

		resetOrStop()
	}, [])

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick
	)

	return (
		<section
			ref={emblaRef}
			className='flex w-full flex-col gap-4 overflow-hidden'
		>
			<div className='flex'>
				{fansLikeDetail.map(item => (
					<figure
						key={item?._id}
						className='carousel_box'
						onClick={() =>
							router.push(`/podcasts/${item?.podcast?.[0]?.pocastId}`)
						}
					>
						<Image
							fill
							src={item?.imageUrl}
							alt='card'
							className='absolute size-full rounded-xl border-none'
						/>

						<div className='glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4'>
							<h2 className='text-14 font-semibold text-white-1'>
								{item?.podcast?.[0]?.podcastTitle}
							</h2>
							<p className='text-12 font-normal text-white-2'>{item?.name}</p>
						</div>
					</figure>
				))}
			</div>

			<div className='flex justify-center gap-2'>
				{scrollSnaps.map((_, index) => (
					<DotButton
						key={index}
						selected={selectedIndex === index}
						onClick={() => onDotButtonClick(index)}
					/>
				))}
			</div>
		</section>
	)
}
