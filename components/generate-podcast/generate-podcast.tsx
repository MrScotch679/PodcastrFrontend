/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneratePodcastProps } from '@/types'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 } from 'uuid'
import { toast } from 'sonner'

import { useUploadFiles } from '@xixixao/uploadstuff/react'

// TODO: REFACTOR
export function GeneratePodcast(props: GeneratePodcastProps) {
	const {
		voiceType,
		setVoicePrompt,

		audio,
		setAudio,

		voicePrompt,
		setAudioStorageId,
		setAudioDuration,
	} = props

	const [isLoading, setIsLoading] = useState(false)
	const getAudioUrl = useMutation(api.podcats.getUrl)
	const getPodcastAudio = useAction(api.openai.generateAudioAction)
	const generateUploadUrl = useMutation(api.files.generateUploadUrl)

	const { startUpload } = useUploadFiles(generateUploadUrl)

	const generatePodcast = async () => {
		setIsLoading(true)
		setAudio('')

		if (!voicePrompt) {
			setIsLoading(false)
			toast.error('Please provide a voice type')
			return
		}

		try {
			const response = await getPodcastAudio({
				voiceType,
				voicePrompt,
			})

			const blob = new Blob([response], { type: 'audio/mpeg' })
			const fileName = `podcast-${v4()}.mp3`

			const file = new File([blob], fileName, {
				type: 'audio/mpeg',
			})

			const uploadedFile = await startUpload([file])
			const storageId = (uploadedFile[0].response as any).storageId

			setAudioStorageId(storageId)
			const audioUrl = await getAudioUrl({ storageId })
			setAudio(audioUrl as string)

			toast.success('Audio generated successfully')
		} catch (error) {
			toast.error(`Error generating audio`)
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<div className='flex flex-col gap-2.5'>
				<Label className='text-16 font-bold text-white-1'>
					AI prompt to generate podcast
				</Label>

				<Textarea
					className='input-class font-light focus-visible:ring-offset-orange-1'
					placeholder='Provide text to generate audio'
					rows={5}
					value={voicePrompt}
					onChange={e => setVoicePrompt(e.target.value)}
				/>
			</div>

			<div className='mt-5 w-full max-w-[200px]'>
				<Button
					disabled={isLoading}
					type='submit'
					className='text-16 bg-orange-1 py-4 font-bold text-white-1 transition-[background] duration-500 hover:bg-black-1'
					onClick={generatePodcast}
				>
					Generate
					{isLoading ? (
						<Loader size={20} className='animate-spin ml-1' />
					) : null}
				</Button>
			</div>

			{audio ? (
				<audio
					controls
					autoPlay
					src={audio}
					className='mt-5'
					onLoadedMetadata={e => setAudioDuration(e.currentTarget.duration)}
				/>
			) : null}
		</div>
	)
}
