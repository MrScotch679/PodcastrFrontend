'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { aiVoiceCategories } from '@/constants/ai-voice-categories'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { GeneratePodcast } from '@/components/generate-podcast'
import { GenerateThumbnail } from '@/components/generate-thumbnail'
import { Loader } from 'lucide-react'
import { VoiceType } from '@/types'
import { Id } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	podcastTitle: z.string(),
	podcastDescription: z.string(),
	voiceType: z.string(),
})

// TODO: REFACTOR
// States, AI requests
export default function CreatePodcast() {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	const { isLoading } = form.formState

	const [imagePrompt, setImagePrompt] = useState('')
	const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(
		null
	)
	const [imageUrl, setImageUrl] = useState('')

	const [audioUrl, setAudioUrl] = useState<string>('')
	const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(
		null
	)

	const [audioDuration, setAudioDuration] = useState(0)
	const [voicePrompt, setVoicePrompt] = useState('')

	const createPodcast = useMutation(api.podcats.createPodcast)

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await createPodcast({
				podcastTitle: values.podcastTitle,
				podcastDescription: values.podcastDescription,
				audioUrl,
				imageUrl,
				voiceType: values.voiceType,
				imagePrompt,
				voicePrompt,
				views: 0,
				audioDuration,
				audioStorageId: audioStorageId ?? undefined,
				imageStorageId: imageStorageId ?? undefined,
			})

			toast.success('Podcast created successfully')
			router.push('/')
		} catch (error) {
			console.error(error)
			toast.error('Error creating podcast')
		}
	}

	return (
		<section className='mt-10 flex flex-col'>
			<h1 className='text-20 font-bold text-white-1'>Create Podcast</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='mt-12 flex w-full flex-col'
				>
					<div className='flex flex-col gap-[30px] border-b border-black-5 pb-10'>
						<FormField
							control={form.control}
							name='podcastTitle'
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2.5'>
									<FormLabel className='text-16 font-bold text-white-1'>
										Podcast Title
									</FormLabel>

									<FormControl>
										<Input
											placeholder='JSM Pro Podcast'
											className='input-class focus-visible:ring-offset-orange-1'
											{...field}
										/>
									</FormControl>

									<FormMessage className='text-white-1' />
								</FormItem>
							)}
						/>

						<div className='flex flex-col gap-2.5'>
							<FormField
								control={form.control}
								name='voiceType'
								render={({ field }) => {
									const { value, onChange } = field

									return (
										<FormItem>
											<FormLabel className='text-16 font-bold text-white-1'>
												Select AI Voice
											</FormLabel>

											<Select onValueChange={onChange}>
												<SelectTrigger
													className={cn(
														'text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1'
													)}
												>
													<SelectValue
														placeholder='Select AI Voice'
														className='placeholder:text-gray-1'
													/>
												</SelectTrigger>

												<SelectContent className='text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1'>
													{aiVoiceCategories.map(category => (
														<SelectItem
															key={category}
															value={category}
															className='capitalize focus:bg-orange-1'
														>
															{category}
														</SelectItem>
													))}
												</SelectContent>

												{value ? (
													<audio
														autoPlay
														src={`/${value}.mp3`}
														className='hidden'
													/>
												) : null}
											</Select>
										</FormItem>
									)
								}}
							/>
						</div>

						<FormField
							control={form.control}
							name='podcastDescription'
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2.5'>
									<FormLabel className='text-16 font-bold text-white-1'>
										Podcast Description
									</FormLabel>

									<FormControl>
										<Textarea
											placeholder='Write a short podcast description'
											className='input-class focus-visible:ring-offset-orange-1'
											rows={4}
											{...field}
										/>
									</FormControl>

									<FormMessage className='text-white-1' />
								</FormItem>
							)}
						/>
					</div>

					<div className='flex flex-col pt-10'>
						<GeneratePodcast
							voiceType={form.getValues('voiceType') as VoiceType}
							audio={audioUrl}
							voicePrompt={voicePrompt}
							setVoicePrompt={setVoicePrompt}
							setAudio={setAudioUrl}
							setAudioStorageId={setAudioStorageId}
							setAudioDuration={setAudioDuration}
						/>

						<GenerateThumbnail
							image={imageUrl}
							setImage={setImageUrl}
							imagePrompt={imagePrompt}
							setImagePrompt={setImagePrompt}
							setImageStorageId={setImageStorageId}
						/>

						<div className='mt-10 w-full'>
							<Button
								disabled={isLoading}
								type='submit'
								className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-[background] duration-500 hover:bg-black-1'
							>
								Submit
								{isLoading ? (
									<Loader size={20} className='animate-spin ml-1' />
								) : null}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</section>
	)
}
