import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'focused-anteater-216.convex.cloud',
			},
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
		],
	},
}

export default nextConfig
