import { EmptyProps } from '@/types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Empty(props: EmptyProps) {
	const { title, buttonText, link, search } = props

	return (
		<section className='flex-center size-full flex-col gap-3'>
			<Image src='/icons/emptyState.svg' alt='empty' width={250} height={250} />

			<div className='flex-center w-full max-w-[254px] flex-col gap-3'>
				<h1 className='text-16 flex-center font-medium text-white-1'>
					{title}
				</h1>

				{search ? (
					<p className='text-16 text-center font-medium text-white-2'>
						Try adjusting your search to find what you are looking for
					</p>
				) : null}

				{link ? (
					<Button className='bg-orange-1'>
						<Link href={link} className='flex gap-1'>
							<Image
								src='/icons/discover.svg'
								alt='discover'
								width={20}
								height={20}
							/>

							<h1 className='text-16 font-extrabold text-white-1'>
								{buttonText}
							</h1>
						</Link>
					</Button>
				) : null}
			</div>
		</section>
	)
}
