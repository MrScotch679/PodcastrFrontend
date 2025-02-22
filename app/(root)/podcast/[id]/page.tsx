type Props = {
	params: {
		id: string
	}
}

export default function PodcastDetails({ params }: Props) {
	return <p className='text-white-1'>Podcast {params.id}</p>
}
