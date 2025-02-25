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
