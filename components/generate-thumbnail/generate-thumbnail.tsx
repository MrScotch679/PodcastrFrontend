/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChangeEvent, useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader } from 'lucide-react'
import { GenerateThumbnailProps } from '@/types'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { toast } from 'sonner'
import { useAction, useMutation } from 'convex/react'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { api } from '@/convex/_generated/api'
import { v4 } from 'uuid'

export function GenerateThumbnail(props: GenerateThumbnailProps) {
	const { setImage, setImageStorageId, image, imagePrompt, setImagePrompt } =
		props

	const refInput = useRef<HTMLInputElement>(null)

	const [isAIThumbnail, setIsAIThumbnail] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const getImageUrl = useMutation(api.podcats.getUrl)
	const generateUploadUrl = useMutation(api.files.generateUploadUrl)
	const { startUpload } = useUploadFiles(generateUploadUrl)

	const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction)

	const handleImage = async (blob: Blob, fileName: string) => {
		setIsLoading(true)
		setImage('')

		try {
			const file = new File([blob], fileName, {
				type: 'image/png',
			})

			const uploadedFile = await startUpload([file])
			const storageId = (uploadedFile[0].response as any).storageId
			setImageStorageId(storageId)

			const imageUrl = await getImageUrl({ storageId })
			setImage(imageUrl as string)

			toast.success('Thumbnail generated successfully')
		} catch (error) {
			console.error(error)
			toast.error('Error generating thumbnail')
		} finally {
			setIsLoading(false)
		}
	}
	const handleAIThumbnail = (value: boolean) => {
		setIsAIThumbnail(value)
	}

	const generateImage = async () => {
		try {
			const response = await handleGenerateThumbnail({ imagePrompt })
			const blob = new Blob([response], { type: 'image/png' })

			handleImage(blob, `thumbnail-${v4()}.png`)
		} catch (error) {
			console.error(error)
			toast.error('Error generating thumbnail')
		}
	}

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()

		try {
			const file = event.target.files?.[0]
			if (!file) {
				return
			}

			const blob = await file.arrayBuffer()?.then(buffer => new Blob([buffer]))

			handleImage(blob, file.name)
		} catch (error) {
			console.error(error)
			toast.error('Error uploading image')
		}
	}

	return (
		<>
			<div className='generate_thumbnail'>
				<Button
					type='button'
					variant='plain'
					className={cn({
						'bg-black-6': isAIThumbnail,
					})}
					onClick={() => handleAIThumbnail(true)}
				>
					Use AI to generate a thumbnail
				</Button>

				<Button
					type='button'
					variant='plain'
					className={cn({
						'bg-black-6': !isAIThumbnail,
					})}
					onClick={() => handleAIThumbnail(false)}
				>
					Upload custom image
				</Button>
			</div>

			{isAIThumbnail ? (
				<>
					<div className='flex flex-col gap-2.5 mt-5'>
						<Label className='text-16 font-bold text-white-1'>
							AI prompt to generate a thumbnail
						</Label>

						<Textarea
							className='input-class font-light focus-visible:ring-offset-orange-1'
							placeholder='Provide text to generate a thumbnail'
							rows={5}
							value={imagePrompt}
							onChange={e => setImagePrompt(e.target.value)}
						/>
					</div>

					<div className='w-full mt-5 max-w-[200px]'>
						<Button
							disabled={isLoading}
							type='submit'
							className='text-16 bg-orange-1 py-4 font-bold text-white-1 transition-[background] duration-500 hover:bg-black-1'
							onClick={generateImage}
						>
							Generate
							{isLoading ? (
								<Loader size={20} className='animate-spin ml-1' />
							) : null}
						</Button>
					</div>
				</>
			) : (
				<div className='image_div' onClick={() => refInput.current?.click()}>
					<Input
						ref={refInput}
						type='file'
						className='hidden w-full h-full cursor-pointer'
						onChange={uploadImage}
					/>

					{isLoading ? (
						<div className='text-16 flex-center font-medium text-white-1'>
							Uploading
							{isLoading ? (
								<Loader size={20} className='animate-spin ml-1' />
							) : null}
						</div>
					) : (
						<Image
							src='/icons/upload-image.svg'
							alt='upload'
							width={40}
							height={40}
						/>
					)}

					<div className='flex flex-col items-center gap-1'>
						<h2 className='text-12 font-bold text-orange-1'>Click to upload</h2>
					</div>
					<p className='text-12 font-normal text-gray-1'>
						SVG, PNG, JPG or GIF ( max. 1080x1080px )
					</p>
				</div>
			)}

			{image ? (
				<div className='flex-center w-full'>
					<Image
						src={image}
						width={200}
						height={200}
						alt='thumbnail'
						className='mt-5'
					/>
				</div>
			) : null}
		</>
	)
}
