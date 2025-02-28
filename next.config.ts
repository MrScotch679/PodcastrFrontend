import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'focused-anteater-216.convex.cloud',
			},
		],
	},
}

export default nextConfig
