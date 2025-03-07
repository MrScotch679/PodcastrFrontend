import React, {
	ComponentPropsWithRef,
	useCallback,
	useEffect,
	useState,
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { cn } from '@/lib/utils'

type UseDotButtonType = {
	selectedIndex: number
	scrollSnaps: number[]
	onDotButtonClick: (index: number) => void
}

export const useDotButton = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!emblaApi) return
			emblaApi.scrollTo(index)
			if (onButtonClick) onButtonClick(emblaApi)
		},
		[emblaApi, onButtonClick]
	)

	const onInit = useCallback((emblaApi: EmblaCarouselType) => {
		setScrollSnaps(emblaApi.scrollSnapList())
	}, [])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onInit(emblaApi)
		onSelect(emblaApi)
		emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
	}, [emblaApi, onInit, onSelect])

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	}
}

interface PropType extends ComponentPropsWithRef<'button'> {
	selected?: boolean
}

export function DotButton(props: PropType) {
	const { children, selected, ...restProps } = props

	return (
		<button
			type='button'
			className={cn(
				'size-2.5 bg-white-3 cursor-pointer transition-all duration-500 rounded-full',
				{
					'bg-white-1': selected,
				}
			)}
			{...restProps}
		>
			{children}
		</button>
	)
}
