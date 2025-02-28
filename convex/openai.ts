import { action } from './_generated/server'
import { v } from 'convex/values'

import OpenAI from 'openai'
import { SpeechCreateParams } from 'openai/resources/audio/speech.mjs'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const generateAudioAction = action({
	args: { voiceType: v.string(), voicePrompt: v.string() },
	handler: async (_, { voiceType, voicePrompt }) => {
		const mp3 = await openai.audio.speech.create({
			model: 'gpt-3.5-turbo',
			voice: voiceType as SpeechCreateParams['voice'],
			input: voicePrompt,
		})

		const buffer = await mp3.arrayBuffer()

		return buffer
	},
})

export const generateThumbnailAction = action({
	args: { imagePrompt: v.string() },
	handler: async (_, { imagePrompt }) => {
		const response = await openai.images.generate({
			model: 'dall-e-3',
			prompt: imagePrompt,
			quality: 'standard',
			size: '1024x1024',
			n: 1,
		})

		const url = response.data[0].url

		if (!url) {
			throw new Error('No url found')
		}

		const imageResponce = await fetch(url)
		const buffer = await imageResponce.arrayBuffer()

		return buffer
	},
})
